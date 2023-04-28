$( document ).ready(function() {
    let img = 1;
    let init = false;

    $('#stage2').hide();
    $('#stage3').hide();
    

    setInterval( () => {
        if(init) {
            document.getElementById('capture').click();
        }
    }, 200 )

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
