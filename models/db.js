const Sequelize = require("sequelize");

// conexao com o banco de dados mysql
const sequelize = new Sequelize('cadastro', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}