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
    var xmlDoc = xml.responseXML;
    //-------------------------
    //IMPRIMEIX JOCS PER ORDRE DE QUIN HA VENUT MES (MAXIM)
    //-------------------------
    //Fa el average de totes les puntuacions
    var puntuacioAverage = 0;
    var puntuacio = new Array(xmlDoc.getElementsByTagName("joc").length);
    for(var x = 0;x<xmlDoc.getElementsByTagName("joc").length;x++){
        puntuacio[x] = xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("venuts")[0].innerHTML;
        if(x == xmlDoc.getElementsByTagName("joc").length-1){
            puntuacioAverage = average(puntuacio);
        }
    }
    puntuacio = puntuacio.sort(sortNumber);
    var puntuacioString = puntuacio.toString();
    var puntuacioArray = "";
    puntuacioArray = puntuacioString.split(",");
    var tamanySuperenMitja = 0;
    
    for(var x = 0;x<puntuacio.length;x++){
        if(puntuacioArray[x]>puntuacioAverage){
            tamanySuperenMitja++;
        }
    }
    var contador = 0;
    var contador2 = puntuacioArray.length-1;
    var comprovadorNom = new Array();
    
    //for(var x = 0;x<xmlDoc.getElementsByTagName("joc").length;x++){
    for(var x = 0;x<xmlDoc.getElementsByTagName("joc").length;x++){
        var puntuacioActual = xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("venuts")[0].innerHTML;
        if(x == xmlDoc.getElementsByTagName("joc").length-1 && contador2>3){
            x = 0;
        }
        if(puntuacioActual === puntuacioArray[contador2]){
            contador2--;
            var contadorPlataformes = xmlDoc.getElementsByTagName("plataforma").length;
                
            var atributJoc = xmlDoc.getElementsByTagName("joc")[x].getAttribute("id");
            var plataformaActual = "";

            for(var y = 0;y<contadorPlataformes;y++){
                var plataformes = xmlDoc.getElementsByTagName("plataforma")[y].getAttribute("ref").split(" ");

                for(var z = 0;z<plataformes.length;z++){
                    if(plataformes[z] === atributJoc){
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
            
            var preuNormal = parseFloat(xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML);
            var descompte = parseFloat(xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("descompte")[0].innerHTML);
            var descompteFinal = 1-descompte;
            var preuFinal = preuNormal*descompteFinal.toString();
            var preuFinalString = preuFinal.toString();
            preuFinalString = preuFinalString.split(".");
            preuFinalString[1] = preuFinalString[1].substr(0,2);
            var nomActual = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
            
            var imprimir = true;
            
            for(var z = 0;z<comprovadorNom.length;z++){
                if(nomActual ===comprovadorNom[z]){
                    imprimir = false;
                }
            }
            comprovadorNom[contador] = nomActual;
            contador++;
            
            if(nomClasse === "XBoxOne"){
                if(imprimir === true){
                if(descompte == 0){
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }else{
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }
                }else{
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes_XboxOne'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu_xboxOne'>></p></div></a>";
                    }else{
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes_XboxOne'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu_xboxOne'>></p></div></a>";
                    }
                }
            }
            }else{
                if(imprimir === true){
                if(descompte == 0){
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }else{
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }
                }else{
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                    }else{
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                    }
                }
            }
            }            
        }
    }
    
}

function average (array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++){
      sum = sum*1+ parseInt(array[i]);
//      console.log(array[i]);
  }
  return sum / array.length;
}

function sortNumber(a, b) {
  return a - b;
}
