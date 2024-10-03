var lastsystem;
var systemframe_active = false;

function openSystemFrame(system){

    lastsystem = system;

    this.open = function Open(){
        systemframe_active = true;
        
        offsetx = window.innerWidth/2;
        offsety = window.innerHeight/2;
        
        /** ZOOM */
        zoom_user = 35;
        zoom = zoom_user * 1/150000000000;
        
        createSystemBar(system);
        
        /**EVENTS */
        canvas.addEventListener('click',this.fonclick , false);
        canvas.addEventListener('wheel',this.fzoom, false);
        canvas.addEventListener('mousemove',this.fonmousemove, false);

        this.interval = setInterval(this.update, dt);
        this.interval2 = undefined;
    }

this.fonclick = function onClickEvent(event){

    var mx = window.event.clientX;
    var my = window.event.clientY;
    var astre_trigger;
    system.astres.forEach(a => {
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
        system.astres.forEach(a => {
            if(a!=astre_trigger && a.select){a.select = false;disableDescription(a);disableToolBar(a);}
        });
        if(!astre_trigger.select){
            astre_trigger.select = true;

            zoom_user = (window.innerWidth*0.025)/(astre_trigger.radius)*150000000000
            zoom = zoom_user * 1/150000000000;

            enableDescription(astre_trigger);
            enableToolsBar(astre_trigger);
        }else{
            zoom_user = 35;
            zoom = zoom_user * 1/150000000000;
            offsetx = window.innerWidth/2;
            offsety = window.innerHeight/2;
            astre_trigger.select = false;
            disableDescription(astre_trigger);
            disableToolBar(astre_trigger);
            var w = document.getElementById("windowleftside");
        }
    }else{
        offsetx = (offsetx-window.event.clientX)+window.innerWidth/2;
        offsety = (offsety-window.event.clientY)+window.innerHeight/2;
    }
    event.preventDefault();

}

this.fzoom = function Zoom(event){
    event.preventDefault();
    if(zoom_user <= 2) zoom_user = 3;
    zoom_user += event.deltaY * -0.01;
    zoom = zoom_user * 1/150000000000;
}

function BorderMove(mx, my){
    offsetx -= (mx-(window.innerWidth/2))*0.025;
    offsety -= (my-(window.innerHeight/2))*0.025;
}

this.fonmousemove = function OnMouseMove(event){
    event.preventDefault();
    var mx = window.event.clientX;
    var my = window.event.clientY;
    if(this.interval2 != undefined){clearInterval(this.interval2); this.interval2 = undefined;}
    if(mx >= window.innerWidth*0.95 || mx <= window.innerWidth*0.05
        || my >= window.innerHeight*0.95 || my <= window.innerHeight*0.05){

            this.interval2 = setInterval(function() {BorderMove(mx,my);}, 10);

    }
}

this.update = function update(){

    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    RestoreFont(star_array);

    system.update();

}

this.open();
}

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

function closeSystemWindow(frame){
    canvas.removeEventListener('click',frame.fonclick);
    canvas.removeEventListener('wheel',frame.fzoom);
    canvas.removeEventListener('mousemove',frame.fonmousemove);

    disableListAstres(lastsystem);
    lastsystem.astres.forEach(a => {
        if(a.select){a.select = false;disableDescription(a);disableToolBar(a);}
    });


    clearInterval(frame.interval);
    clearInterval(frame.interval2);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    clearSystemBar(lastsystem);
}