$( document ).ready(function() {

    document.getElementById('connectButton').addEventListener('click', () => {
        if (navigator.serial) {
          connectSerial();
        } else {
          alert('Web Serial API not supported.');
        }
      });
      
      async function connectSerial() {
        const log = document.getElementById('target');
          
        try {
          const port = await navigator.serial.requestPort();
          await port.open({ baudRate: 9600 });
          $('#connectButton').hide();
          
          const decoder = new TextDecoderStream();
          
          port.readable.pipeTo(decoder.writable);
      
          const inputStream = decoder.readable;
          const reader = inputStream.getReader();
          
          while (true) {
            const { value, done } = await reader.read();
            if (value) {
              log.textContent += value + '\n';
              console.log(value)
            
              let t = parseInt(value)
              if(t ) {
                console.log('numer o11')
                document.getElementById('capture').click();
              }
            }
            if (done) {
              console.log('[readLoop] DONE', done);
              reader.releaseLock();
              break;
            }
          }
        
        } catch (error) {
          log.innerHTML = error;
        }
    }



    let img = 1;
    let init = false;

    $('#stage2').hide();
    $('#stage3').hide();
    

    setInterval( () => {
        if(init) {
            document.getElementById('capture').click();
        }
    }, 1300 )

    navigator.mediaDevices.getUserMedia({video: true})
    .then(function (mediaStream) {
        window.scrollTo(0, 0);
        const video = document.querySelector('#video');
        video.srcObject = mediaStream;
        video.play();
    })
    .catch(function (err) {
        console.log('Não há permissões para acessar a webcam')
    })

    document.querySelector('#capture').addEventListener('click', function (e) {
        init = true;
        if(img == 13) { 
            img = 1;
            init = false;
            setTimeout( () => {
                document.getElementById('treinar').click();
            }, 4000)
            return;

        }
        let canvas = document.querySelector(`#canvas${img}`); 
        // canvas.height = '200px';
        // canvas.width = '200px';
        let heightRatio = 2;
        canvas.height = canvas.width * heightRatio;
        canvas.width = canvas.width * heightRatio;

        let context = canvas.getContext('2d');
        context.drawImage(video, 0, 0)
        img++;
        
    })

    document.querySelector('#treinar').addEventListener('click', function (e) {
        $('#stage1').hide();
        $('#stage2').show();

        setTimeout( () => {
            
            $('#stage1').hide();
            $('#stage2').hide();
            $('#stage3').show();
            $('#mymargin').hide();
        }, 2000)
    })


});
