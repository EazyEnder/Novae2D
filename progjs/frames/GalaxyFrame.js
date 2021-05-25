var lastgalaxy;
var galaxyframe_active = false;

function openGalaxyFrame(galaxy){

    lastgalaxy = galaxy;

    this.open = function Open(){
        galaxyframe_active = true;
        
        offsetx = window.innerWidth/2;
        offsety = window.innerHeight/2;
        
        /** ZOOM */
        zoom_user = 10;
        //1 ly
        zoom = zoom_user * 1;
        
        //createGalaxyBar(system);
        
        /**EVENTS */
        canvas.addEventListener('click',this.fonclick , false);
        canvas.addEventListener('wheel',this.fzoom, false);
        canvas.addEventListener('mousemove',this.fonmousemove, false);

        createGalaxyBar(lastgalaxy);

        this.interval = setInterval(this.update, dt);
        this.interval2 = undefined;
    }
    

this.fonclick = function onClickEvent(event){

    var mx = window.event.clientX;
    var my = window.event.clientY;
    var system_trigger;
    galaxy.systems.forEach(a => {
        if(system_trigger == undefined){
        if((mx >= ((offsetx+a.x*zoom)-galaxy.systemsize)) && (mx <= ((offsetx+a.x*zoom)+galaxy.systemsize)) && (my > ((offsety+a.y*zoom)-galaxy.systemsize)) && (my < ((offsety+a.y*zoom)+galaxy.systemsize))){
            system_trigger = a;
        }
        }
    });

    if(system_trigger != undefined){
        galaxy.systems.forEach(a => {
            if(a!=system_trigger && a.select){a.select = false;disableSystemDescription(a);disableSystemToolBar(a);}
        });
        if(!system_trigger.select){
            system_trigger.select = true;

            enableSystemDescription(system_trigger);
            enableSystemToolsBar(system_trigger);
        }else{
            system_trigger.select = false;
            disableSystemDescription(system_trigger);
            disableSystemToolBar(system_trigger);
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
    zoom = zoom_user * 1;
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

    RestoreGalaxyFont();
    galaxy.update();

}

this.open();
}

function closeGalaxyWindow(frame){
    canvas.removeEventListener('click',frame.fonclick);
    canvas.removeEventListener('wheel',frame.fzoom);
    canvas.removeEventListener('mousemove',frame.fonmousemove);

    /**disableListSystems(lastsystem);*/
    lastgalaxy.systems.forEach(a => {
        if(a.select){a.select = false;disableSystemDescription(a);disableSystemToolBar(a);}
    });


    clearInterval(frame.interval);
    clearInterval(frame.interval2);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    clearGalaxyBar(lastgalaxy);
}