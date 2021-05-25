function openMenuFrame(){

    animation = 0;
    translation = [];
    mx = 0;
    my = 0;

    var astre = new Planet(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        typeofplanets[Math.floor(Math.random()*typeofplanets.length)],false
    );

    this.open = function Open(){

        canvas.style.cursor="none";

        this.animation = 0;
        this.translation = [];

        canvas.addEventListener('mousemove',this.fonmousemove, false);

        this.interval = setInterval(this.update, dt);

        this.update();
    }

    this.fonmousemove = function OnMouseMove(event){
        event.preventDefault();
        mx = window.event.clientX;
        my = window.event.clientY;
    }

    function CursorStar(){
        ctx.beginPath();
        ctx.strokeStyle = "RGBa(255,255,255)";
        ctx.arc(mx,my,10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "RGBa(255,255,255)";
        ctx.arc(mx,my,1, 0, 2 * Math.PI);
        ctx.stroke();
    }

    this.update = function update(){
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        //Draw font
        RestoreFont(star_array);
        //Draw title
        var sizex = 784*1.5*window.innerHeight/window.innerWidth;
        var sizey = 244*1.5*window.innerHeight/window.innerWidth;
        ctx.drawImage(novae_title, window.innerHeight*0.7, 0, sizex, sizey);

        var sizerectx = sizex;
        var sizerecty = window.innerHeight*0.9-sizey

        if(noise_loaded){
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
            ctx.arc(-window.innerWidth*0.05,window.innerHeight/2,window.innerHeight*0.75,Math.PI*3/2,Math.PI);
            ctx.fill();
    
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(-window.innerWidth*0.05,window.innerHeight/2,window.innerHeight*0.75,Math.PI*3/2,Math.PI);
            ctx.fill();


        });

        CursorStar();

        }

        
    }

    this.open();
}

function closeMenuFrame(){

    canvas.removeEventListener('mousemove',frame.fonmousemove);
    canvas.style.cursor="true";

    clearInterval(frame.interval);

    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
}
