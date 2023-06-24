var app = {
    canviColor:function(nomId){
        var pintat = document.getElementById(nomId).href.toString();
        var numClasse = 0;
        if (nomId === "cor2"){
            numClasse = 1;
        }
        
        if (pintat.indexOf("true") !== -1){
            document.getElementById(nomId).href = pintat.replace("true", "false");
            document.getElementById(nomId).innerHTML = "<img src = 'img/hearth_Red.png'>";
            document.getElementsByClassName("article_mostBottom")[numClasse].innerHTML = "<p><strong>1 Me gusta</strong></p>";
            
        }else{
            document.getElementById(nomId).href = pintat.replace("false", "true");
            document.getElementById(nomId).color = "white";
            document.getElementById(nomId).innerHTML = "<span class='icon-heart'></span>";
            document.getElementsByClassName("article_mostBottom")[numClasse].innerHTML = "<p><strong>0 Me gusta</strong></p>";
        }
    }
}