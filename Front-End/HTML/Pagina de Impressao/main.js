function getImage(){

    function toBase64(arr) {
    return btoa(
        arr = new Uint8Array(arr),
        
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}

    fetch('http://localhost:3000/')
    .then(res => res.blob())

    .then(blob => {
        
        // console.log('data:image/jpeg;base64,' + toBase64(blob))
        

        const file =  new File([blob], 'image', {type: blob.type});

        readFile(file);
        
            
            }).catch(error => {
                // console.log(error)
            })
        
            function readFile(input){
                const fr = new FileReader();
        
                fr.readAsDataURL(input);
        
                fr.addEventListener("load", () => {
                    let res = fr.result;
                    
                   res = res.replace('application/octet-stream', 'image/jpeg' )

                        const img = document.getElementById("teste")
                        
                        img.src = res

                        URL.revokeObjectURL(img.src)
                })
            }
        }
        
        getImage()
        



function paramsUrl(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const descricao = urlParams.get('descricao');
    const senha = urlParams.get('senha');

    axios.get("http://127.0.0.1:5500/Front-End/HTML/Pagina%20de%20Impressao/index.html?descricao=${Descricao}&senha=${response.data.numsenha}")
    .then(response => {
        info.textContent = `${descricao} - Senha ${senha}`
    })

}

setTimeout(function(){
    window.location.replace(`http://127.0.0.1:5500/Front-End/HTML/MainPage/index.html`)

}, 5000);

    paramsUrl();




