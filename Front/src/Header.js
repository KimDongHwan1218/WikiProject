import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [query, setQuery] = useState("");
    const onSubmit = async () => {
        if (query){
            if (query == "문서 있는거") window.location.href = "/docs/" + query;
            else window.location.href = "/search/" + query;
        }
            
    };
    const handleOnEnter = e => {
        if (e.key === 'Enter') {
          onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };
  
    return (
        <div>
            <Link to="/docs/main"> main </Link>
            <input
                onChange={(e) => {
                setQuery(e.target.value);
                console.log(query);
                }}
                onKeyUp={handleOnEnter}>
            </input>

            <button
                type="button"
                onClick={() => {
                onSubmit();
            }}></button>
        </div>
    );
  }
  export default Header;
