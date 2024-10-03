function createUserHud(){

    var div = document.createElement("div");
    div.id = "user_hud";
    document.body.appendChild(div);

    div.style.padding = "0";
    div.style.margin = "0";
    div.style.zIndex = "3";
    div.style.position = "absolute";
    div.style.width = "100%";
    div.style.height = "5%";
    div.style.backgroundColor = "rgba(0, 0, 0, 100)";
    div.style.opacity = 0.8;
    div.style.borderBot = "2mm ridge rgba(100,100,100, .6)";
    div.style.left  = "0px";
    div.style.top = "0px";

    var title_div = document.createElement("div");
    div.appendChild(title_div);
    title_div.style.textAlign = "center";
    title_div.style.font = "small-caps bold 50px/1 sans-serif";
    var title = document.createElement("font");
    title_div.appendChild(title);
    title.color = "white";
    title.innerHTML = "User : ";

}

function removeUserHud(){

}