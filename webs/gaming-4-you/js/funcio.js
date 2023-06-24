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
    //IMPRIMEIX JOCS ACTUALS
    //-------------------------
    var comprovadorNom = "";
    for(var x = 0;x<xmlDoc.getElementsByTagName("joc").length;x++){
        var any = xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("data_llancament")[0].innerHTML;
        
        var comprovadorAny = any.split("/");
        
        if(comprovadorAny[2] == 2019){            
            comprovadorNom = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
            
            if(x!= 0){
                if(comprovadorNom != xmlDoc.getElementsByTagName("joc")[x-1].parentElement.getElementsByTagName("nom")[0].innerHTML){
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
                    
                    var preuNormal = parseFloat(xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML);
                    var descompte = parseFloat(xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("descompte")[0].innerHTML);
                    var descompteFinal = 1-descompte;
                    var preuFinal = preuNormal*descompteFinal.toString();
                    var preuFinalString = preuFinal.toString();
                    preuFinalString = preuFinalString.split(".");
                    preuFinalString[1] = preuFinalString[1].substr(0,2);
                                    
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
                    if(descompte != 0){
                        if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                            var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                            nomJocDisminuit = nomJocDisminuit.substring(0,23);
                            document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomJocDisminuit+"...</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                        }else{
                            document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                        }
                    }else{
                        if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                            var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                            nomJocDisminuit = nomJocDisminuit.substring(0,23);
                            document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomJocDisminuit+"...</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                        }else{
                            document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                        }
                    }
                    
                }   
            }else{
                if(descompte !=0){
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>25){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        console.log(nomJocDisminuit);
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomJocDisminuit+"...</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                    }else{
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                    }
                }else{
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>25){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        console.log(nomJocDisminuit);
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomJocDisminuit+"...</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }else{
                        document.getElementById("joc_actual").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }
                }
                
            }
        }
    }
    
    
    /*------------------------------*/
    /*IMPRIMEIX JOCS MILLOR PUNTUATS*/
    /*------------------------------*/
    //Fa el average de totes les puntuacions
    var puntuacioAverage = 0;
    var puntuacio = new Array(xmlDoc.getElementsByTagName("joc").length);
    for(var x = 0;x<xmlDoc.getElementsByTagName("joc").length;x++){
        puntuacio[x] = xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("puntuacio")[0].innerHTML;
        if(x == xmlDoc.getElementsByTagName("joc").length-1){
            puntuacioAverage = average(puntuacio);
        }
    }
    puntuacio = puntuacio.sort(sortNumber);
    
    for(var x = 0;x<xmlDoc.getElementsByTagName("joc").length;x++){
        var puntuacioActual = xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("puntuacio")[0].innerHTML;
        if(puntuacioActual> puntuacioAverage){            
//            console.log("Locooo");
            comprovadorNom = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
            
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
            
            if(x!= 0){
                if(comprovadorNom != xmlDoc.getElementsByTagName("joc")[x-1].parentElement.getElementsByTagName("nom")[0].innerHTML){
                    if(descompte == 0){
                        if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        document.getElementById("joc_puntuat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }else{
                        document.getElementById("joc_puntuat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }
                    }else{
                        if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        document.getElementById("joc_puntuat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                    }else{
                        document.getElementById("joc_puntuat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                    }
                    }
                }
            }else{
                if(descompte != 0){
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                    var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                    nomJocDisminuit = nomJocDisminuit.substring(0,23);
                    document.getElementById("joc_puntuat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                }else{
                    document.getElementById("joc_puntuat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                }
                }else{
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                    var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                    nomJocDisminuit = nomJocDisminuit.substring(0,23);
                    document.getElementById("joc_puntuat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                }else{
                    document.getElementById("joc_puntuat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                }
                }                
            }
        }
    }
 
    /*---------------------*/
    /*IMPRIMEIX JOCS BARATS*/
    /*---------------------*/
    for(var x = 0;x<xmlDoc.getElementsByTagName("joc").length;x++){
        var preuActual = xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML;
        var preuNormal = parseFloat(xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML);
        var descompte = parseFloat(xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("descompte")[0].innerHTML);
        var descompteFinal = 1-descompte;
        var preuFinal = preuNormal*descompteFinal.toString();
        var preuFinalString = preuFinal.toString();
        preuFinalString = preuFinalString.split(".");
        preuFinalString[1] = preuFinalString[1].substr(0,2);
        var preuFinalFloat = parseFloat(preuFinalString[0].concat("."+preuFinalString[1]));
        
        if(preuFinalFloat <20){
            comprovadorNom = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
            
            if(x!= 0){
                if(comprovadorNom != xmlDoc.getElementsByTagName("joc")[x-1].parentElement.getElementsByTagName("nom")[0].innerHTML){
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
                    
                    if(descompte != 0){
                        if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                            var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                            nomJocDisminuit = nomJocDisminuit.substring(0,23);
                            document.getElementById("joc_barat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                        }else{
                            document.getElementById("joc_barat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                        }
                    }else{
                            if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                            var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                            nomJocDisminuit = nomJocDisminuit.substring(0,23);
                            document.getElementById("joc_barat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preuFinal")[0].innerHTML+"</p></div></a>";
                        }else{
                            document.getElementById("joc_barat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preuFinal")[0].innerHTML+"</p></div></a>";
                        }
                    }
                }   
            }else{
                var preuNormal = parseFloat(xmlDoc.getElementsByTagName("joc")[0].getElementsByTagName("preu")[0].innerHTML);
                var descompte = parseFloat(xmlDoc.getElementsByTagName("joc")[0].getElementsByTagName("descompte")[0].innerHTML);
                var descompteFinal = 1-descompte;
                var preuFinal = preuNormal*descompteFinal.toString();
                var preuFinalString = preuFinal.toString();
                preuFinalString = preuFinalString.split(".");
                preuFinalString[1] = preuFinalString[1].substr(0,2);
                
                if(descompte !=0 ){
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        document.getElementById("joc_barat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                    }else{
                        document.getElementById("joc_barat").innerHTML += "<a href='joc.html#"+"a1"+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
                    }
                }else{
                    if(xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML.length>26){
                        var nomJocDisminuit = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
                        nomJocDisminuit = nomJocDisminuit.substring(0,23);
                        document.getElementById("joc_barat").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+nomJocDisminuit+" ...</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
                    }else{
                        document.getElementById("joc_barat").innerHTML += "<a href='joc.html#"+"a1"+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+xmlDoc.getElementsByTagName("joc")[x].getElementsByTagName("preu")[0].innerHTML+"</p></div></a>";
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
