import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import "./Design.css";
import { customAxios } from "./baseurl.ts";

const Search= () => {
  const params = useParams();
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const [selected, setSelected] = useState("title");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

    const onSubmit = async() => {
      await axios.get(`/api/docs/${params.query}`)
      .then((res)=>{      
      const output = res.data; 
      if(output.length>=1) {
        window.location.href = `/docs/${query}`;
      }
      else{
          window.location.href = `/search/${query}?type=${selected}`;
      }
      });
    };

    const handleOnEnter = e => {
        if (e.key === 'Enter') {
          onSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };
  
  const callApi = async()=>{
    await axios.get(`/api/search/${params.query}${window.location.search}`)
    .then((res)=>{
      const output = res.data.rows;
      console.log("output", output)
      if(output.length) {
        setData(output);
      }
      else{
        setData([]);
      }
    });
  };

  const SearchBlock = (props) => {
    return (
      <div className=''>
        <table>
          <thead>
            <tr className=''>
              <th><Link to={"/docs/"+props.page_title}><h3>{props.page_title}</h3></Link></th>
            </tr>
          </thead>
          <tbody>
            <tr className=''>
              <td><div className=''>{props.text}</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      
    )
  }


  useEffect(()=>{
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <div className='contents'>
        <h1>검색</h1>
        <div className='top'>
          <select defaultValue={"title"} id="search_type" onChange={(e) => setSelected(e.target.value)}>
            <option value = "title_content">제목/내용</option>
            <option value = "title">제목</option>
            <option value = "content">내용</option>
          </select>
        <input
          onChange={(e) => {
          setQuery(e.target.value);
          }}
          onKeyUp={handleOnEnter}>
        </input>
        <button className='search-button'
            type="button"
            onClick={() => {
            onSubmit();
        }}>
            찾기
        </button>
        <div>
          ' {params.query} ' 문서로 바로 가기
          <button className='gotodocs-button'
            type="button"
            onClick={() => {
              window.location.href = "/docs/" + params.query
            }}>
          </button>
        </div>
        </div>        
        <div>
          {data.length
            ? data.map((row)=>{
              return (
                <div key={row.page_id}>
                  <SearchBlock page_title= {row.page_title} text= {row.text}/> 
                </div>
              )
            })
            : <div></div>}
        </div>
      </div>
      <div className='rightside'>
        광고/핫게시물/최근수정
      </div>
    </div>
    
  );
}

export default Search;
