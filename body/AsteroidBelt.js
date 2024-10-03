function AsteroidBelt(name, system, distance, radius, density, type){

    this.name = name;
    this.system = system;
    this.masse = 0;
    this.distance = distance;
    this.radius = radius;
    this.density = density;
    this.type = type;
    this.select = false;

    this.asteroid_array = [];
    for (let index = 0; index < this.density*(-this.distance+(this.distance+this.radius))*(1/150000000000)*35*10; index++) {
        this.asteroid_array.push(new asteroid_particle(this)); 
    }


    this.distancepx = this.distance*zoom;

    this.draw = function draw() { 
        
        this.asteroid_array.forEach(a => {
            a.draw();
        });

        if(this.select){

            ctx.beginPath();
        ctx.strokeStyle = "RGBa(255,255,0)";
        ctx.arc(offsetx,offsety,this.distance*zoom, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "RGBa(255,255,0)";
        ctx.arc(offsetx,offsety,(this.distance+this.radius)*zoom, 0, 2 * Math.PI);
        ctx.stroke();

            ctx.font = '20px serif';
            ctx.strokeText(this.name, offsetx+(this.distance)*zoom, offsety);

            }

    }

    this.update = function update() {

        this.size = zoom * this.radius;
        this.draw();
    
    }

}

function asteroid_particle(astre){

    this.r = astre.distance+randn_bm()*(astre.distance+astre.radius-astre.distance);
    this.teta = 360*Math.random();
    this.size = 0.5+Math.random() * 2;   

    if(astre.type=="roche"){
        var lumi = Math.random()*25;
        this.color = "RGBa("+(lumi+150)
        +","+(lumi+150)
        +","+(lumi+150)+",1)"
    }else if(astre.type=="glace"){
        var lumi = Math.random()*25;
        this.color = "RGBa("+(lumi+186)
        +","+(lumi+224)
        +","+(lumi+227)+",1)"
    }

    this.draw = function draw(){
    ctx.fillStyle =  this.color;
    ctx.fillRect( offsetx+(this.r*Math.cos(this.teta))*zoom, offsety+(this.r*Math.sin(this.teta))*zoom, this.size, this.size);
    }


}

function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
}