var express = require('express')
var cors = require('cors')
var fs = require('fs')
var mysql  = require('mysql');


//SERVIDOR BACK END
const app =  express();
const port = 3000

app.listen(port, () => {
 
  console.log(`Servidor escutando na porta ${port}`)
}); 

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", 'GET,POST')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  app.use(cors({}))
  next()
})


function ConnectSQL(){ 
  connection = mysql.createConnection({
    host     : '',    //HOST DO BANCO DE DADOS
    user     : '',        // NOME DO USUARIO DO SEU BANCO DE DADOS
    password : '',    // SENHA DO SEU BANCO DE DADOS
    database : ''     //NOME DO SEU BANCO DE DADOS
  });
} 


app.post("/senhaPrioritaria", (req, res) => {

  ConnectSQL();

  connection.connect();

  let numsenha = 0

  const Tipo = req.body.tipo
  const descricao = req.body.Descricao
  const nomeLetra = req.body.nomeLetra


  connection.query(`SELECT * FROM senha_estoque WHERE TipoTipo = "${Tipo}" 
  AND DATE(DataSenha) = CURRENT_DATE AND NomeDescri = "${descricao}" ORDER BY NumSenha DESC LIMIT 1`, 
  function (error2, results2, fields2) {
  if (error2) throw error2;

  numsenha = results2[0]?.NumSenha ?? 0 

  numsenha = numsenha + 1


  connection.query(`INSERT INTO senha_estoque (NumEstacao, NumGuiche, 
                    NomeLetra, TipoTipo, NumSenha, QuantChamada, NomeDescri, 
                    DataChama, ClinicaCharmar, ClinicaNome, 
                    NumUsuario, NomeUsuario, Status, DataSenha, 
                    DataAtendi, NumAtend, Imp, PreAtendi, 
                    Encaminhada, TxtObs, NumNivel) VALUES 
                    ( 0, " " ,"${nomeLetra}", "${Tipo}", ${numsenha}, 0, "${descricao}", NULL , CURRENT_TIMESTAMP, 
                    " " , 0, " ", 1, CURRENT_TIMESTAMP, NULL, 1, "True", "False", "False", " ", 0
                    )`, 
    function (error3, results3, fields3) {
    if (error3) throw error3;
    // console.log('The solution is: ', results3);

                            
    connection.end();

    res.status(200)
    res.send({numsenha: numsenha})

});

                        
});

                        
})

app.get("/senhaPrioritaria", (req, res) => {

  ConnectSQL();

  connection.connect();

  connection.query(`SELECT * FROM senha_estacao WHERE NumEstacao = 2 AND TipoPrioritaria = 'True'`, 
  function (error5, results5, fields5) {
    if (error5) throw error5;
    // console.log('The solution is: ', results5);
    connection.end();

         
    res.status(200)
    res.send(results5)

  })

})




app.get("/senhaComum", (req, res) => {

  ConnectSQL();

  connection.connect();

  connection.query(`SELECT * FROM senha_estacao WHERE NumEstacao = 2 AND TipoPrioritaria = 'False'`, 
  function (error6, results6, fields6) {
    if (error6) throw error6;
    // console.log('The solution is: ', results6);
    connection.end();

         
    res.status(200)
    res.send(results6)

  })

})

app.post("/senhaComum", (req, res) => {

  ConnectSQL();

  connection.connect();

  let numsenha = 0


  // console.log(req.body)

  const Tipo = req.body.tipo
  const descricao = req.body.Descricao
  const nomeLetra = req.body.nomeLetra

  connection.query(`SELECT * FROM senha_estoque WHERE TipoTipo = "${Tipo}" 
  AND DATE(DataSenha) = CURRENT_DATE AND NomeDescri = "${descricao}" ORDER BY NumSenha DESC LIMIT 1`, 
  function (error2, results2, fields2) {
  if (error2) throw error2;

  numsenha = results2[0]?.NumSenha ?? 0 

  numsenha = numsenha + 1


  connection.query(`INSERT INTO senha_estoque (NumEstacao, NumGuiche, 
                    NomeLetra, TipoTipo, NumSenha, QuantChamada, NomeDescri, 
                    DataChama, ClinicaCharmar, ClinicaNome, 
                    NumUsuario, NomeUsuario, Status, DataSenha, 
                    DataAtendi, NumAtend, Imp, PreAtendi, 
                    Encaminhada, TxtObs, NumNivel) VALUES 
                    ( 0, " " ,"${nomeLetra}", "${Tipo}", ${numsenha}, 0, "${descricao}", NULL , CURRENT_TIMESTAMP, 
                    " " , 0, " ", 1, CURRENT_TIMESTAMP, NULL, 1, "True", "False", "False", " ", 0
                    )`, 
    function (error3, results3, fields3) {
    if (error3) throw error3;
    // console.log('The solution is: ', results3);

                            
    connection.end();

    res.status(200)
    res.send({numsenha: numsenha})

});

                        
});

                        
})



// GET DA IMAGEM PARA PÁGINA DE IMPRESSAO.
app.get("/", (req, res) => {

  ConnectSQL();

  connection.connect();

  connection.query(`SELECT ImgSenha FROM config `, 
  function (error4, results4, fields4) {
    if (error4) throw error4;
    connection.end();
         
    const img = results4


    
    
    res.status(200)
    res.send(img[0].ImgSenha)


  })

})




  




