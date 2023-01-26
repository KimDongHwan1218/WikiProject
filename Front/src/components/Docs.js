import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import renderfunction from './renderfunction';
import "./Design.css";
import { customAxios } from "./baseurl.ts";
import { Link } from 'react-router-dom';

const Docs=() =>{
  const params = useParams();
  console.log("params:", params)
  const query = params.query;
  const [data, setData] = useState([]);
  const [recentchanges, setRecentchanges] = useState([])
  // const [loading, setLoading] = useState(false);
  
  const callApi = async()=>{
    await axios.get(`/api/docs/${params.query}${window.location.search}`)
    .then((res)=>{      
      console.log("resok")
      const output = res.data; 
      console.log("output:", output)
      if(output.length>=1) {
        setData(output); console.log(output)
      }
      else{
        setData([{text:'nothing', text_id:'0'}]);
      }
    });
    await axios.get('/api/latest')
    .then((res)=>{
      console.log("latest:", res.data.rows)
      setRecentchanges(res.data.rows)
    })
  };

  useEffect(()=>{
    // setLoading(true);
    callApi();
    // setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("data now", data)
  return (
    <div className='container'>
      <div className='contents'>
        <div className='top'>
          <div><h1>{data[0] ? data[0].page_title : ""}</h1></div>
          <div className='deh-container'>
            <a role="button" href={"/discuss/"+query} className="deh-button">토론</a> 
            <a role="button" href={"/edit/"+query} className="deh-button">편집</a> 
            <a role="button" href={"/history/"+query} className="deh-button">역사</a> 
          </div>
        </div>
        최근 수정 시각
        목차
        <br/>
        
        {/* <h2>{loading ? 'Loading...' : JSON.stringify(data)}</h2> */}
        {data.map((row)=>{
          // console.log("row.text.data", row.text)
          // console.log("map", data[0])
          // console.log("title", row.page_title)
          return (
            <div dangerouslySetInnerHTML={{__html: renderfunction(row.text)}} key={row.text_id}></div>
          )
        })}
      </div>
      <div className='rightside'>
        광고/핫게시물/최근수정
        {recentchanges.map((row)=>{
          return(
            <div key={row.page_title}><a href={`/docs/${row.page_title}`}>{row.page_title} {row.time}</a></div> // Link로하면 리렌더 안돼서 useeffect 발동 안함..
          )
        })}
      </div>
    </div>

  );
};

export default Docs;
