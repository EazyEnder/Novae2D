function createAstreBar(astre){

    var div = document.createElement("div");
    div.id = astre.name+"_bottombar";
    document.body.appendChild(div);

    div.style.padding = "0";
    div.style.margin = "0";
    div.style.zIndex = "3";
    div.style.position = "absolute";
    div.style.width = "50%";
    div.style.height = "10%";
    div.style.backgroundColor = "rgba(0, 0, 0, 100)";
    div.style.opacity = 0.8;
    div.style.borderTop = "2mm ridge rgba(255,255,255, .6)";
    div.style.left  = ""+0.25*window.innerWidth+"px";
    div.style.bottom = "0"+"px";

    var title_div = document.createElement("div");
    div.appendChild(title_div);
    title_div.style.textAlign = "center";
    title_div.style.font = "small-caps bold 50px/1 sans-serif";
    var title = document.createElement("font");
    title_div.appendChild(title);
    title.color = "white";
    title.innerHTML = astre.name;

    var button_system = document.createElement("div");
    div.appendChild(button_system);
    button_system.style.zIndex = "4";
    button_system.style.position = "absolute";
    button_system.style.width = "10%";
    button_system.style.height = "0.1*window.innerWidth";
    button_system.style.top = "0"+"px";

    var button_system_image = document.createElement("img");
    button_system_image.src = "assets/system_logo.png";
    button_system_image.width = 0.05*window.innerWidth;
    button_system_image.height = 0.045*window.innerWidth;
    button_system.appendChild(button_system_image);

    button_system.addEventListener('click',goToSystem, false);
    function goToSystem(event){
        closeAstreWindow(frame);
        frame = new openSystemFrame(astre.system);
    }

    

}

function clearAstreBar(astre){
    if(document.getElementById(astre.name+"_bottombar") != null)
    document.body.removeChild(document.body.querySelector("#"+astre.name+"_bottombar"));
}

function enableAstreDescription(astre){

    var div = document.createElement("div");
    div.id = astre.name + "_description";
    document.body.appendChild(div);

    div.style.padding = "0";
    div.style.margin = "0";
    div.style.zIndex = "2";
    div.style.position = "absolute";
    div.style.width = ""+((window.innerWidth/2)-(0.04*window.innerWidth+window.innerHeight/4))+"px";
    div.style.height = ""+((window.innerHeight)-(0.04*window.innerHeight+window.innerHeight*0.1))+"px";
    div.style.backgroundColor = "rgba(0, 0, 0, 100)";
    div.style.opacity = 0.8;
    div.style.borderRight = "2mm ridge rgba(255,255,255, .6)";

    div.style.left  = ""+0.02*window.innerWidth+"px";
    div.style.top = ""+0.02*window.innerHeight+"px";

    var title = document.createElement("font");
    div.appendChild(title);
    title.size="5px";
    title.color = "white";
    title.innerHTML = astre.name;

    var description = document.createElement("font");
    div.appendChild(description);
    description.color = "white";

    var masse = document.createElement("p");
    description.appendChild(masse);
    masse.innerHTML = "Masse : " + astre.masse.toExponential(2) +"kg";

    var type = document.createElement("p");
    description.appendChild(type);
    if(astre instanceof Star){
        type.innerHTML = "Type : " + astre.type_name;

        var spectre = document.createElement("p");
        description.appendChild(spectre);
        spectre.innerHTML = "Spectre : " + astre.type.spectral;

        var temp = document.createElement("p");
        description.appendChild(temp);
        temp.innerHTML = "Température : " + astre.temperature + "K";
    }else if(astre instanceof Planet){
        type.innerHTML = "Type : " + "Planète";

        var type2 = document.createElement("p");
        description.appendChild(type2);
        type2.innerHTML = "Type de planète : " + astre.type.parent;

        var type3 = document.createElement("p");
        description.appendChild(type3);
        type3.innerHTML = "Sous type : " + astre.type.name;

        var type4 = document.createElement("p");
        description.appendChild(type4);
        type4.innerHTML = "Température : " 

        var type5 = document.createElement("p");
        description.appendChild(type5);
        type5.innerHTML = "Atmosphère : " ;
    }
    

}

function disableAstreDescription(astre){
    if(document.getElementById(astre.name+"_description") != null)
    document.body.removeChild(document.body.querySelector("#"+astre.name+"_description"));
}