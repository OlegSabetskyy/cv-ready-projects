function fonsOscur(){
    document.getElementById("centrar_main").style.filter = "brightness(50%)";
    document.body.style.backgroundColor = "gray";
    document.getElementById("login_100_ocult").style.visibility="visible";
    document.getElementById("footer").style.borderTop = "2px solid #6d6d6d";
    document.getElementById("img_footer").style.filter = "brightness(50%)";
    document.getElementById("img_footer2").style.filter = "brightness(50%)";
    document.getElementById("img_footer3").style.filter = "brightness(50%)";
    document.getElementById("img_footer4").style.filter = "brightness(50%)";
    document.getElementById("img_footer5").style.filter = "brightness(50%)";
}

function fonsClar(){
    document.getElementById("centrar_main").style.filter = "brightness(100%)";
    document.body.style.backgroundColor = "white";
    document.getElementById("login_100_ocult").style.visibility="hidden";
    document.getElementById("footer").style.borderTop = "2px solid rgb(221, 221, 221)";
    document.getElementById("img_footer").style.filter = "brightness(100%)";
    document.getElementById("img_footer2").style.filter = "brightness(100%)";
    document.getElementById("img_footer3").style.filter = "brightness(100%)";
    document.getElementById("img_footer4").style.filter = "brightness(100%)";
    document.getElementById("img_footer5").style.filter = "brightness(100%)";
}