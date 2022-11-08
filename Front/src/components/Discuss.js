import { useParams } from 'react-router-dom';

const Discuss = () => {
  const params = useParams();
  const query = params.query;
  return (
    <div>
      <h1>Discuss</h1>
      <h2>{query}</h2>
    </div>
  );
}


export default Discuss;
