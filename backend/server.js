//server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Include the Sequelize library
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'kacmart', // Use environment variables if available
  password: process.env.DB_PASSWORD || 'kacmart_root8012',
  database: process.env.DB_NAME || 'kacmart_db',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
});

// Try connecting to the database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully!');

    // Connect to your database
    const User = require('./models/user.js'); // Replace with the path to your User model

    // Define API endpoint for user registration
    app.post('/backend/api/register', async (req, res) => {
      const { email, password, firstName, lastName } = req.body;

      // Validate user data
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Hash password for security
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        // Create a new user in the database
        const user = await User.create({ email, password: hashedPassword, firstName, lastName });

        // Send successful response with user data
        res.json({
          message: 'User registered successfully',
          redirectUrl: '/login.html', // Replace with your login page URL
        });
      } catch (error) {
        console.error(error);
        // Handle different error scenarios and send appropriate messages to frontend
        if (error.message.includes('duplicate email')) {
          res.status(409).json({ message: 'Email address already exists' });
        } else {
          res.status(500).json({ message: 'Error registering user' });
        }
      }
    });

    // Define API endpoint for user login
    app.post('/backend/api/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send successful login response
        res.json({ message: 'Logged in successfully', user: { email, firstName, lastName } });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
      }
    });

    // ... Define any other API routes ...

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    // Handle connection error
  });

// Don't forget to close the connection when your server shuts down
process.on('SIGINT', () => {
  sequelize.close().then(() => {
    console.log('Database connection closed gracefully!');
    process.exit(0);
  });
});
