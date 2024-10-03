function createGalaxyBar(galaxy){

    var div = document.createElement("div");
    div.id = galaxy.name+"_bottombar";
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
    title.innerHTML = galaxy.name;

    var button_galaxy = document.createElement("div");
    div.appendChild(button_galaxy);
    button_galaxy.style.zIndex = "4";
    button_galaxy.style.position = "absolute";
    button_galaxy.style.width = "10%";
    button_galaxy.style.height = "0.1*window.innerWidth";
    button_galaxy.style.top = "0"+"px";

    //title.addEventListener('click',OpenStarsList, false);

    function OpenStarsList(event){
        if(document.getElementById(system.name+"_starslist") == null)
        enableListStars(galaxy);
        else
        disableListStars(galaxy);
    }

}

function clearGalaxyBar(galaxy){
    if(document.getElementById(galaxy.name+"_bottombar") != null)
    document.body.removeChild(document.body.querySelector("#"+galaxy.name+"_bottombar"));
}

function enableSystemDescription(system){

    var div = document.createElement("div");
    div.id = system.name + "_description";
    document.body.appendChild(div);

    div.style.padding = "0";
    div.style.margin = "0";
    div.style.zIndex = "2";
    div.style.position = "absolute";
    div.style.width = "20%";
    div.style.height = "35%";
    div.style.backgroundColor = "rgba(0, 0, 0, 100)";
    div.style.opacity = 0.8;
    div.style.borderRight = "2mm ridge rgba(255,255,255, .6)";
    div.style.left  = ""+((offsetx+system.x*zoom)-galaxy.systemsize*1.5-0.20*window.innerWidth)+"px";
    div.style.top = ""+(offsety+system.y*zoom)+"px";

    var title = document.createElement("font");
    div.appendChild(title);
    title.size="5px";
    title.color = "white";
    title.innerHTML = system.name;

    var description = document.createElement("font");
    div.appendChild(description);
    description.color = "white";

    var star = document.createElement("p");
    description.appendChild(star);
    star.innerHTML = "Etoile : " + system.astres[0].type_name;

    var astress = document.createElement("p");
    description.appendChild(astress);
    
        astress.innerHTML = "Nombre de corps : " + system.astres.length;
    

}

function disableSystemDescription(system){
    if(document.getElementById(system.name+"_description") != null)
    document.body.removeChild(document.body.querySelector("#"+system.name+"_description"));
}

function enableSystemToolsBar(system){

    var div = document.createElement("div");
    div.id = system.name + "_toolbar";
    document.body.appendChild(div);

    div.style.padding = "0";
    div.style.margin = "0";
    div.style.zIndex = "2";
    div.style.position = "absolute";
    div.style.width = "5%";
    div.style.height = "35%";
    div.style.backgroundColor = "rgba(0, 0, 0, 100)";
    div.style.opacity = 0.8;
    div.style.borderLeft = "2mm ridge rgba(255,255,255, .6)";
    div.style.left  = ""+((offsetx+system.x*zoom)-system.size*1.5-0.05*window.innerWidth)+"px";
    div.style.top = ""+(offsety+system.y*zoom)+"px";

    var button_system = document.createElement("div");
    div.appendChild(button_system);
    button_system.style.zIndex = "4";
    button_system.style.position = "relative";
    button_system.style.width = "100%";
    button_system.style.height = 0.05*window.innerWidth;;
    button_system.style.top = "0"+"px";

    var button_system_image = document.createElement("img");
    button_system_image.src = "assets/system_logo.png";
    button_system_image.width = 0.05*window.innerWidth;
    button_system_image.height = 0.05*window.innerWidth;
    button_system.appendChild(button_system_image);

    button_system.addEventListener('click',OpenSystemMenu, false);
    function OpenSystemMenu(event){
        closeGalaxyWindow(frame);
        frame = new openSystemFrame(system);
    }
    

}

function disableSystemToolBar(system){
    if(document.getElementById(system.name+"_toolbar") != null)
    document.body.removeChild(document.body.querySelector("#"+system.name+"_toolbar"));
}