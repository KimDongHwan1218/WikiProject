const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.send({ test: "hi"});
});


router.get('/api/docs/:document', function(req, res){
  let content = req.params.document;
  content += " 문서"
  res.json({test:content});
});

module.exports = router;