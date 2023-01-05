import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import renderfunction from './render';

const Docs=() =>{
  const params = useParams();
  console.log("params:", params)
  const query = params.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const callApi = async()=>{
    await axios.get(`/api/docs/${params.query}`)
    .then((res)=>{      
      const output = res.data; console.log("output:", output)
      if(output.length>1) {
        setData(output); console.log(output)
      }
      else{
        setData([{text:'nothing', page_id:'0'}]);
      }
    });
  };

  useEffect(()=>{
    setLoading(true);
    callApi();
    setLoading(false);
  }, []);
  
  return (
    <div>
      <Link to={"/discuss/"+query}> discuss </Link>
      <Link to={"/edit/"+query}> edit </Link>
      <Link to={"/history/"+query}> history </Link>
      <h1>Docs</h1>
      {/* <h2>{loading ? 'Loading...' : JSON.stringify(data)}</h2> */}
      {data.map((row)=>{
        console.log("row.text.data", row.text)
        return (
          
          <div dangerouslySetInnerHTML={{__html: renderfunction(row.text)}} key={row.text_id}></div>
        )
      })}
      <>끗</>
    </div>
  );
};

export default Docs;
