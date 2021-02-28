const app = require('express')();
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'nodedb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/:name', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  await insertPeople(req.params.name);
  const allPeople = await getAllPeople();
  
  let html = '<h1>Full Cycle Rocks!</h1> - Lista de nomes cadastrada no banco de dados:'
  html += '<ul>';
  allPeople.forEach( (people) => {
    html += '<li>' + people.name + '</li>';
  });
  html += '</ul>';
  res.send(Buffer.from(html));
})

const server = app.listen(3333);

async function insertPeople(name) {
  await pool.query(
    'INSERT INTO people SET ?',
    { name }
  ); 
}

async function getAllPeople() {
  const result = await pool.query("SELECT id,name FROM people ORDER BY id ASC");
  return result[0] || result;
}
