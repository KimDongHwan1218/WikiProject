import React, { useEffect,  useState } from 'react';
import "./App.css";
import namu from './assets/namu.png';
import search from './assets/search.png';
import axios from "axios";
import { useMediaQuery } from 'react-responsive'
import * as width from "./config.js"

export default function Sidebar() {
    const issmwidth = useMediaQuery({ minWidth: width.smwidth })
    const ismdwidth= useMediaQuery({ minWidth: width.mdwidth }) && issmwidth
    const islgwidth = useMediaQuery({ minWidth: width.lgwidth }) && ismdwidth
    const isxlwidth = useMediaQuery({ minWidth: width.xlwidth }) && islgwidth
    const is2xlwidth = useMediaQuery({ minWidth: width.twoxlwidth }) && isxlwidth

    const [recentchanges, setRecentchanges] = useState([])

    const callApi = async() => {
        await axios.get('/api/latest')
        .then((res)=>{
          console.log("latest:", res.data.rows)
          setRecentchanges(res.data.rows)
        })
    }

    useEffect(()=>{
        // setLoading(true);
        callApi();
        // setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div>
            {islgwidth&&(
                <div className='rightside'>
                    <div className='recent-change-head'>최근 변경</div>
                    {recentchanges.map((row)=>{
                        return(
                        <div className='recent-change' key={row.page_title}>
                            <a href={`/docs/${row.page_title}`}>{row.page_title}</a>
                            {/* <div>{row.time}</div> */}
                        </div> // Link로하면 리렌더 안돼서 useeffect 발동 안함..
                        )

                    })}
                    {/* 광고
                    
                    ㅇㄴㄹ
                    */}
                </div>
            )}   
        </div>
      );
}