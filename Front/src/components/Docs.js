import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';

const Docs=() =>{
  const params = useParams();
  const query = params.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const callApi = async()=>{
    await axios.get('/api/docs/:document', {params:{document:query}})
    .then((res)=>{      
      const output = res.data.test;
      if(output.length) {
        setData(output); console.log(output)
      }
      else{
        setData([{text_beta:'nothing', slot_role_id:'0'}]); console.log({text_beta:'nothing', slot_role_id:'0'})
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
        return (
          <div key={row.slot_role_id}>{row.text_beta}</div>
        )
      })}
      <>끗</>
    </div>
  );
};

export default Docs;
