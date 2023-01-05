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


client.connect(err => {
  if (err) {
    console.log('Failed to connect db ' + err)
  } else {
    console.log('Connect to db done!')
  }
})
const querys = {
  // get_document: "SELECT * FROM page, text, slots where page_title = $1 and slot_rev = page_current_rev and text = slot_content;",
  get_document: "SELECT * FROM page, text where page_title = $1;",
  search_title: "SELECT * FROM page where page_title = $1;",
  search_content: "SELECT * FROM search, page, slots where slot_rev = page_current_rev and search = slot_content and search in '%'||$1||'%';",
  search_title_content:"SELECT * FROM search, page, slots where (slot_rev = page_current_rev and search = slot_content and search in '%'||$1||'%') OR page_title=$1;",
  get_history: "SELECT * FROM revision R NATURAL JOIN page P where page_title = $1;",
  // get_diff:

  new_page: "INSERT INTO page(page_current_rev, page_title) values(0, $1);",
  new_revision: "INSERT INTO revision(page_current_rev, page_title) values(0, $1);",
  load_page_data: "SELECT * FROM page where page_title = $1;",
};

const  query = async(query, param)=>{
  client
  .query(query, param)
  .then((res) => {
    console.log(res.rows[0]);
    // client.end();
  })
  .catch((e) => console.error(e.stack));
}


app.get('/', (req, res) => {
  res.send('Server Response Success!!!');
})

// app.use('/', test);

app.get('/api/docs/:document', (req, res) => {
  const {document} = req.params
  console.log("document:", document)
  client
  .query(querys.get_document, [document])
  .then((result) => {
    res.send(result.rows);
    console.log(result)})
})

app.get('/api/search/:search', (req, res) => {
  console.log("search!!!!!!!!!!!!!!!!!!")
  const t = (req.query.type ? req.query.type : null)
  const {q} = req.params
  switch(t){
    case null:
      result = query(querys.search_title, [q])
      // result = query(querys.search_title_content, [q])
    case ('title'):
      result = query(querys.search_title, [q])
    case ('content'):
      result = query(querys.search_content, [q])
    case ('title_content'):
      result = query(querys.search_title_content, [q])
    default: res.send(result);
  }
  
})

app.get('/history/:document', (req, res) => {
  const {document} = req.params
  const result = query(querys.get_history, [document])
  res.send(result);
})

app.get('/diff/:document', (req, res) => {
  const {document} = req.params
  const {rev, revold} = req.query
  const result = query(querys.get_diff, [document, rev, revold])
  res.send(result);
  // we need algorithm 
})

app.post('/edit/:document', (req, res) =>{
  const {document} = req.params
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});