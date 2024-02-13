const express = require("express");
const app = express();
const bodyParaser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/pergunta');
//Database

connection
.authenticate()
.then(()=>{
    console.log( "Conectado com o banco de dados!" );
})
.catch((msgErro)=>{
    console.error( msgErro);
})


// estou dizendo para o express usar o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public')); // serve os arquivos do public diretório

app.use(bodyParaser.urlencoded({ extended: false })); 
app.use(bodyParaser.json()); // permite que eu possa pegar as informações enviadas pelo formulário em JSON
app.locals.partials = true;

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({raw: true}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    });    
});

app.get("/perguntar",(req,res) =>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,	
        descricao: descricao
    }).then( ()=>{
        res.redirect('/')
    })
     .catch((erro)=> {
         console.log(erro);
     });
});


app.listen(8080,()=>{
   console.log("Servidor rodando na porta 8080") 
});