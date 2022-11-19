var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var app = express(); //express를 실행하여 app object를 초기화 합니다.
const test = require('./Router/test');
const querys = {
  get_doc: `Select text_beta, slot_role_id from slots, text_beta where slot_content_id = text_beta_id AND slot_rev_id = (Select page_current_rev_id from page where page_title=$1)`,
  search_doc: "Select * from page, slots, text_beta where page_current_rev_id=slot_rev_id and slot_content_id=text_beta_id and text_beta like '%'||$1||'%'" //fulltextsearch사용하자
};

const dbconfig = {
  user: "postgres",
  host: "localhost",
  database: "wiki",
  password: "kdhs1218!",
  port: 5432,
}

const { Client } = require("pg");
const client = new Client(dbconfig);

client.connect(err => {
  if (err) {
    console.log('Failed to connect db ' + err)
  } else {
    console.log('Connect to db done!')
  }
})



async function dbquery(query, params){
  console.log(query, params)
  return await client.query(query, params)
  // .then((res) => {
  //   console.log(res.rows[0])
  // })
  .catch((e) => console.error(e.stack));
}

app.get('/api', function(req, res) { // '/' 위치에 'get'요청을 받는 경우,
  res.send({test:'Hello World!'}); // "Hello World!"를 보냅니다.
});

app.get('/api/docs/:document', async(req, res)=>{
  const content = await dbquery(querys.get_doc, [req.query.document]) //docs에서 준 param: req.query.document
  res.send({test:content.rows}); //쿼리 결과: //content.row
});

app.get('/api/search/:search', async(req, res)=>{
  const content = await dbquery(querys.search_doc, [req.query.search])
  res.send({test:content.rows}); //쿼리 결과: //content.row
});

// app.post('/document/:document', function(req, res){
//   res.send("수정 요청 정상적으로 보내짐");
// });

// app.get('/query/:query', function(req, res){
//   res.json({"results":["검색 결과 1", "검색 결과 2"]});
// });

// app.get('/history/:history', function(req, res){
//   res.json({"results":["이전 버전 1", "이전 버전 2"]});
// });

// app.use('/api', test);

var port = 4000; // 사용할 포트 번호를 port 변수에 넣습니다. 
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});