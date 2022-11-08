import { useParams } from 'react-router-dom';

const History = () => {
  const params = useParams();
  const query = params.query;
  return (
    <div>
      <h1>History</h1>
      <h2>{query}</h2>
    </div>
  );
}


export default History;
