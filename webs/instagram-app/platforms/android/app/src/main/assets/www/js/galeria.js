var app = {
    nomGaleries: function () {
        var primeraGaleria = "";
            var contador = 0;
        cordova.plugins.photoLibrary.getAlbums(
            function (albums) {
                document.getElementById('galeriaAdalt').innerHTML = '<div id="dropdown">';
                
                document.getElementById('dropdown').innerHTML += '<a href="#" id="dropbtn"><p>Escollir album</p><span class="icon-chevron-down"></span></a>';
                document.getElementById('dropdown').innerHTML += '<div id="dropdown-content">';
                
                albums.forEach(
                    function (album) {
                        if (album.title === "FilmsWallpapers" || album.title === "AnimeWallpapers" || album.title === "GamesWallpapers") {
                            if (contador === 0) {
                                primeraGaleria = album.title;
                            }
                            
                            var onClick = "app.displayPhoto('" + album.title + "');return false;"
                            
                            document.getElementById('dropdown-content').innerHTML += '<a href="#" onclick="' + onClick + '">' + album.title + '</a>';
                            contador += 1;
                            //                            console.log(album.id);
                            //                            console.log(album.title);
                        }
                    });
                document.getElementById('dropdown').innerHTML += '</div>';
                document.getElementById('galeriaAdalt').innerHTML += '</div>';
                
                
//                app.displayPhoto(primeraGaleria);
            },
            function (err) {
                alert("Error: " + err);
            }
        );
    },

    displayPhoto: function (nomGaleria) {
        var contador2 = 1;
        var contadorClass = 1;
        document.getElementById('galeriaMain').innerHTML = '<p>GALERIA</p>';
        cordova.plugins.photoLibrary.getLibrary(
            function (result) {
                var library = result.library;
                // Here we have the library as array

                library.forEach(function (libraryItem) {
                    //                    console.log(libraryItem.id); // ID of the photo
                    //                    console.log(libraryItem.photoURL); // Cross-platform access to photo
                    //                    console.log(libraryItem.thumbnailURL); // Cross-platform access to thumbnail
                    //                    console.log(libraryItem.fileName);
                    //                    console.log(libraryItem.width);
                    //                    console.log(libraryItem.height);
                    //                    console.log(libraryItem.creationDate);
                    //                    console.log(libraryItem.latitude);
                    //                    console.log(libraryItem.longitude);
                    //                    console.log(libraryItem.albumIds); // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
                    //document.getElementById('imgProva').src = libraryItem.thumbnailURL;
                    //                    && libraryItem.thumbnailURL.indexOf("AnimeWallpapers") !== -1 && libraryItem.thumbnailURL.indexOf("GamesWallpapers") !== -1
                    
//                    "FilmsWallpapers"
                    if (libraryItem.thumbnailURL.indexOf(nomGaleria) !== -1) {
                        if (contador2 == 1) {
                            document.getElementById('galeriaMain').innerHTML += '<div class="borradoresImg"></div>';
                            
                            document.getElementsByClassName('borradoresImg')[contadorClass].innerHTML += '<img src="' + libraryItem.thumbnailURL + '"/>';

                            contador2 += 1;
                        } else if (contador2 == 4) {

                            document.getElementsByClassName('borradoresImg')[contadorClass].innerHTML += '<img src="' + libraryItem.thumbnailURL + '"/>';
                            contador2 = 1;
                            contadorClass+= 1;
                        } else {
                            document.getElementsByClassName('borradoresImg')[contadorClass].innerHTML += '<img src="' + libraryItem.thumbnailURL + '"/>';
                            contador2 += 1;
                        }
                    }

                });

                //               <div class="borradoresImg">
                //                   <img src="img/entrada2.jpg" alt="beach">
                //                   <img src="img/entrada2.jpg" alt="beach">
                //                   <img src="img/entrada2.jpg" alt="beach">
                //                   <img src="img/entrada2.jpg" alt="beach">
                //               </div>

            },
            function (err) {
                console.log('Error occured');
            }, { // optional options
                thumbnailWidth: 512,
                thumbnailHeight: 384,
                quality: 0.8,
                includeAlbumData: true // default
            }
        );
    }
}

document.addEventListener('deviceready', app.nomGaleries);