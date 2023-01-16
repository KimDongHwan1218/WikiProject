import React, { useState } from 'react';
import "./App.css";
import namu from './assets/namu.png';
import search from './assets/search.png';
import axios from "axios";

function Header() {
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
        <div className='header-container'>
            <div className='App-header'>
                <div className='button-container'>
                    <a role="button" href="/docs/main" className="App-logo">    
                        <img src={namu} className='logo-img' alt='나무위키'/>
                    </a> 
                </div>
                
                <div className='search-container'>
                    <input className='search-bar'
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

            </div>
        </div>
    );
  }
  export default Header;
