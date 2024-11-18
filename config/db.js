const { Sequelize } = require('sequelize');

// Initialize Sequelize to connect to MySQL
const sequelize = new Sequelize('blogposting', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',       
});
sequelize.authenticate().then(() => console.log('Database connected!')).catch((error) => console.log(error));

module.exports = sequelize;