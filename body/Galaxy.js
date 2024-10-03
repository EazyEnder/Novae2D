function Galaxy(name, type, systems){

    this.name = name;
    this.type = type;
    this.systems = systems;
    this.systemsize = zoom/2;

    this.update = function update(){
        
        this.draw();


        this.systems.forEach(sys => {
            sys.updateoffset();
        });

        
         //Update each system (laggy : will make it server side only)
        /**this.systems.forEach(sys => {
            sys.update();
        });*/
    }

    this.draw = function draw(){
        this.systems.forEach(sys => {
        this.systemsize = zoom/2;
        ctx.beginPath();
        sys.astres[0].pattern = ctx.createPattern(sys.astres[0].img, 'repeat');
        const matrix = new DOMMatrix([2, 0.2, 0, 1, 0, 0]);
        sys.astres[0].pattern.setTransform(matrix.scale(0.2));
        ctx.fillStyle = sys.astres[0].pattern;
        ctx.arc(offsetx+sys.x*zoom,offsety+sys.y*zoom, this.systemsize,0,2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = sys.astres[0].type.color;
        ctx.arc(offsetx+sys.x*zoom,offsety+sys.y*zoom, this.systemsize,0,2*Math.PI);
        ctx.fill();

        if(sys.select){
        ctx.beginPath();
        ctx.strokeStyle = "RGBa(255,255,0)";
        ctx.arc(offsetx+sys.x*zoom,offsety+sys.y*zoom, this.systemsize,0,2*Math.PI);
        ctx.stroke();

        offsetx = (-sys.x*zoom)+(window.innerWidth/2);
        offsety = (-sys.y*zoom)+(window.innerHeight/2);

        ctx.font = '25px serif';
        ctx.strokeText(sys.name, offsetx+sys.x*zoom+sys.size*2, offsety+sys.y*zoom+10);
        }

         //Draw line beetween systems
        var neightbours = getSystemNeighbours(sys,10);
        neightbours.forEach(sys2 => {
            ctx.beginPath();
            if(!sys.select){
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'RGBa(255,255,255,0.3)';
            }else{
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'RGBa(255,200,0,0.7)';
            }
            ctx.moveTo(offsetx+sys.x*zoom,offsety+sys.y*zoom);
            ctx.lineTo(offsetx+sys2.x*zoom, offsety+sys2.y*zoom);
            ctx.stroke();
         });
    });
    }

}

/** Shapes of galaxy */
function genRingGalaxy(number, radius, distance){

    var galaxy = new Galaxy();

    //Gen name
    var name = genGalaxyName();

    var systems = [];
    for (let i = 0; i < number; i++) { 

        //Gen a system
        setTimeout(() => {
        var system = genStarSystem(galaxy);
        setTitleBar("Génération des systèmes : " + getBarProgress() + "/" + getMaxBarProgress() + " (" + system.name + ")");
        systems.push(system);

        //Gen the position of system with gauss function
        var rayon = radius*randn_bm() + distance;
        var teta = Math.random()*360;
        var x = rayon*Math.cos(teta);
        var y = rayon * Math.sin(teta);

        systems[i].x = x;
        systems[i].y = y;

        addBarProgress(1);
        frame.update();

         //Todo: control distance with a minimum to another star
        },i*10);
    }

    galaxy.systems = systems;
    galaxy.name = name;
    galaxy.type = "Ring";

    return galaxy;
}
function genSigmoideGalaxy(number, radius, center){

    var galaxy = new Galaxy();
    //Gen name
    var name = genGalaxyName();

    var systems = [];
    for (let i = 0; i < number; i++) { 
        //Gen a system
        setTimeout(() => {
        var system = genStarSystem(galaxy);
        setTitleBar("Génération des systèmes : " + getBarProgress() + "/" + getMaxBarProgress() + " (" + system.name + ")");
        systems.push(system);

        //Gen the position of system with sigmoide function
        var rayon = 0;
        while(rayon < center)
        rayon = (Math.random()*1/((1/radius)+Math.exp((Math.random()*radius)-radius)));
        var teta = Math.random()*360;
        var x = rayon*Math.cos(teta);
        var y = rayon * Math.sin(teta);

        systems[i].x = x;
        systems[i].y = y;

        addBarProgress(1);
        frame.update();

        //Todo: control distance with a minimum to another star
        },i*10);
    }

    galaxy.systems = systems;
    galaxy.name = name;
    galaxy.type = "Sigmoide";

    console.log("End generation of galaxy");
    return galaxy;
}

/** Utils */
function getDistanceBetweenSystems(sys1,sys2){

    var x = Math.abs(sys1.x-sys2.x);
    var y = Math.abs(sys1.y-sys2.y);

    return Math.sqrt(x*x+y*y);
}

/**
 * 
 * @param {System} system System target
 * @param {Number} distance Distance in light years
 * @returns System Array
 */
function getSystemNeighbours(system, distance){

    var neighbours = [];

    var galaxy = system.galaxy;

    galaxy.systems.forEach(sys => {
        if(getDistanceBetweenSystems(system,sys) <= distance){
            neighbours.push(sys);
        }
    });

    return neighbours;
}