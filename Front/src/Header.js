import React, { useState } from 'react';
import namu from './assets/namu.png';
import search from './assets/search.png';

function Header() {
    const [query, setQuery] = useState("");
    const onSubmit = async() => {
        if (query){
            if (query === "nodocs") window.location.href = "/docs/" + query;
            else window.location.href = "/search/" + query;
        }      
    };

    const handleOnEnter = e => {
        if (e.key === 'Enter') {
          onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };
  
    return (
        <div className='container'>
            <div className='App-header'>
                <div className='button-container'>
                    <a role="button" href="/docs/main" className="App-logo">    
                        <img src={namu} className='logo-img'/>
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
                        <img src={search} className='search-button-img'/>
                    </button>
                </div>

            </div>
        </div>
    );
  }
  export default Header;
