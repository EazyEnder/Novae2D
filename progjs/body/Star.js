
var typeofstar = [
    new StarType("Spectral O",["Etoile bleue","Géante bleue","Supergéante bleue"],[50,30],[50000,25000],"RGBa(131,164,255,0.7)"),
    new StarType("Spectral B",["Etoile bleu-blanc","Géante bleu"],[29,15],[25000,10000],"RGBa(206,244,247,0.7)"),
    new StarType("Spectral A",["Etoile blanche","Géante blanche"],[2.1,1.5],[10000,7500],"RGBa(235,244,247,0.7)"),
    new StarType("Spectral F",["Etoile jaune-blanc"],[1.4,1.2],[7500,6000],"RGBa(235,244,150,0.7)"),
    new StarType("Spectral G",["Naine jaune","Supergéante jaune"],[1.1,0.8],[6000,5000],"RGBa(235,244,100,0.7)"),
    new StarType("Spectral K",["Naine orange","Géante rouge"],[0.7,0.5],[5000,3500],"RGBa(200,175,100,0.7)"),
    new StarType("Spectral M",["Naine rouge","Géante rouge"],[0.4,0.075],[3500,2000],"RGBa(161,39,27,0.7)"),
    new StarType("Spectral T",["Naine brune"],[0.07,0.01],[1500,750],"RGBa(80,65,50,0.7)")
];

function Star(name, type, system, type_name, masse, temperature, realradius, radius){
  
    this.name = name;
    this.type = type;
    this.type_name = type_name;
    this.system = system;
    this.masse = masse;
    this.temperature = temperature;
    this.type = type;
    this.realradius = realradius;
    this.radius = radius;
    this.select = false;
    this.distance = 0;

    this.img = new Image();
    this.img.src = 'assets/noise2.jpg';
   

    this.distancepx = 0*zoom;

    this.x =0;
    this.y = 0;

    this.draw = function draw() { 
        ctx.beginPath();
        this.pattern = ctx.createPattern(this.img, 'repeat');
        const matrix = new DOMMatrix([2, 0.2, 0, 1, 0, 0]);
        this.pattern.setTransform(matrix.scale(0.2));
        ctx.fillStyle = this.pattern;
        ctx.arc(offsetx+this.x*zoom,offsety+this.y*zoom,this.size,0,2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = this.type.color;
        ctx.arc(offsetx+this.x*zoom,offsety+this.y*zoom,this.size,0,2*Math.PI);
        ctx.fill();

        if(this.select){
        ctx.beginPath();
        ctx.strokeStyle = "RGBa(255,255,0)";
        ctx.arc(offsetx+this.x*zoom,offsety+this.y*zoom,this.size+this.size/2,0,2*Math.PI);
        ctx.stroke();

        offsetx = (-this.x*zoom)+(window.innerWidth/2);
        offsety = (-this.y*zoom)+(window.innerHeight/2);

        ctx.font = '25px serif';
        ctx.strokeText(this.name, offsetx+this.x*zoom+this.size*2, offsety+this.y*zoom+10);
        }

    }

    this.update = function update() {

        this.size = zoom * this.radius;

        if(document.body.querySelector("div#"+this.name+"_description")!=null){
            var div = document.body.querySelector("div#"+this.name+"_description");
            div.style.left  = ""+((offsetx+this.x*zoom)-this.size*1.5-0.20*window.innerWidth)+"px";
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

function StarType(spectral, type, masse, temp, color ){
    this.spectral = spectral;
    this.type = type;
    //this.size = size;
    this.masse = masse;
    this.temp = temp;
    this.color = color;
}