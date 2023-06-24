window.addEventListener("load", inici, false);

function inici(){
    var xhttp = new XMLHttpRequest(); //Variable de connexió amb XML    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "jocs.xml", true);
    xhttp.send();
}

function myFunction(xml){
    var url = window.location.href.split("#");
    var xmlDoc = xml.responseXML;
    for(var x = 0;x<xmlDoc.getElementsByTagName("joc").length;x++){
        var comprovadorJocID = xmlDoc.getElementsByTagName("joc")[x].getAttribute("id");
        //Busca el joc pertinent
        
        if(comprovadorJocID === url[1]){
            
            
            var contadorPublishers = xmlDoc.getElementsByTagName("desenvolupador").length;
            var publisherActual = "";
            
            for(var y = 0;y<contadorPublishers;y++){
                var publishers = xmlDoc.getElementsByTagName("desenvolupador")[y].getAttribute("ref").split(" ");

                for(var z = 0;z<publishers.length;z++){
                    if(publishers[z] === url[1]){
                        publisherActual = xmlDoc.getElementsByTagName("desenvolupador")[y].innerHTML;
                        break;
                    }
                }
            }
            
            
            
            var contadorPlataformes = xmlDoc.getElementsByTagName("plataforma").length;
            var plataformaActual = "";
            
            for(var y = 0;y<contadorPlataformes;y++){
                var plataformes = xmlDoc.getElementsByTagName("plataforma")[y].getAttribute("ref").split(" ");

                for(var z = 0;z<plataformes.length;z++){
                    if(plataformes[z] === url[1]){
                        plataformaActual = xmlDoc.getElementsByTagName("plataforma")[y].innerHTML;
                        break;
                    }
                }
            }
            
            var nomClasse = "";
            if(plataformaActual == "PC"){
                nomClasse = "PC";
            }else if(plataformaActual == "PlayStation 4"){
                nomClasse = "PS4";
            }else if(plataformaActual == "XBOX ONE"){
                nomClasse = "XBoxOne";
            }else if(plataformaActual == "PlayStation 3"){
                nomClasse = "PS3";
            }else if(plataformaActual == "Xbox 360"){
                nomClasse = "Xbox360";
            }else if(plataformaActual == "Wii U"){
                nomClasse = "WiiU";
            }else if(plataformaActual == "PlayStation 2"){
                nomClasse = "PS2";
            }else{
                nomClasse = "Wii";
            }            
            
            var contadorGeneres = xmlDoc.getElementsByTagName("genere").length;
            var genereActual = "";
            
            for(var y = 0;y<contadorGeneres;y++){
                var generes = xmlDoc.getElementsByTagName("genere")[y].getAttribute("ref").split(" ");

                for(var z = 0;z<generes.length;z++){
                    if(generes[z] === url[1]){
                        if(genereActual === ""){
                            genereActual =genereActual.concat(xmlDoc.getElementsByTagName("genere")[y].innerHTML+", ");
                        }else{
                            genereActual =genereActual.concat(xmlDoc.getElementsByTagName("genere")[y].innerHTML);
                        }
                    }
                }
            }
            
            if(genereActual.length==7){
                genereActual = genereActual.substr(0,5);
            }
                        
            var preuNormal = parseFloat(xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML);
            var descompte = parseFloat(xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("descompte")[0].innerHTML);
            var descompteFinal = 1-descompte;
            var preuFinal = preuNormal*descompteFinal.toString();
            var preuFinalString2 = preuFinal.toString().split(".");
            preuFinalString2[1] = preuFinalString2[1].substr(0,2);
            var preuFinalString = preuFinalString2.toString();
            preuFinalString = preuFinalString.substr(0,5);
            
            
            var contadorIdiomes = xmlDoc.getElementsByTagName("idioma").length;
            var idiomesActuals = "";
            
            for(var y = 0;y<contadorIdiomes;y++){
                var idiomes = xmlDoc.getElementsByTagName("idioma")[y].getAttribute("ref").split(" ");
                
                for(var z = 0;z<idiomes.length;z++){
                    if(idiomes[z] === url[1]){
                        idiomesActuals = idiomesActuals.concat(xmlDoc.getElementsByTagName("idioma")[y].innerHTML +" ");
                    }
                }
            }
            
            document.getElementById("joc").innerHTML+="<img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' alt='caratula' id='caratula'></img>";               
            
            //PC REQUISITS
            if(plataformaActual === "PC"){
                var contadorSO = xmlDoc.getElementsByTagName("requisit").length;
            
                var numRefSO = xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsMinims")[0].getElementsByTagName("so_m")[0].getAttribute("id");
                var soActual = "";

                for(var y = 0;y<contadorSO;y++){
                    var requisits = xmlDoc.getElementsByTagName("requisit")[y].getAttribute("ref").split(" ");

                    for(var z = 0;z<requisits.length;z++){
                        if(requisits[z] === numRefSO){
                            soActual = xmlDoc.getElementsByTagName("requisit")[y].innerHTML;
                            break;
                        }
                    }
                }


                var numRefSOR = xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsRecomendats")[0].getElementsByTagName("so_r")[0].getAttribute("id");
                
                var soActualR = "";

                for(var y = 0;y<contadorSO;y++){
                    var requisits = xmlDoc.getElementsByTagName("requisit")[y].getAttribute("ref").split(" ");

                    for(var z = 0;z<requisits.length;z++){
                        if(requisits[z] === numRefSOR){
                            soActualR = xmlDoc.getElementsByTagName("requisit")[y].innerHTML;
                            break;
                        }
                    }
                }
                
                if(preuNormal === preuFinal){
                    document.getElementById("joc").innerHTML+="<div id='juntar_nom'><p id='nomJoc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div id='atributsJoc'><p id='publisher'>Editorial: "+publisherActual+"</p><p id='plataforma'>Genero/s: "+genereActual+"</p><p id='descripcio_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("descripcio")[0].innerHTML+"</p></div><div id='preuJocs'><p id='llancament'>Fecha de lanzamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("data_llancament")[0].innerHTML+"</p><div id='centrar_puntuacio'><p id='puntuacio'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("puntuacio")[0].innerHTML+"</p><p class='"+nomClasse+"'>"+plataformaActual+"</p></div><p id='preu_placeholder'>Precio: </p><p id='preuFinal'>"+preuFinalString+"€</p><br/><a href='#' id='comprar_a'><div id='comprar'><p>Comprar</p></div></a></div></div><div id='requisits_idiomes'><p id='requisitos'>Requisitos</p><div id='requisitos_minimos_div'><p id='requisits_minims'>Requisitos minimos:</p><p id='requisits_minims_ram'>RAM: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsMinims")[0].getElementsByTagName("ram_m")[0].innerHTML+"</p><p id='requisits_minims_hdd'>Almacenamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsMinims")[0].getElementsByTagName("hdd_m")[0].innerHTML+"</p><p id='requisits_minims_cpu'>Almacenamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsMinims")[0].getElementsByTagName("cpu_m")[0].innerHTML+"</p><p id='requisits_minims_so'>Sistema operatiu: "+soActual+"</p></div><div id='requisitos_recomendados_div'><p id='requisits_recomanats'>Requisitos recomendados:</p><p id='requisits_minims_ram'>RAM: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsRecomendats")[0].getElementsByTagName("ram_r")[0].innerHTML+"</p><p id='requisits_minims_hdd'>Almacenamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsRecomendats")[0].getElementsByTagName("hdd_r")[0].innerHTML+"</p><p id='requisits_minims_cpu'>Almacenamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsRecomendats")[0].getElementsByTagName("cpu_r")[0].innerHTML+"</p><p id='requisits_minims_so'>Sistema operatiu: "+soActualR+"</p></div><p id='idiomes'>Idiomas</p><p id='idiomes_dades'>"+idiomesActuals+"</p></div>";
                }else{
                    document.getElementById("joc").innerHTML+="<div id='juntar_nom'><p id='nomJoc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div id='atributsJoc'><p id='publisher'>Editorial: "+publisherActual+"</p><p id='plataforma'>Genero/s: "+genereActual+"</p><p id='descripcio_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("descripcio")[0].innerHTML+"</p></div><div id='preuJocs'><p id='llancament'>Fecha de lanzamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("data_llancament")[0].innerHTML+"</p><div id='centrar_puntuacio'><p id='puntuacio'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("puntuacio")[0].innerHTML+"</p><p class='"+nomClasse+"'>"+plataformaActual+"</p></div><div id='preus'><p id='preu_placeholder'>Precio: </p><p id='preu'>"+preuNormal+"€</p><p id='preuFinal'>"+preuFinalString+"€</p><p id='simbol_preu'>></p></div><br/><a href='#' id='comprar_a'><div id='comprar'><p>Comprar</p></div></a></div></div><div id='requisits_idiomes'><p id='requisitos'>Requisitos</p><div id='requisitos_minimos_div'><p id='requisits_minims'>Requisitos minimos:</p><p id='requisits_minims_ram'>RAM: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsMinims")[0].getElementsByTagName("ram_m")[0].innerHTML+"</p><p id='requisits_minims_hdd'>Almacenamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsMinims")[0].getElementsByTagName("hdd_m")[0].innerHTML+"</p><p id='requisits_minims_cpu'>Almacenamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsMinims")[0].getElementsByTagName("cpu_m")[0].innerHTML+"</p><p id='requisits_minims_so'>Sistema operatiu: "+soActual+"</p></div><div id='requisitos_recomendados_div'><p id='requisits_recomanats'>Requisitos recomendados:</p><p id='requisits_minims_ram'>RAM: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsRecomendats")[0].getElementsByTagName("ram_r")[0].innerHTML+"</p><p id='requisits_minims_hdd'>Almacenamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsRecomendats")[0].getElementsByTagName("hdd_r")[0].innerHTML+"</p><p id='requisits_minims_cpu'>Almacenamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("requisitsRecomendats")[0].getElementsByTagName("cpu_r")[0].innerHTML+"</p><p id='requisits_minims_so'>Sistema operatiu: "+soActualR+"</p></div><p id='idiomes'>Idiomas</p><p id='idiomes_dades'>"+idiomesActuals+"</p></div>";
                }
            }else{
                if(preuNormal === preuFinal){
                    document.getElementById("joc").innerHTML+="<div id='juntar_nom'><p id='nomJoc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div id='atributsJoc'><p id='publisher'>Editorial: "+publisherActual+"</p><p id='plataforma'>Genero/s: "+genereActual+"</p><p id='descripcio_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("descripcio")[0].innerHTML+"</p></div><div id='preuJocs'><p id='llancament'>Fecha de lanzamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("data_llancament")[0].innerHTML+"</p><div id='centrar_puntuacio'><p id='puntuacio'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("puntuacio")[0].innerHTML+"</p><p class='"+nomClasse+"'>"+plataformaActual+"</p></div><p id='preu_placeholder'>Precio: </p><p id='preuFinal'>"+preuFinalString+"€</p><br/><a href='#' id='comprar_a'><div id='comprar'><p>Comprar</p></div></a></div></div><div id='requisits_idiomes'></div><p id='idiomes'>Idiomas</p><p id='idiomes_dades'>"+idiomesActuals+"</p></div>";
                }else{
                    document.getElementById("joc").innerHTML+="<div id='juntar_nom'><p id='nomJoc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div id='atributsJoc'><p id='publisher'>Editorial: "+publisherActual+"</p><p id='plataforma'>Genero/s: "+genereActual+"</p><p id='descripcio_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("descripcio")[0].innerHTML+"</p></div><div id='preuJocs'><p id='llancament'>Fecha de lanzamiento: "+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("data_llancament")[0].innerHTML+"</p><div id='centrar_puntuacio'><p id='puntuacio'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("puntuacio")[0].innerHTML+"</p><p class='"+nomClasse+"'>"+plataformaActual+"</p></div><div id='preus'><p id='preu_placeholder'>Precio: </p><p id='preu'>"+preuNormal+"€</p><p id='preuFinal'>"+preuFinalString+"€</p><p id='simbol_preu'>></p></div><br/><a href='#' id='comprar_a'><div id='comprar'><p>Comprar</p></div></a></div></div><div id='requisits_idiomes'></div><p id='idiomes'>Idiomas</p><p id='idiomes_dades'>"+idiomesActuals+"</p></div>";
                }
            }
        }
    }
}