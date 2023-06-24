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
        
        
        var contadorPlataformes = xmlDoc.getElementsByTagName("plataforma").length;
        var atributJoc = xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getAttribute("id");
        var plataformes = xmlDoc.getElementsByTagName("plataforma")[0].getAttribute("ref").split(" ");        
        var plataformaActual = "";
        
        for(var z = 0;z<plataformes.length;z++){
            if(plataformes[z] === atributJoc){
                plataformaActual = xmlDoc.getElementsByTagName("plataforma")[0].innerHTML;
//                break;
            }
        }
                
        if(plataformaActual === "PC"){
            comprovadorNom = xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML;
            
            var preuNormal = parseFloat(xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getElementsByTagName("preu")[0].innerHTML);
            var descompte = parseFloat(xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getElementsByTagName("descompte")[0].innerHTML);
            var descompteFinal = 1-descompte;
            var preuFinal = preuNormal*descompteFinal.toString();
            var preuFinalString = preuFinal.toString();
            preuFinalString = preuFinalString.split(".");
            preuFinalString[1] = preuFinalString[1].substr(0,2);
            
            var nomClasse = "PC";
            
            if(xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML.length>26){
                var nomJocDisminuit = xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML;
                nomJocDisminuit = nomJocDisminuit.substring(0,23);
                document.getElementById("jocs_pc").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomJocDisminuit+"...</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
            }else{
                document.getElementById("jocs_pc").innerHTML += "<a href='joc.html#"+atributJoc+"'><div id='conjunt_producte'><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("fons_img")[0].innerHTML+"' class='fons'></img><img src='img/"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getElementsByTagName("caratula")[0].innerHTML+"' class='caratula'></img><p class='nom_joc'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("nom")[0].innerHTML+"</p><div class='"+nomClasse+"'><p>"+nomClasse+"</p></div><p class='preu_Productes'>"+xmlDoc.getElementsByTagName("joc_pack")[x].getElementsByTagName("joc")[0].getElementsByTagName("preu")[0].innerHTML+"</p><p id='preuFinal'>"+preuFinalString[0]+"."+preuFinalString[1]+"€</p><p id='simbol_preu'>></p></div></a>";
            }
        }
    }  
}
