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
    //IMPRIMEIX JOCS PC
    //-------------------------
    var comprovadorNom = "";
    for(var x = 0;x<xmlDoc.getElementsByTagName("joc_pack").length;x++){
        
        
        comprovadorNom = xmlDoc.getElementsByTagName("joc")[x].parentElement.getElementsByTagName("nom")[0].innerHTML;
            
        var contadorPlataformes = xmlDoc.getElementsByTagName("plataforma").length;

        var plataformaActual = "";
        var posicio = 0;
        
        for (var i = 0;i<xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc").length;i++){
                var atributJoc = xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[i].getAttribute("id");
                for(var y = 0;y<contadorPlataformes;y++){
                    var plataformes = xmlDoc.getElementsByTagName("plataforma")[y].getAttribute("ref").split(" ");
                    for(var z = 0;z<plataformes.length;z++){
                        if(plataformes[z] === atributJoc && xmlDoc.getElementsByTagName("plataforma")[y].innerHTML === "Wii U"){
                            plataformaActual = xmlDoc.getElementsByTagName("plataforma")[y].innerHTML;
                            posicio = i;
                            break;
                        }
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
                    
        if(nomClasse=== "WiiU"){
            comprovadorNom = xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML;
            
            var preuNormal = parseFloat(xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getElementsByTagName("preu")[0].innerHTML);
            var descompte = parseFloat(xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getElementsByTagName("descompte")[0].innerHTML);
            var descompteFinal = 1-descompte;
            var preuFinal = preuNormal*descompteFinal.toString();
            var preuFinalString = preuFinal.toString();
            preuFinalString = preuFinalString.split(".");
            preuFinalString[1] = preuFinalString[1].substr(0,2);
            
            
            if(preuNormal == preuFinal){
                if(xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML.length>26){
                var nomJocDisminuit = xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML;
                nomJocDisminuit = nomJocDisminuit.substring(0,23);
                document.getElementById("jocs_totes_plataformes").innerHTML += "<a href='joc.html#"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getAttribute("id")+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomJocDisminuit+"...</p></div><p id='preuFinal'>"+preuFinalString[0]+preuFinalString[1]+"€</p></div></a>";
            }else{
                document.getElementById("jocs_totes_plataformes").innerHTML += "<a href='joc.html#"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getAttribute("id")+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p></div></a>";
            }
            }else{
                if(xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML.length>26){
                var nomJocDisminuit = xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[posicio].innerHTML;
                nomJocDisminuit = nomJocDisminuit.substring(0,23);
                    
                document.getElementById("jocs_totes_plataformes").innerHTML += "<a href='joc.html#"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getAttribute("id")+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p><p>"+nomJocDisminuit+"...</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
            }else{
                document.getElementById("jocs_totes_plataformes").innerHTML += "<a href='joc.html#"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getAttribute("id")+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[posicio].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
            }
            }
        }
    }  
}
