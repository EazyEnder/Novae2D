var lastastre;
var planetframe_active = false;

function openAstreFrame(astre){

    lastastre = astre;
    animation = 0;
    translation = [];
    inverse_animation = false;

    this.dt = 10;

    this.open = function Open(){
        planetframe_active = true;
        this.animation = 0;
        this.translation = [];

        createAstreBar(astre);
        enableAstreDescription(astre);

        /**EVENTS */
        canvas.addEventListener('click',this.fonclick , false);

        this.interval = setInterval(this.update, this.dt);
    }

    this.fonclick = function onClickEvent(event){

    }

    this.update = function update(){
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        RestoreFont(star_array);

        animation += 0.05 * (dt/1000);
        if(animation >= 1.1)animation = 0;
        
        if(typeof astre.brightness == undefined) astre.brightness = 0;

        var color_opacity = "RGBa(255,255,255,"+(0.7*(1-animation))+")";
        ctx.beginPath();
        ctx.strokeStyle = color_opacity;
        ctx.arc(window.innerWidth/2,window.innerHeight/2,window.innerHeight/4+(window.innerHeight/4*animation), 0, 2 * Math.PI);
        var copyline = ctx.lineWidth; 
        ctx.lineWidth = ""+window.innerWidth/250 * (animation + 0.5);
        ctx.stroke();
        ctx.lineWidth = copyline;

        ctx.beginPath();
        ctx.strokeStyle = color_opacity;
        ctx.arc(window.innerWidth/2,window.innerHeight/2,window.innerHeight/4+(window.innerHeight/6*animation), 0, 2 * Math.PI);
        var copyline = ctx.lineWidth; 
        ctx.lineWidth = ""+window.innerWidth/200 * (animation + 0.5);
        ctx.stroke();
        ctx.lineWidth = copyline;

        ctx.beginPath();
        ctx.strokeStyle = color_opacity;
        ctx.arc(window.innerWidth/2,window.innerHeight/2,window.innerHeight/4+(window.innerHeight/8*animation), 0, 2 * Math.PI);
        var copyline = ctx.lineWidth; 
        ctx.lineWidth = ""+window.innerWidth/150 * (animation + 0.5);
        ctx.stroke();
        ctx.lineWidth = copyline;

        //Draw planet texture and color
        if(astre instanceof Planet){
        astre.type.texture.forEach(text => {

            if(translation.length-1 > astre.type.texture.indexOf(text))translation.push(0);
            if(translation[astre.type.texture.indexOf(text)] == undefined) translation[astre.type.texture.indexOf(text)]=0;
            translation[astre.type.texture.indexOf(text)] += text[2]/4;
            if(translation[astre.type.texture.indexOf(text)] > 10000)translation[astre.type.texture.indexOf(text)] = 0;

            var color = "RGBa("+(text[1][0])+
            ","+(text[1][1])+","
            +(text[1][2])+","
            +(text[1][3])+")";
            

            ctx.beginPath();
            pattern = ctx.createPattern(text[0][1], 'repeat');
            if(text[0][0] != null){
            var matrix = new DOMMatrix([text[0][0][0], text[0][0][1], text[0][0][2], text[0][0][3], text[0][0][4], text[0][0][5]]);
            matrix.translateSelf(translation[astre.type.texture.indexOf(text)],0,0);
            pattern.setTransform(matrix.scale(text[0][2]*5));
            }
            ctx.fillStyle = pattern;
            ctx.arc(window.innerWidth/2,window.innerHeight/2,window.innerHeight/4,0,2*Math.PI);
            ctx.fill();
    
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(window.innerWidth/2,window.innerHeight/2,window.innerHeight/4,0,2*Math.PI);
            ctx.fill();
        });
    }else if(astre instanceof Star){
        ctx.beginPath();
        pattern = ctx.createPattern(astre.img, 'repeat');
        const matrix = new DOMMatrix([2, 0.2, 0, 1, 0, 0]);
        pattern.setTransform(matrix.scale(0.5));
        ctx.fillStyle = pattern;
        ctx.arc(window.innerWidth/2,window.innerHeight/2,window.innerHeight/4,0,2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = astre.type.color;
        ctx.arc(window.innerWidth/2,window.innerHeight/2,window.innerHeight/4,0,2*Math.PI);
        ctx.fill();
    }
    }

    this.open();
}

function closeAstreWindow(frame){
    canvas.removeEventListener('click',frame.fonclick);

    planetframe_active = false;
    console.log(frame.dt);
    clearInterval(frame.interval);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    disableAstreDescription(lastastre);
    clearAstreBar(lastastre);
}