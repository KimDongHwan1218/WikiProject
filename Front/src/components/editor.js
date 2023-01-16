import renderfunction from "./renderfunction";
import htmltosearch from "./htmltosearch";
import { useParams } from 'react-router-dom';
import './Design.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Editor= () =>{
  const params = useParams();
  const query = params.query;
  const [data, setData] = useState(null);

  const callApi = async()=>{
    await axios.get(`/api/docs/${params.query}`)
    .then((load_data)=>{
      console.log(load_data)    
      const output = load_data.data[0]; 
      console.log("output:", output)
      if(output) {
        setData(output.text);
      }
      else{
        setData(null);
      }
      document.getElementById('editor').innerHTML = data;  
    });
  };

  
  // load_origin()
  useEffect(()=>{
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
   // axios.get()

  const DivideBySlot = (html) => { // ===어쩌구===단위로 나누기. slot별로 나누기 위함. 
    let divided_list = []
    const re = /(\n)(?===[^=\n]+==)/g;
    const input_list = html.split(re).filter(x => x !== '\n')
    console.log("input_string", [html])
    console.log("inputlist:", input_list)
    input_list.forEach((value, index, array)=>{
      divided_list.push({"role_id": index, "text":value})
    })
    console.log("divided_list", divided_list)
    return divided_list
  }

  const onClickSubmit = async() => {
    console.log("onclick data", data)
    await axios.post('/api/edit/submit', {"title": query, "plaintext": htmltosearch(data), "data" :DivideBySlot(data)})
    .then(console.log("제출했다 씨발ㅋㅋ"))
    .then(console.log("팝업으로 ㄹㅇ? 확인하고 팝업에서 예스는 페이지 이동할거임."))
  }
  return (
    <div>
      <table className="editor">
        <thead>
          <tr>
            <th><h2>편집 부분</h2></th>
            <th><h2>렌더 부분</h2></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <textarea
                id="editor" 
                onChange={(e) => {
                  setData(e.target.value)
                  console.log("왜 반영이 늦지?", data)
                  document.getElementById('rendered').innerHTML = renderfunction(data);
                }}
              >
              </textarea>
            </td>
            <td><div id="rendered"></div></td>
          </tr>
        </tbody>
      </table>
      <Link to={"/docs/"+query}>
        <button onClick={onClickSubmit}>제출</button>
      </Link>
    </div>

  );
};



export default Editor;