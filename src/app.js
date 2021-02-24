const http = require('http');
const config = {
  host: 'database',
  user: 'root',
  port: '3306',
  password: 'root',
  database: 'nodedb',
  connectionLimit: 10
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);


const sql = `INSERT INTO name(name) values('Luciano')`;
connection.query(sql);
connection.end();

const server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Node & Docker Running...");
});

server.listen(3333);

console.log("Node HTTP Server started at http://localhost:3333/");
