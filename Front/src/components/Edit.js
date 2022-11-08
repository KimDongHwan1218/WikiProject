import { useParams } from 'react-router-dom';

const Edit = () => {
  const params = useParams();
  const query = params.query;
  return (
    <div>
      <h1>Edit</h1>
      <h2>{query}</h2>
    </div>
  );
}


export default Edit;