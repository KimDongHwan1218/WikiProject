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
const PORT = process.env.PORT || 4000;


client.connect(err => {
  if (err) {
    console.log('Failed to connect db ' + err)
  } else {
    console.log('Connect to db done!')
  }
})
const querys = {
  get_document: "SELECT * FROM page, text, slots where page_title = $1 and slot_rev_id = page_current_rev_id and text_id = slot_content_id",
  search_title: "SELECT * FROM page where page_title = $1",
  search_text: "SELECT * FROM search, page, slots where slot_rev_id = page_current_rev_id and search_id = slot_content_id and search in '%'||$1||'%'",
  new_page: "INSERT INTO page(page_current_rev_id, page_title) values(0, $1)",
  new_revision: "INSERT INTO revision(page_current_rev_id, page_title) values(0, $1)",
  load_page_data: "SELECT * FROM page where page_title = $1",
  edit_page: ,
};

function query(query, param){
  client
  .query(query, param)
  .then((res) => {
    console.log(res.rows[0]);
    client.end();
  })
  .catch((e) => console.error(e.stack));
}


app.get('/', (req, res) => {
  res.send('Server Response Success');
})

app.get('/docs/:document', (req, res) => {
  document_id = req.params.document
  console.log(document_id)
  const result = query(querys.get_document, [document_id])
  res.send(result);
})

app.

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});