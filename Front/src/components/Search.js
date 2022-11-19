import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState, Text } from 'react';

const Search= () => {
  const params = useParams();
  const query = params.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const callApi = async()=>{
    // await axios.get('/api/search/:search', {params:{search:query}})
    await axios.get('/api/search/:search', {params:{search:query}})
    .then((res)=>{      
      const output = res.data.test;
      if(output.length) {
        setData(output); console.log(output)
      }
      else{
        setData([{page_title: 'nothing', text_beta:'nothing', text_beta_id:'0'}]); console.log({text_beta:'nothing', text_beta_id:'0'})
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
      <Link to={"/docs/"+query}> go to {query} Docs </Link>
      <h1>Search</h1>
      {data.map((row)=>{
        return (
          <div key={row.text_beta_id}>
            page title: {row.page_title}
            text: {row.text_beta}
          </div>
        )
      })}
    </div>
  );
}

export default Search;
