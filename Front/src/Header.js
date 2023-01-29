import React, { useState } from 'react';
import "./App.css";
import namu from './assets/namu.png';
import search from './assets/search.png';
import axios from "axios";
import { useMediaQuery } from 'react-responsive'
import * as width from "./config.js"

export default function Header() {
    const issmwidth = useMediaQuery({ minWidth: width.smwidth })
    const ismdwidth= useMediaQuery({ minWidth: width.mdwidth }) && issmwidth
    const islgwidth = useMediaQuery({ minWidth: width.lgwidth }) && ismdwidth
    const isxlwidth = useMediaQuery({ minWidth: width.xlwidth }) && islgwidth
    const is2xlwidth = useMediaQuery({ minWidth: width.twoxlwidth }) && isxlwidth

    const [query, setQuery] = useState("");
    const onSubmit = async() => {
        await axios.get(`/api/docs/${query}`)
        .then((res)=>{      
        const output = res.data; 
        if(output.length>=1) {
            window.location.href = "/docs/" + query;
        }
        else{
            window.location.href = "/search/" + query;
        }
        });
    };

    const handleOnEnter = e => {
        if (e.key === 'Enter') {
          onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };
  
    return (
        <div>
            <div className='header-container'>
                <div className={isxlwidth ? 'App-header-fixed' : 'App-header-shrink'}>
                    <div className='button-container'>
                        <a role="button" href="/docs/main" className="App-logo">    
                            <img src={namu} className='logo-img' alt='나무위키'/>
                        </a>
                        <a role="button" href="/upload" className='App-logo'>
                            업로드
                        </a>
                    </div>
                    {
                        ismdwidth && (                
                        <div className='search-container'>
                            <input className='search-bar-fixed'
                                onChange={(e) => {
                                setQuery(e.target.value);
                                console.log(query);
                                }}
                                onKeyUp={handleOnEnter}>
                            </input>
                            <button className='search-button'
                                type="button"
                                onClick={() => {
                                onSubmit();
                            }}>
                                <img src={search} className='search-button-img' alt='찾기'/>
                            </button>
                        </div>
                        )
                    }
                </div>
            </div>
            {
                !ismdwidth && (                
                <div className='search-container'>
                    <input className='search-bar-shrink'
                        onChange={(e) => {
                        setQuery(e.target.value);
                        console.log(query);
                        }}
                        onKeyUp={handleOnEnter}>
                    </input>
                    <button className='search-button'
                        type="button"
                        onClick={() => {
                        onSubmit();
                    }}>
                        <img src={search} className='search-button-img' alt='찾기'/>
                    </button>
                </div>
                )
            }
        </div>

    );
  }
