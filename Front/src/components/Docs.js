import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
// import renderfunction from './renderfunction';
import {renderfunction, findannotation, findindex} from './renderfunction copy';
import "./Design.css";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import * as width from "../config.js";

// import {hoxy} from "./hoxy.js"

const hoxy = require("./hoxy.js");




const Docs=() =>{
  const params = useParams();
  console.log("params:", params)
  const query = params.query;
  const [data, setData] = useState([]); //text, text_id, Class_info, 

  // const [loading, setLoading] = useState(false);
  const issmwidth = useMediaQuery({ minWidth: width.smwidth })
  const ismdwidth= useMediaQuery({ minWidth: width.mdwidth }) && issmwidth
  const islgwidth = useMediaQuery({ minWidth: width.lgwidth }) && ismdwidth
  const isxlwidth = useMediaQuery({ minWidth: width.xlwidth }) && islgwidth
  const is2xlwidth = useMediaQuery({ minWidth: width.twoxlwidth }) && isxlwidth



  const Title = () =>{
    return (
      <div className='docs-title'>
        <div>{query}</div>
      </div>
    )
  }

  const Buttons = () =>{
    return (
      <div className='deh-container'>
        <a role="button" href={"/discuss/"+query} className="deh-button">토론</a> 
        <a role="button" href={"/edit/"+query} className="deh-button">편집</a> 
        <a role="button" href={"/history/"+query} className="deh-button">역사</a> 
      </div>
    )
  }

  const RecentChange = () =>{ // 이거 데이터 요청할때 페이지도 같이 리턴시켜야함. 그럼 코드도 수정함.
    let changes = []
    {data.map((row)=>{
      changes.push(row.recent_chanage)
    })}
    // let recent_change = min(changes)
    return (
      <div className='recentchange'>
        recent_change
      </div>
    )
  }

  const Index = () => {
    return (
      <div>
        목차
        {data.map((row)=>{
          return (
            <div dangerouslySetInnerHTML={{__html: findindex(row.text)}} key={row.text_id}></div>
          )
        })}
      </div>
    )
  }

  const Content = () => {
    return (
      <div>
        {data.map((row)=>{
          return (
            <div dangerouslySetInnerHTML={{__html: renderfunction(row.text)}} key={row.text_id}></div>
          )
        })}
      </div>
    )
  }

  const Annotation = () => {
    return (
      <div>
        {data.map((row)=>{
          return (
            <div dangerouslySetInnerHTML={{__html: findannotation(row.text)}} key={row.text_id}></div>
          )
        })}
      </div>
    )
  }

  const callApi = async()=>{
    await axios.get(`/api/docs/${params.query}${window.location.search}`)
    .then((res)=>{      
      const output = res.data; 
      if(output.length>=1) {
        setData(output); console.log(output)
      }
      else{
        setData([{text:'nothing', text_id:'0'}]);
      }
    });
  };


  useEffect(()=>{
    // setLoading(true);
    callApi();
    // setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  // return (<div>z</div>)

  const read_require = "<script type='module' src='Docs.js'></script>"
  return (
  <div>
    <div dangerouslySetInnerHTML={{__html: read_require}}/>
    <div dangerouslySetInnerHTML={{__html: "hoxy"}}/>
  </div>
)


  // return (
  //   <div className={isxlwidth ? 'contents-fixed':'contents-shrink'}>  
  //     <div id='headings'>
  //       <div>
  //         <Title/>
  //         <Buttons/>
  //       </div>
  //       {/* <RecentChange/> */}
  //     </div>
  //     <Index/>
  //     <Content/>
  //     {/* <Annotation annotation_list = {data[0].annotation_list}/> */}
  //   </div>
  // );

};

export default Docs;
