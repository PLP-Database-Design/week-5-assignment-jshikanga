require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Create a MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the database connection
db.connect(err => {
  if (err) {
    return console.error('Database connection failed:', err);
    
  }
  console.log('Connected to the database.', db.threadId)
});

// // Root route
app.get('/', (req, res) => {
    res.json('Welcome to the hospital db!');
  });

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const getPatients = 'SELECT * FROM patients';
  db.query(getPatients, (err, data) => {
    if (err) {
      return res.status(500).json("failed to get patients", err)
    }
    res.json(200).json(data);
  });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, providers_specialty FROM providers';
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json("failed to get all providers");
    }
    res.json(200).json(data);
  });
});

// Question 3: Filter patients by first name
app.get('/patients/:firstName', (req, res) => {
  const firstName = req.params.firstName;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  db.query(query, [firstName], (err, data) => {
    if (err) {
      return res.status(500).json("failed to get patients first name");
    }
    res.json(200).json(data);
  });
});

// Question 4: Retrieve providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  const query = 'SELECT first_name, last_name, providers_specialty FROM providers WHERE providers_specialty = ?';
  db.query(query, [specialty], (err, data) => {
    if (err) {
      return res.status(500).json("failed to get providers by their speciality");
    }
    res.json(200).json(data);
  });
});

// Listen to the server
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`server is running on port 3300...`);
});