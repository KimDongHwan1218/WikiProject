import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import "./Design.css";
import { Link } from 'react-router-dom';

const History = () => {
  const params = useParams();
  const query = params.query;
  console.log("query:", query)
  const [data, setData] = useState([]);

  const callApi = async()=>{
    await axios.get(`/api/history/${query}`)
    .then((res)=>{
      const output = res.data.rows;
      console.log("output", output)
      if(output.length>=1) {
        setData(output); 
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

  return (
    <div className='container'>
      <div className='contents'>
        <div className='top'>
          <div><h1>{query}</h1></div>
        </div>
        
        {/* <h2>{loading ? 'Loading...' : JSON.stringify(data)}</h2> */}
        {data.map((row)=>{
          console.log(row)
          return (
            <div key={row.rev_timestamp}>
              <div>{row.rev_timestamp}</div>
              <Link to={`/docs/${query}?rev=${row.rev_id}`}>리비젼링크</Link>
            </div>
          )
        })}
      </div>
      <div className='rightside'>
        광고/핫게시물/최근수정
      </div>
    </div>

  );
}


export default History;
