const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "wiki",
  password: "kdhs1218!",
  port: 5432,
});

const express = require('express');
const app = express();
// const test = require('.//Router/test');
const PORT = process.env.PORT || 4000;

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));


client.connect(err => {
  if (err) {
    console.log('Failed to connect db ' + err)
  } else {
    console.log('Connect to db done!')
  }
})
const querys = {
  get_document: "SELECT * FROM page, text, slots where page_title = $1 and slot_rev_id = page_current_rev_id and text_id = slot_content_id;",
  get_old_document: "SELECT * FROM page, text, slots where page_title = $1 and slot_rev_id = $2 and text_id = slot_content_id;",
  // get_document: "SELECT * FROM page, text where page_title = $1;",
  search_title: "SELECT page_title, text, page_id FROM search, page where page_id = search_page_id and page_title LIKE '%'||$1||'%';",
  search_content: "SELECT page_title, text, page_id FROM search, page where page_id = search_page_id and text LIKE '%'||$1||'%';",
  search_title_content:"SELECT page_title, text, page_id FROM search, page where (page_id = search_page_id and text LIKE '%'||$1||'%') OR page_title LIKE '%'||$1||'%';",
  get_histories: "SELECT rev_id, rev_timestamp FROM revision, page where page_title = $1 and revision.page_id = page.page_id;",
  // get_history: "SELECT "
  // get_diff:
  recent_changes: "SELECT page_title, max(rev_timestamp) as time FROM revision, page where revision.page_id = page.page_id GROUP BY page_title ORDER BY time DESC LIMIT 10;",

  is_page: "SELECT page_id FROM page where page_title = $1 and page_current_rev_id > 0;", // 정확한 페이지 체크
  get_page: "SELECT page_id FROM page where page_title = $1;",
  new_text: "INSERT INTO text(text) values($1) RETURNING text_id;",
  new_search: "INSERT INTO search(search_page_id, text) values($1, '');",
  new_page: "INSERT INTO page(page_current_rev_id, page_title) values(0, $1);",
  new_revision: "INSERT INTO revision(page_id, rev_timestamp) values($1, NOW()) RETURNING rev_id;",
  new_slot: "INSERT INTO slots(slot_rev_id, slot_role_id, slot_content_id) values($1, $2, $3);",
  change_recent_revision: "UPDATE page SET page_current_rev_id = $2 where page_id = $1;",
  update_search: "UPDATE search SET text= $2 where search_page_id = $1;",
  load_page_data: "SELECT * FROM page where page_title = $1;",
};

const query = async(query, param)=>{
  client
  .query(query, param)
  .then((res) => {
    // console.log(res.rows[0]);
    // client.end();
  })
  .catch((e) => console.error(e.stack))
  // .then(() => client.end())
}

app.get('/', (req, res) => {
  res.send('Server Response Success!!!');
})

app.get('/api/latest', (req, res) => {
  client.query(querys.recent_changes,[])
  .then((result)=>res.send(result))
})

// app.use('/', test);

app.get('/api/docs/:document', (req, res) => {
  const {document} = req.params //나중에 params.어쩌구 확인 후 수정
  console.log(req.query)
  {req.query.rev ? 
  client
  .query(querys.get_old_document, [document, req.query.rev])
  .then((result) => {
    res.send(result.rows);
    //console.log(result)
  }) : 
  client
  .query(querys.get_document, [document])
  .then((result) => {
    res.send(result.rows);
    //console.log(result)
  })
  // .then(() => client.end())
}
})

app.get('/api/search/:search', (req, res) => {
  const t = (req.query.type ? req.query.type : null)
  console.log("t", req.query)
  const q = req.params.search
  console.log("q", q)
  switch(t){
    case null:
      client.query(querys.search_title, [q])
      .then((search_result)=>res.send(search_result))
      break;
      // result = query(querys.search_title_content, [q])
    case ('title'):
      client.query(querys.search_title, [q])
      .then((search_result)=>res.send(search_result))
      break;
    case ('content'):
      client.query(querys.search_content, [q])
      .then((search_result)=>res.send(search_result))
      break;
    case ('title_content'):
      client.query(querys.search_title_content, [q])
      .then((search_result)=>res.send(search_result))
      break;
    default: res.send(null);
  }
  
})

app.get('/api/history/:document', (req, res) => {
  const {document} = req.params
  client.query(querys.get_histories, [document])
  .then((result) => res.send(result))
})

app.get('/diff/:document', (req, res) => {
  const {document} = req.params
  const {rev, revold} = req.query
  const result = query(querys.get_diff, [document, rev, revold])
  res.send(result);
  // we need algorithm 
})

async function create_new_page(page_title, get_page) {
  if(get_page.rows[0]) return null
  else return await client.query(querys.new_page, [page_title])
  .then(()=>client.query(querys.get_page, [page_title]))
  .then((get_page)=>{
    client.query(querys.new_search, [parseInt(get_page.rows[0].page_id)])
  })
}

async function is_new_page(page_title) {
  return await client.query(querys.get_page, [page_title])
  .then((get_page) => create_new_page(page_title, get_page))
  .then(()=> client.query(querys.get_page, [page_title]))
}

  
app.post('/api/edit/submit', (req, res) =>{
  console.log("body:", req.body)
  const page_title = req.body.title
  const texts = req.body.data // texts: [{text.roleid, text.text}, ...]
  const plaintext = req.body.plaintext
  let page_id = null
  is_new_page(page_title)
  .then((pid)=>{
    page_id = pid.rows[0].page_id
    // return client.query(querys.new_revision, [page_id])
    return client.query(querys.new_revision, [page_id])
  })
  .then((rev_result) => {
    const new_rev_id = rev_result.rows[0].rev_id;
    texts.map(text => {
      client.query(querys.new_text, [text.text])
      .then((text_result) =>{
        console.log("text_inserted", text_result)
        query(querys.new_slot, [new_rev_id, text.role_id, text_result.rows[0].text_id]);
        console.log("new_slot_created")
        query(querys.change_recent_revision, [page_id, new_rev_id])
        console.log("page_recent_revision_changed")
      })
    })
  })
  .then(()=> {
    client.query(querys.update_search, [Number(page_id), plaintext])
  })
  // .then(() => client.end())
})
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

// 문서 편집 & 생성

// 1. 문서 작성
// 2. 문서 분할
// 3. 이전문서(없다면 공백)과 비교 <<< 비교 알고리즘 필요한데 일단 뺴고 생각해보자
// 4. 비교의 결과를 반영
// 4-1 new slot 생성
// 4-2 new revision 생성
// 4-3 page recent revision 수정