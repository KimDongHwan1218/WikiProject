import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect } from 'react';

const Edit = () => {
  const params = useParams();
  const query = params.query;

  const callApi = async()=>{
    axios.get("/api").then((res)=>{console.log(res.data.test)});
  };

  useEffect(()=>{
    callApi();
  }, []);

  return (
    <div>
      <h1>Edit</h1>
      <h2>{query}</h2>
    </div>
  );
}


export default Edit;