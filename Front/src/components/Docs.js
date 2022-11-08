import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Docs = () => {
  const params = useParams();
  const query = params.query;
  return (
    <div>
      <Link to={"/discuss/"+query}> discuss </Link>
      <Link to={"/edit/"+query}> edit </Link>
      <Link to={"/history/"+query}> history </Link>
      <h1>Docs</h1>
      <h2>{query}</h2>

    </div>
  );
};

export default Docs;
