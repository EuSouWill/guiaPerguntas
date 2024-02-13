const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas','root', '@Ab221223',{
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;