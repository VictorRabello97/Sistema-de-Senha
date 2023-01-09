
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


function toggleFullScreen() {
            if (!document.fullscreenElement &&    // alternative standard method
                !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
              } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
              } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
              } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              }
            }
          }

function fullScreen(){
            toggleFullScreen()


}
        