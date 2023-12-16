// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // Replace with your preferred mysql library

// Define database connection details
const dbConfig = {
  host: '127.0.0.1', // Replace with your actual host
  user: 'kacmart', // Replace with your username
  password: 'kacmart_root8012', // Replace with your password
  database: 'kacmart_db' // Replace with your database name
};

// Create an Express application instance
const app = express();

// Connect to the MySQL database
(async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database!');

    // Assign connection to the app object for access in routes
    app.locals.db = connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    process.exit(1);
  }
})();

// Configure Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount your routes
app.use('/', require('./backend/routes/index')); // Replace 'index' with your actual main route file name

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
