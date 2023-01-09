async function postBackEnd(url, body){
  await axios({
    method: 'post',
    url: 'http://localhost:3000/senhaComum',
    data: {
      tipo: body.tipo,
      Descricao: body.Descricao,
      nomeLetra: body.nomeLetra
}
  }).then((response)=>{

  let objeto = JSON.parse(response.config.data);
  const {Descricao} = objeto
  
    window.location.replace(`http://127.0.0.1:5500/Front-End/HTML/Pagina%20de%20Impressao/index.html?descricao=${Descricao}&senha=${response.data.numsenha}`)

  })

}

function getParams(event){

  event.preventDefault()
  let url = "http://localhost:3000/senhaComum"
  const tipo = "C"
  let value = event.target.innerHTML
  let valueLetra = event.target.value
  // console.log(valueLetra)
  // console.log(value)

      let body = {
      "tipo": tipo,
      "Descricao": value,
      "nomeLetra": valueLetra
      }


  postBackEnd(url, body)
};



async function GetSenhas(){
  await axios({
    method: 'get',
    url: `http://localhost:3000/senhaComum`,

  }).then((response)=>{
      // console.log(response.data)

  response.data.forEach(element => {
      const descSenha = element.NomeDesc
      const nomeLetra = element.NomeLetra

      const divSenha = document.querySelector('#senhas') 
      

      createSenhas(descSenha, divSenha, nomeLetra)
      
    })


   }).
   catch((error, response)=>{
    // console.log(error)
    // console.log(error.response.data.msg)
    
  })

}


function createSenhas(descSenha, divSenha, nomeLetra){
    const divPai = document.createElement('div')
    const divFilho = document.createElement('div')
       
       divFilho.id = 'buttonSenha'
         

       divFilho.textContent = descSenha
       divFilho.value = nomeLetra
       divFilho.onclick = function(event){
        getParams(event)
       }

  

       divPai.appendChild(divFilho)

       divSenha.appendChild(divPai)
}

GetSenhas()

