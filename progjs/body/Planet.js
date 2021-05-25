
var noise = new Image();
noise.src = 'assets/noise2.jpg';
var noise2 = new Image();
noise2.src = 'assets/noise.png';
var blue_noise = new Image();
blue_noise.src = 'assets/blue_noise.jpg';
var cloud_noise = new Image();
cloud_noise.src = 'assets/cloud_noise.png';
var desert_noise = new Image();
desert_noise.src = 'assets/noise/desert_noise.jpg';
var green_brut_noise = new Image();
green_brut_noise.src = 'assets/noise/green_brut_noise.png';
var green_brut_large_noise = new Image();
green_brut_large_noise.src = 'assets/noise/green_brut_large_noise.png';
var ice_craquelures_noise = new Image();
ice_craquelures_noise.src = 'assets/noise/noise_ice_craquelures.png';
var magma_craquelures_noise = new Image();
magma_craquelures_noise.src = 'assets/noise/noise_magma_craquelures.png';
var area_white_noise = new Image();
area_white_noise.src = 'assets/noise/area_white_noise.png';
var area_darkgray_noise = new Image();
area_darkgray_noise.src = 'assets/noise/area_darkgray_noise.png';

var typeofplanets = [
    new PlanetType("Géante de glace", "Geante gazeuse", [0,50+273.15], 0.300, [[[[20, .2, 0, 1, 0, 0], blue_noise, 1.5], [103,174,251,0.2],1]]),
    new PlanetType("Jovienne", "Geante gazeuse", [273.15-200,99999], 0.343, [[[[20, .2, 0, 1, 0, 0], noise, 1.5], [78,23,0,0.3],1]]),
    new PlanetType("NaN", "Tellurique", 0, 0.5, [[[[2, 0.2, 0, 1, 0, 0], noise, 1], [78,23,0,0.3],1]]),
    new PlanetType("Désertique", "Tellurique", [-100+273.15,100+273.15], 0.25, [
        [[[2, 0.2, 0, 1, 0, 0], desert_noise, 1], [78,23,0,0.2],1],
        [[[2, 0.2, 0, 1, 0, 0], cloud_noise, 1], [78,23,0,0.3],2]]),
    new PlanetType("Continental", "Tellurique", [-30+273.15,50+273.15], 0.3, [
        [[[2, 0.2, 0, 1, 0, 0], blue_noise, 1], [0,0,255,0.4],1],
        [[[2, 0.2, 0, 1, 0, 0], green_brut_noise, 3], [0,0,255,0],1],
        [[[2, 0.2, 0, 1, 0, 0], cloud_noise, 1], [0,23,0,0.3],2]]),
    new PlanetType("Métallique", "Tellurique", [0+273.15,99999], 0.05, [
        [[[1, 0.2, 0, 1, 0, 0], noise, 1], [0,0,0,0.7],1]]),
    new PlanetType("Venusienne", "Tellurique", [-100+273.15,100+273.15], 0.75, [
        [[[4, 0.2, 0, 1, 0, 0], desert_noise, 2], [145,114,0,0.5],1]]),
    new PlanetType("Glacée", "Tellurique", [0,273.15], 0.75, [
        [[[4, 0.2, 0, 1, 0, 0], noise, 1], [209,228,255,0.7],1],
        [[[4, 0.2, 0, 1, 0, 0], ice_craquelures_noise, 0.25], [209,228,255,0],1]]),
    new PlanetType("Rocheuse", "Tellurique", [0,700], 0.15, [
        [[[2, 0.2, 0, 1, 0, 0], noise, 1], [0,0,0,0.25],1]]),
    new PlanetType("Volcanique", "Tellurique", [273.15+100,99999], 0.12, [
        [[[1, 0.2, 0, 1, 0, 0], noise, 1], [0,0,0,0.6],1],
        [[[1, 0.2, 0, 1, 0, 0], magma_craquelures_noise, 0.05], [0,0,0,0],1],
        [[[20.5, 10.2, 0, 1, 0, 0], area_darkgray_noise, 0.1], [0,0,0,0.35],1]])
    ];
function Planet(name, system, period, masse, distance, radius, type, ring){
  
    this.name = name;
    this.system = system;
    this.masse = masse;
    this.distance = distance;
    this.type = type;
    this.radius = radius;
    this.ring = ring;
    this.select = false;
    this.distancepx = this.distance*zoom;

    this.albedo = 0;
    this.temperature = 0;


    if(this.type.texture[0][0][0] != null){
    this.matrice = new DOMMatrix([this.type.texture[0][0][0][0], this.type.texture[0][0][0][1], this.type.texture[0][0][0][2], this.type.texture[0][0][0][3], this.type.texture[0][0][0][4], this.type.texture[0][0][0][5]]);
    this.matrice.translateSelf(-50+Math.random()*100,-50+Math.random()*100,0);
    }

    this.brightness = Math.random() * 50;
    this.color = "RGBa("+(this.brightness+this.type.texture[0][1][0])+
    ","+(this.brightness+this.type.texture[0][1][1])+","
    +(this.brightness+this.type.texture[0][1][2])+","
    +(this.type.texture[0][1][3])+")";

    this.x = this.distance;
    this.y = 0;
    this.teta = Math.round(Math.random()*360)%360;
    this.vteta = Math.PI*2/period;

    this.draw = function draw() { 

        //Draw orbit
        ctx.beginPath();
        ctx.strokeStyle = "RGBa(255,255,255)";
        ctx.arc(this.system.astres[0].x*zoom+offsetx,this.system.astres[0].y*zoom+offsety,this.distance*zoom, 0, 2 * Math.PI);
        ctx.stroke();

        //Draw planet texture and color
        this.type.texture.forEach(element => {
            ctx.beginPath();
            this.pattern = ctx.createPattern(element[0][1], 'repeat');
            if(element[0][0] != null){
            ma = new DOMMatrix([element[0][0][0], element[0][0][1], element[0][0][2], element[0][0][3], element[0][0][4], element[0][0][5]]);
            this.pattern.setTransform(ma.scale(element[0][2]));
            }
            ctx.fillStyle = this.pattern;
            ctx.arc(offsetx+this.x*zoom,offsety+this.y*zoom,this.size,0,2*Math.PI);
            ctx.fill();

            ctx.beginPath();
            var c = "RGBa("+(element[1][0])+
            ","+(element[1][1])+","
            +(element[1][2])+","
            +(element[1][3])+")";
            ctx.fillStyle = c;
            ctx.arc(offsetx+this.x*zoom,offsety+this.y*zoom,this.size,0,2*Math.PI);
            ctx.fill();
        });

        //Draw potential ring
        if(this.ring){
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.arc(offsetx+this.x*zoom,offsety+this.y*zoom,this.size * 1.5,0,2*Math.PI);
            var copyline = ctx.lineWidth; 
            ctx.lineWidth = ""+(this.size-this.size/2);
            ctx.stroke();
            ctx.lineWidth = copyline;
        }

        if(this.select){
            ctx.beginPath();
            ctx.strokeStyle = "RGBa(255,255,0)";
            ctx.arc(offsetx+this.x*zoom,offsety+this.y*zoom,this.size+this.size/2,0,2*Math.PI);
            ctx.stroke();

            ctx.font = '25px serif';
            ctx.strokeText(this.name, offsetx+this.x*zoom+this.size*2, offsety+this.y*zoom+10);

            offsetx = (-this.x*zoom)+(window.innerWidth/2);
            offsety = (-this.y*zoom)+(window.innerHeight/2);

            }

    }

    this.update = function update() {

        var temp_withoutatm = Math.pow((((Math.pow(system.astres[0].temperature,4)*Math.pow(system.astres[0].realradius/(this.distance),2))/4)*(1-this.albedo)),(0.25));

        this.temperature = temp_withoutatm;

        this.size = zoom * this.radius;
        
        var dteta = this.vteta*speed;
        this.teta += dteta;
        this.teta = this.teta % (Math.PI*2);

        this.x = this.distance*Math.cos(this.teta);
        this.y = this.distance*Math.sin(this.teta);

        if(document.body.querySelector("div#"+this.name+"_description")!=null){
            var div = document.body.querySelector("div#"+this.name+"_description");
            div.style.left  = ""+((offsetx+this.x*zoom)-this.size*1.5-0.2*window.innerWidth)+"px";
            div.style.top = ""+(offsety+this.y*zoom)+"px";
        }

        if(document.body.querySelector("div#"+this.name+"_toolbar")!=null){
            var div = document.body.querySelector("div#"+this.name+"_toolbar");
            div.style.left  = ""+((offsetx+this.x*zoom)+this.size*1+0.05*window.innerWidth)+"px";
            div.style.top = ""+(offsety+this.y*zoom)+"px";
        }

        this.draw();
    
    }
}

function PlanetType(name, parent, temperature_needed, albedo, texture){
    this.name = name;
    this.parent = parent;
    this.temperature_needed = temperature_needed;
    this.albedo = albedo;
    this.texture = texture;
}
