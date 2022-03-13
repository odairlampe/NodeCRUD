const db = require('./db');

const Post = db.sequelize.define('produtos', {
    nome: {
        type: db.Sequelize.STRING
    },
    estoque: {
        type: db.Sequelize.INTEGER
    }
})

module.exports = Post;