console.log("begin");

var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.background = "RGBa(20,20,20,200)";
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");

var star_array = CreateFont(canvas, 2000);


var solarsystem = createSolarSystem();

//miliseconds
var dt = 50;

var speed = 3600*1000/dt;

/**EVENTS */
canvas.addEventListener('click',onClickEvent, false);
function onClickEvent(event){

    var mx = window.event.clientX;
    var my = window.event.clientY;
    var astre_trigger;
    solarsystem.astres.forEach(a => {
        if(astre_trigger == undefined){
        if(!(a instanceof AsteroidBelt) && (mx >= ((offsetx+a.x*zoom)-zoom*a.radius)) && (mx <= ((offsetx+a.x*zoom)+zoom*a.radius)) && (my > ((offsety+a.y*zoom)-zoom*a.radius)) && (my < ((offsety+a.y*zoom)+zoom*a.radius))){
            astre_trigger = a;
        }else if(a instanceof AsteroidBelt){
            var dx = Math.abs(mx-offsetx);
            var dy = Math.abs(my-offsety);
            var R1 = (a.distance+a.radius)*zoom;
            var R2 = (a.distance)*zoom;
            if((Math.pow(dx,2)+Math.pow(dy,2)<=Math.pow(R1,2))&&(Math.pow(dx,2)+Math.pow(dy,2)>Math.pow(R2,2)))
            astre_trigger = a;
        }
        }
    });

    if(astre_trigger != undefined){
        solarsystem.astres.forEach(a => {
            if(a!=astre_trigger && a.select){a.select = false;disableDescription(a);disableToolBar(a);}
        });
        if(!astre_trigger.select){
            astre_trigger.select = true;
            enableDescription(astre_trigger);
            enableToolsBar(astre_trigger);
        }else{
            astre_trigger.select = false;
            disableDescription(astre_trigger);
            disableToolBar(astre_trigger);
            var w = document.getElementById("windowleftside");
        }
    }else{
        Move(event);
    }
    event.preventDefault();

}

/**TRANSLATE*/
var offsetx = window.innerWidth/2;
var offsety = window.innerHeight/2;
function Move(event){
    offsetx = (offsetx-window.event.clientX)+window.innerWidth/2;
    offsety = (offsety-window.event.clientY)+window.innerHeight/2;
}


/** ZOOM */
var zoom_user = 35;
var zoom = zoom_user * 1/150000000000;

canvas.addEventListener('wheel',Zoom, false);
function Zoom(event){
    event.preventDefault();
    if(zoom_user <= 2) zoom_user = 3;
    zoom_user += event.deltaY * -0.01;
    zoom = zoom_user * 1/150000000000;
}

function update(){

    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    RestoreFont(star_array);

    solarsystem.update();

}

setInterval(update, dt);

function calcAttractionForce(astre1,astre2){

    var costeta = (astre2.x-astre1.x)/(Math.sqrt(Math.pow((astre2.x-astre1.x),2)+Math.pow((astre2.y-astre1.y),2)));
    var teta = Math.acos(costeta);

    var force = (6.67430*Math.pow(10,-11))*(astre1.masse*astre2.masse)/
    (Math.pow(Math.sqrt(Math.pow(astre2.x-astre1.x,2)+Math.pow(astre2.y-astre1.y,2)),2));
    var fx = Math.cos(teta)*force;
    var fy = Math.sin(teta)*force;
    if(astre2.y-astre1.y < 0) fy = -fy;



    return [fx,fy];
}