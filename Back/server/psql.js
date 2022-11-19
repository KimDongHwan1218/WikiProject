  const { Client } = require("pg");
  const client = new Client({
    user: "postgre",
    host: "localhost",
    database: "wiki",
    password: "kdhs1218!",
    port: 5432,
  });

  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 4000;


  client.connect();
  const querys = {
    get_document: "SELECT * FROM page, text_beta, slots where page_title = $1, slot_rev_id = page_current_rev_id and text_beta_id = slot_content_id",
    search_title: "SELECT * FROM page where page_title = $1",
    search_text: "SELECT * FROM search, page, slots where slot_rev_id = page_current_rev_id and search_id = slot_content_id and search in '%'||$1||'%'",
    
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
    const result = query(querys.get_document, document_id)
    res.send(result);
  })