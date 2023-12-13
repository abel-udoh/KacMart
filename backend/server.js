// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
/*
const { Sequelize } = require('sequelize');
const sequelizeConfig = require('./sequelize.config');
const UserModel = require('./models/user');

const sequelize = new Sequelize(sequelizeConfig.development);
const User = UserModel(sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});
*/