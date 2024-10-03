function System(name,astres,galaxy){
    this.name = name;
    this.astres = astres;
    this.galaxy = galaxy;
    this.x = 0;
    this.y = 0;
    this.select = false;

    this.update = function update(){
        this.astres.forEach(p => {
            p.update();
        });

    }

    this.updateoffset = function updateoffset(){
        if(this.select){
            offsetx = (-this.x*zoom)+(window.innerWidth/2);
            offsety = (-this.y*zoom)+(window.innerHeight/2);

            if(document.body.querySelector("div#"+this.name+"_description")!=null){
                var div = document.body.querySelector("div#"+this.name+"_description");
                div.style.left  = ""+((offsetx+this.x*zoom)-this.galaxy.systemsize*1.5-0.20*window.innerWidth)+"px";
                div.style.top = ""+(offsety+this.y*zoom)+"px";
            }
    
            if(document.body.querySelector("div#"+this.name+"_toolbar")!=null){
                var div = document.body.querySelector("div#"+this.name+"_toolbar");
                div.style.left  = ""+((offsetx+this.x*zoom)+this.galaxy.systemsize*1+0.05*window.innerWidth)+"px";
                div.style.top = ""+(offsety+this.y*zoom)+"px";
            }
        }
    }
}

function genStarSystem(galaxy){
    var astres = [];
    var name = genStarName();
    var sys = new System(name,astres,galaxy); 

    //GEN STAR 
    var random_type = typeofstar[Math.floor(Math.random()*typeofstar.length)];
    var random_type2 = Math.random();
    var star = new Star(name + "_A",
     random_type,
     sys,
     random_type.type[Math.floor(random_type.type.length*random_type2)],
     (1.9891*Math.pow(10,30))*(random_type.masse[1]+Math.random()*(random_type.masse[0]-random_type.masse[1])),
     (Math.round(random_type.temp[1]+Math.random()*(random_type.temp[0]-random_type.temp[1]))),
     695500000,
     30*(150000000000/100)
     );
    sys.astres.push(star);

    //GEN PLANETS
    var numberofplanets = Math.round(Math.random()*10);

    var tempo_astres = [];
    for (let i = 0; i < numberofplanets; i++) {
        
        //Distance control
        var deltadistance = 0;
        var distance = 0;
        while(deltadistance <= ((20000000000*star.masse)/(1.9891*Math.pow(10,30)))){
            distance = ((30000000000*star.masse)/(1.9891*Math.pow(10,30)))+(Math.random()*((2000000000000*star.masse)/(1.9891*Math.pow(10,30))));
            var ddis = 99999999999999;
            tempo_astres.forEach(element => {
                if(Math.abs(distance-element.distance) < ddis){
                    ddis = Math.abs(distance-element.distance);
                }
            });
            deltadistance = ddis;
            if(tempo_astres.length===0 || deltadistance==NaN)deltadistance=distance;
        }
        

        //Limit between gaz and telluric planets
        var ice_ligne = star.realradius/Math.pow(130/(star.temperature),2);
        var temp_withoutatm = Math.pow((((Math.pow(sys.astres[0].temperature,4)*Math.pow(sys.astres[0].realradius/(distance),2))/4)*(1-0)),(0.25));

        var masse = star.masse;
        var type_possible = [2];
        
        //Possible choice of type between gaz's type and telluric's type
        if(distance > ice_ligne){
            while(masse >= star.masse/100)
            masse = 10*5.9736*Math.pow(10,24) + (10*1.8986*Math.pow(10,27)-10*5.9736*Math.pow(10,24))*Math.random();
            type_possible = [0,1];
        }else{
            masse = Math.random()*((10*5.9736*Math.pow(10,24))-3.285*Math.pow(10,23))+3.285*Math.pow(10,23);
            type_possible = [3,4,5,6,7,8,9];
        }

        //Choice of the type
        var type_planet = typeofplanets[2];
        var flag = false;
        var index = 0;
        while(!flag){
            var rdm_type = typeofplanets[type_possible[Math.floor(Math.random()*type_possible.length)]];
            if(rdm_type.temperature_needed[0] <= temp_withoutatm && rdm_type.temperature_needed[1] >= temp_withoutatm){
                flag = true;
                type_planet = rdm_type;
            }
            index++;
            if(index > 100) flag = true;
        }

        //Speed of the planet around the star
        var period = 1000*Math.PI*2*Math.sqrt(Math.pow(distance,3)/(6.67*Math.pow(10,-11)*sys.astres[0].masse));
        var size =  7*(150000000000/100);

        var planet = new Planet(
            sys.name + "_",
            sys,
            period,
            masse,
            distance,
            size,
            type_planet,false
        );

        //Sort planets compared to distance
        var indexofplanet = 0;
        tempo_astres.forEach(element => {
            if(distance > element.distance){
                indexofplanet++;
            }
        });
        tempo_astres.splice(indexofplanet, 0, planet);
        
    }
    //Rename planets
    for (let index = 0; index < tempo_astres.length; index++) {
        tempo_astres[index].name =  tempo_astres[index].name + (index+1); 
    }
    
    //Modify astres list with the new list of planets
    sys.astres=sys.astres.concat(tempo_astres);
    

    //GEN ASTEROID BELT
    var asteroid_belt_array = [];
    for (let index = 0; index < sys.astres.length; index++) {
        if(index != sys.astres.length-1){
        if(Math.abs(sys.astres[index+1].distance-sys.astres[index].distance) > ((400000000000*star.masse)/(1.9891*Math.pow(10,30)))){
            var asteroid_type = "roche";
            var dist = Math.abs(sys.astres[index+1].distance-sys.astres[index].distance);
            if(sys.astres[index].distance+(dist/2-(rdm_radius/2)) > ice_ligne)asteroid_type = "glace";
            var rdm_radius = (Math.random()*0.3+0.7)*dist;
            asteroid_belt_array.push(new AsteroidBelt("Ceinture_"+index,sys,
            sys.astres[index].distance+(dist/2-(rdm_radius/2)),
            rdm_radius,
            0.4,
            asteroid_type));
        }
    }
    }
    sys.astres=sys.astres.concat(asteroid_belt_array);


    return sys;
}

function createSolarSystem(){

    var astres = [];
    var sys = new System("Sol", astres);

/** PLANETs */
sys.astres.push(new Star("Soleil",typeofstar[4],sys,
typeofstar[4].type[0],1.9891*Math.pow(10,30), 5700, 695500000,
30*(150000000000/100)));

sys.astres.push(new Planet("Terre",sys,
    (365.25*24*3600*1000),
    5.9736*Math.pow(10,24),
    149597887500,
7*(150000000000/100),
typeofplanets[4], false));

sys.astres.push(new Planet("Mercure",sys,
    (87.969*24*3600*1000),
    3.285*Math.pow(10,23),
    58000000000,
2*(150000000000/100),
typeofplanets[5], false));

sys.astres.push(new Planet("Venus",sys,
    (224.699*24*3600*1000),
    4.8675*Math.pow(10,24),
    108209500000,
7*(150000000000/100),
typeofplanets[6],false));

sys.astres.push(new Planet("Mars",sys,
    (686.979*24*3600*1000),
    6.4185*Math.pow(10,23),
    227944000000,
5*(150000000000/100),
typeofplanets[3], false));

sys.astres.push(new Planet("Jupiter",sys,
    (4332.589*24*3600*1000),
    1.8986*Math.pow(10,27),
    778340000000,
15*(150000000000/100),
typeofplanets[1], false));

sys.astres.push(new Planet("Saturne",sys,
    (10759.23*24*3600*1000),
    5.683*Math.pow(10,26),
    1434000000000,
12*(150000000000/100),
typeofplanets[1], true));

sys.astres.push(new Planet("Uranus",sys,
    (30685.4*24*3600*1000),
    8.681*Math.pow(10,25),
    2871000000000,
10*(150000000000/100),
typeofplanets[0], true));

sys.astres.push(new Planet("Neptune",sys,
    (60266*24*3600*1000),
    1.024*Math.pow(10,26),
    4495000000000,
11*(150000000000/100),
typeofplanets[0], false));

sys.astres.push(new AsteroidBelt("Ceinture_Principale",sys,
    1.7*(149597887500),
    2.5*(149597887500),
    0.5,
 "roche"));

 sys.astres.push(new AsteroidBelt("Kuiper",sys,
    30*(149597887500),
    55*(149597887500),
    0.05,
 "glace"));

    return sys;

}