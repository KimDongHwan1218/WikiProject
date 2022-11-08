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
  
    return (
        <div>
            <Link to="/docs/main"> main </Link>
            <input
                onChange={(e) => {
                setQuery(e.target.value);
                console.log(query);
                }}>
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
