const { Client } = require("pg");
const client = new Client({
  user: "postgre",
  host: "postgre",
  database: "wiki",
  password: "kdhs1218!",
  port: 5432,
});
client.connect();
const query = {
  text: "SELECT * FROM member",
};
client
  .query(query)
  .then((res) => {
    console.log(res.rows[0]);
    client.end();
  })
  .catch((e) => console.error(e.stack));