const express = require('express');
const path = require('path');
const mysql = require('mysql');

require('dotenv').config();
const app = express();
const PORT = process.env.port || 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'search_clients_ilya',
});

app.use(express.json({ limit: '20mb', extended: true }));

// for linux server
// app.use(express.static(path.join(__dirname, './../../build')));
// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root: path.join(__dirname, './../../build') });
// });

app.get('/checkUser', (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (results.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  });
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/getUserData', (req, res) => {
  const { birthday, city } = req.query;

  if (!birthday || !city) {
    return res.status(400).json({ error: 'Birthday and city are required' });
  }

  connection.query(
    'SELECT * FROM users WHERE birthday = ? AND city = ?',
    [birthday, city],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (results.length > 0) {
        res.json({ userData: results });
      } else {
        res.json({ message: 'No user found with the specified criteria' });
      }
    },
  );
});

async function start() {
  try {
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
    });

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    // connection.end();
  } catch (error) {
    console.log(error);
  }
}

start();
