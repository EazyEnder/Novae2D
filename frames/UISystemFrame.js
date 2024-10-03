
function createSystemBar(system){

    var div = document.createElement("div");
    div.id = system.name+"_bottombar";
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
    title.innerHTML = system.name;

    var button_system = document.createElement("div");
    div.appendChild(button_system);
    button_system.style.zIndex = "4";
    button_system.style.position = "absolute";
    button_system.style.width = "10%";
    button_system.style.height = "0.1*window.innerWidth";
    button_system.style.top = "0"+"px";

    var button_system_image = document.createElement("img");
    button_system_image.src = "assets/galaxie_logo.png";
    button_system_image.width = 0.05*window.innerWidth;
    button_system_image.height = 0.045*window.innerWidth;
    button_system.appendChild(button_system_image);

    title.addEventListener('click',OpenAstreList, false);

    function OpenAstreList(event){
        if(document.getElementById(system.name+"_astrelist") == null)
        enableListAstres(system);
        else
        disableListAstres(system);
    }

    button_system.addEventListener('click',OpGalaxyFrm, false);
    function OpGalaxyFrm(event){
        closeSystemWindow(frame);
        frame = new openGalaxyFrame(system.galaxy);
    }

}

function clearSystemBar(system){
    if(document.getElementById(system.name+"_bottombar") != null)
    document.body.removeChild(document.body.querySelector("#"+system.name+"_bottombar"));
}

function enableListAstres(system){

    var div = document.createElement("div");
    div.id = system.name+"_astrelist";
    document.body.appendChild(div);

    div.style.padding = "0";
    div.style.margin = "0";
    div.style.zIndex = "3";
    div.style.position = "absolute";
    div.style.width = "15%";
    div.style.height = "100%";
    div.style.backgroundColor = "rgba(0, 0, 0, 100)";
    div.style.opacity = 0.8;
    div.style.borderLeft = "2mm ridge rgba(255,255,255, .6)";
    div.style.right  = 0;

    var title_div = document.createElement("div");
    div.appendChild(title_div);
    title_div.style.textAlign = "center";
    title_div.style.font = "small-caps bold 20px/1 sans-serif";
    var title = document.createElement("font");
    title_div.appendChild(title);
    title.color = "white";
    title.innerHTML = "Liste des astres";

    var list_div = document.createElement("div");
    div.appendChild(list_div);
    list_div.style.font = "small-caps bold 15px/1 sans-serif";
    var list = document.createElement("font");
    list_div.appendChild(list);
    list.color = "white";

    system.astres.forEach(element => {
        
        var e = document.createElement("p");
        list.appendChild(e);
        e.innerHTML = "-" + element.name;
        if(element instanceof Star){e.innerHTML += "(Etoile : "+ element.type.spectral +")"}
        else if(element instanceof Planet){e.innerHTML += "(Planète)"}
        else if(element instanceof AsteroidBelt){e.innerHTML += "(A-B)"}
        
        e.addEventListener('click',clickOnElement, false);
        function clickOnElement(event){
            if(!(element instanceof AsteroidBelt)){
                offsetx = (-element.x*zoom)+window.innerWidth/2;
                offsety = (-element.y*zoom)+window.innerHeight/2;
            }else{
                offsetx = (-element.system.astres[0].x*zoom)+window.innerWidth/2;
                offsety = (-element.system.astres[0].y*zoom)+window.innerHeight/2;
            }

            system.astres.forEach(a => {
                if(a!=element && a.select){disableDescription(a);disableToolBar(a); a.select = false;}
            });
            if(!element.select){
                element.select = true;
                zoom_user = (window.innerWidth*0.025)/(element.radius)*150000000000
                zoom = zoom_user * 1/150000000000;
                enableDescription(element);
                enableToolsBar(element);
            }else{
                zoom_user = 35;
                zoom = zoom_user * 1/150000000000;
                offsetx = window.innerWidth/2;
                offsety = window.innerHeight/2;
                element.select = false;
                disableDescription(element);
                disableToolBar(element);
            }
        }

    });

    

}

function disableListAstres(system){
    if(document.getElementById(system.name+"_astrelist") != null)
    document.body.removeChild(document.body.querySelector("#"+system.name+"_astrelist"));
}

function enableDescription(astre){

    var div = document.createElement("div");
    div.id = astre.name + "_description";
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
    if(!(astre instanceof AsteroidBelt)){
    div.style.left  = ""+((offsetx+astre.x*zoom)-astre.size*1.5-0.20*window.innerWidth)+"px";
    div.style.top = ""+(offsety+astre.y*zoom)+"px";
    }else{
    div.style.left  = ""+0.1*window.innerWidth+"px";
    div.style.top = ""+0.1*window.innerHeight+"px";     
    }

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
        type4.innerHTML = "Température : " + Math.round(astre.temperature-273.15)+"°C";
    }else if(astre instanceof AsteroidBelt){
        type.innerHTML = "Type : " + "Ceinture d'astéroide";

        var type2 = document.createElement("p");
        description.appendChild(type2);
        type2.innerHTML = "Type d'astéroide : " + astre.type;

        var density = document.createElement("p");
        description.appendChild(density);
        density.innerHTML = "Densité : " + astre.density;

        
    }
    

}

function disableDescription(astre){
    if(document.getElementById(astre.name+"_description") != null)
    document.body.removeChild(document.body.querySelector("#"+astre.name+"_description"));
}

function enableToolsBar(astre){

    var div = document.createElement("div");
    div.id = astre.name + "_toolbar";
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
    if(!(astre instanceof AsteroidBelt)){
    div.style.left  = ""+((offsetx+astre.x*zoom)-astre.size*1.5-0.05*window.innerWidth)+"px";
    div.style.top = ""+(offsety+astre.y*zoom)+"px";
    }else{
    div.style.left  = ""+0.1*window.innerWidth+"px";
    div.style.top = ""+0.5*window.innerHeight+"px";     
    }

    var button_planetarysystem = document.createElement("div");
    div.appendChild(button_planetarysystem);
    button_planetarysystem.style.zIndex = "4";
    button_planetarysystem.style.position = "relative";
    button_planetarysystem.style.width = "100%";
    button_planetarysystem.style.height = 0.05*window.innerWidth;;
    button_planetarysystem.style.top = "0"+"px";

    var button_planetarysystem_image = document.createElement("img");
    button_planetarysystem_image.src = "assets/planetsystem_logo.png";
    button_planetarysystem_image.width = 0.05*window.innerWidth;
    button_planetarysystem_image.height = 0.05*window.innerWidth;
    button_planetarysystem.appendChild(button_planetarysystem_image);

    var button_planet= document.createElement("div");
    div.appendChild(button_planet);
    button_planet.style.zIndex = "4";
    button_planet.style.position = "relative";
    button_planet.style.width = "100%";
    button_planet.style.height = 0.05*window.innerWidth;;
    button_planet.style.top = "0"+"px";

    var button_planet_image = document.createElement("img");
    button_planet_image.src = "assets/planet_logo.png";
    button_planet_image.width = 0.05*window.innerWidth;
    button_planet_image.height = 0.05*window.innerWidth;
    button_planet.appendChild(button_planet_image);

    button_planet.addEventListener('click',OpenAstreMenu, false);
    function OpenAstreMenu(event){
        closeSystemWindow(frame);
        frame = new openAstreFrame(astre);
    }
    

}

function disableToolBar(astre){
    if(document.getElementById(astre.name+"_toolbar") != null)
    document.body.removeChild(document.body.querySelector("#"+astre.name+"_toolbar"));
}