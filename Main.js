console.log("begin");

canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.background = "RGBa(20,20,20,200)";

var ctx = canvas.getContext("2d");

var star_array = CreateFont(canvas, 2000);

//miliseconds
var dt = 50;
var speed = (100*24*3600*1000)/dt;

/**TRANSLATE*/
var offsetx = window.innerWidth/2;
var offsety = window.innerHeight/2;

/** ZOOM */
var zoom_user = 35;
//35 px = 150 000 000 000m = 1ua
var zoom = zoom_user * 1/150000000000;

var novae_title = new Image();
novae_title.src = 'assets/novae_title.png';

var frame = new openLoadingFrame();

var galaxy1;
var galaxy;

var numberofstar = 50;

    addMaxBarProgress(numberofstar+numberofstar*2);
    galaxy = genRingGalaxy(numberofstar,20,30);
    setTimeout(() => {  
        galaxy1 = genSigmoideGalaxy(numberofstar*2, 50, 8);
        setTimeout(() => {
            galaxy.systems = galaxy.systems.concat(galaxy1.systems);
            galaxy.systems.forEach(sys => {
            sys.galaxy = galaxy;
            });
            closeLoadingFrame();
            frame = new openGalaxyFrame(galaxy);
        },(numberofstar*2)*10);
    },numberofstar*10);


//createUserHud();



