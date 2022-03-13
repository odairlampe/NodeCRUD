const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const Post = require('./models/Post.js')

// config
// template engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// rotas
app.get('/', function (req, res) {
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) {
        res.render('index', { posts: posts })
    })
})

app.get('/cadastro', function (req, res) {
    res.render('formulario');
})
app.post('/add', function (req, res) {
    Post.create({
        nome: req.body.nome,
        estoque: req.body.estoque
    }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        res.send("Erro ao criar post: " + err)
    })
})

app.get('/update/:id', function (req, res) {
    Post.findOne({ where: { id: req.params.id } }).then((posts) => {
        res.render('update', { id: req.params.id, nome: posts.nome, estoque: posts.estoque });
    }).catch((err) => {
        res.send(err)
    })
})

app.post('/update2/:id', function (req, res) {
    Post.update({nome: req.body.nome, estoque: req.body.estoque}, {where: {id: req.params.id}}).then(()=>{
        res.redirect('/');
    }).catch(err =>{
        res.send(err);
    })
})


app.get('/deletar/:id', function (req, res) {
    Post.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        res.send(err)
    })
})


app.listen(8081, function (req, res) {
    console.log("Servidor aberto em 8081");
});