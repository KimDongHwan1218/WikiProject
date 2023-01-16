import { useParams } from 'react-router-dom';
import "./Design.css"
import Editor from './editor';

const Edit = () => {
  const params = useParams();
  const query = params.query;

  return (
    <div className='container'>
      <div className='contents'>
        <h1>Edit</h1>
        <h2>{query}</h2>
        <Editor/>
      </div>
      <div className='rightside'>
        광고/핫게시물/최근수정
      </div>
    </div>
  );
}


export default Edit;