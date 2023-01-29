import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import renderfunction from './renderfunction';
import "./Design.css";
import { customAxios } from "./baseurl.ts";
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import * as width from "../config.js"

const Docs=() =>{
  const params = useParams();
  console.log("params:", params)
  const query = params.query;
  const [data, setData] = useState([]);

  // const [loading, setLoading] = useState(false);
  const issmwidth = useMediaQuery({ minWidth: width.smwidth })
  const ismdwidth= useMediaQuery({ minWidth: width.mdwidth }) && issmwidth
  const islgwidth = useMediaQuery({ minWidth: width.lgwidth }) && ismdwidth
  const isxlwidth = useMediaQuery({ minWidth: width.xlwidth }) && islgwidth
  const is2xlwidth = useMediaQuery({ minWidth: width.twoxlwidth }) && isxlwidth




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
  };

  useEffect(()=>{
    // setLoading(true);
    callApi();
    // setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("data now", data)
  return (
      <div className={isxlwidth ? 'contents-fixed':'contents-shrink'}>
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
  );
};

export default Docs;
