import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Search= () => {
  const params = useParams();
  const query = params.query;
  console.log(query)
  return (
    <div>
      <Link to={"/docs/"+query}> go to {query} Docs </Link>
      <h1>Search</h1>
      <h2>{query}</h2>
    </div>
  );
}

export default Search;
