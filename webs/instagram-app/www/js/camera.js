var app = {
    takephoto:function(){
        var cameraOptions = {
            quality : 100,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            mediaType : Camera.MediaType.PICTURE,
            encodingType : Camera.EncodingType.JPEG,
            cameraDirection : Camera.Direction.BACK,
            correctOrientation : true,
            saveToPhotoAlbum: false
        };
        
        navigator.camera.getPicture(app.cameraSuccess, app.cameraError, cameraOptions);
    },
    
    cameraSuccess:function(imageURI){
        document.getElementById("foto").src = imageURI;
        var x;
        for(x = 1;x<18;x++){
            document.getElementById("foto"+x).src = imageURI;
        }
    },
    
    cameraError:function(message){
        alert("Error: " + message);
    }
}

document.addEventListener('deviceready', app.takephoto);