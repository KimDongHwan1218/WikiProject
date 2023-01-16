import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';

const Search= () => {
  const params = useParams();
  const query = params.query;
  const [data, setData] = useState([])
  
  const callApi = async()=>{
    await axios.get(`/api/search/${params.query}${window.location.search}`)
    .then((res)=>{
      const output = res.data.rows;
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
      <div>
        <table>
          <thead>
            <tr>
              <th><h3>{props.page_title}</h3></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div>{props.text}</div></td>
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
    <div>
      <Link to={"/docs/"+query}> go to {query} Docs </Link>
      <h1>Search</h1>
      {data.length
        ? data.map((row)=>{
          return (
            <div key={row.page_id}>
              <SearchBlock page_title= {row.page_title} text= {row.text}/> 
            </div>
          )
        })
        : <div>결과가 없습니다.</div>}
    </div>
  );
}

export default Search;
