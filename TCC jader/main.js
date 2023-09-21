function limitarCaracteresNaClasse(texto, limite) {
    const elementos = document.getElementsByClassName(texto);
  
    for (let i = 0; i < elementos.length; i++) {
      let texto = elementos[i].innerText;
  
      if (texto.length > limite) {
        texto = texto.substring(0, limite) + '...';
      }
  
      elementos[i].innerText = texto;
    }
  }

  limitarCaracteresNaClasse('texto', 106);

//modal

var modal = document.getElementById("meuModal");
var modalContent = document.querySelector(".modal-content");
var botaoAbrirModal = document.getElementById("abrirModal");
var botaoFechar = document.querySelector(".fechar");
var divsAbrirModal = document.getElementsByClassName("abrir-modal");

for (var i = 0; i < divsAbrirModal.length; i++) {
  divsAbrirModal[i].addEventListener("click", function() {

    var conteudoDiv = this.innerHTML;
    var titutoDiv = this.innerHTML;

    document.getElementById("conteudoModal").innerHTML = conteudoDiv;
    document.getElementsByClassName("tituloModal").innerHTML = titutoDiv;
 
    modal.style.display = "block";
  });
}


botaoFechar.addEventListener("click", function() {
  modal.style.display = "none";
});

//fim modal

//drag 

$(document).ready(function() {
  $(".conteudo").sortable({
    connectWith: ".conteudo",
    cursor: "move",
    placeholder: "placeholder",
  }).disableSelection();
});

//fim drag

const express = require('express')
const bodyParser = require('body-parser')
var mysql = require('mysql')

const app = express()
const jsonParser = bodyParser.json()

app.listen(3000)

var con = mysql.createConnection({
  host: "localhost",
  user: "nodeApp",
  password: "Abcd&1234",
  database: "node"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado!");
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get("/Tarefas/", function (req,res){
  var sql = "SELECT * FROM Tarefas"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send( result )
  })
})

app.get("/Tarefas/:id", function(req,res){
  var sql = "SELECT * FROM Tarefas WHERE id = ?"
  var values = [req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    if( result.length == 0 ){
      res.status( 404 ).send({})
    }else{
      res.send( result )
    }
  });
})

app.post("/Tarefas/", jsonParser, function( req, res ){
  var sql = "INSERT INTO Tarefas (titulo, descricao, links, dataT, diario) VALUES (?,?,?,?,?)";
  var values = [req.body.titulo, req.body.descricao, req.body.links, req.body.dataT, req.body.diario]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    const novaPessoa = {
      id: result.insertId,
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      links: req.body.links,
      dataT: req.body.dataT,
      diario:req.body.diario
    };
    res.send( novaTarefa );
  });
});

app.put("/Tarefas/:id",jsonParser, function(req,res){
  var sql = "UPDATE Tarefas SET titulo = ?, descricao = ?, links = ?, dataT = ?, diario = ? WHERE id = ?";
  var values = [req.body.titulo, req.body.descricao, req.body.links, req.body.dataT, req.body.diario, req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    if( result.affectedRows == 0 ){
      res.status( 404 ).send( {} )
    }else{
      const novaTarefa = {
        id: req.params.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        links: req.body.links,
        dataT: req.body.dataT,
        diario:req.body.diario
      };
      res.send( novaTarefa );
    }
  });
});

app.delete("/Tarefas/:id", jsonParser, function(req, res){
  var sql = "DELETE FROM Tarefas WHERE id = ?";
  var values = [req.params.id]
  con.query(sql, values, function (err, result) {
    if (err) throw err;
     if( result.affectedRows == 0 ){
      res.status( 404 ).send( {} );
    }else{
      res.status(204).send( {} );
    }
  });
  
});



