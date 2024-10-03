var bar_progress = 0;
var max_bar_progress = 0;
var bar_title = "";

function openLoadingFrame(){

    animation = 0;
    translation = [];

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
        this.animation = 0;
        this.translation = [];
        this.update();
    }

    this.update = function update(){

        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        //Draw font
        RestoreFont(star_array);
        //Draw title
        ctx.drawImage(novae_title, window.innerWidth/2-784/2, window.innerHeight/2-244/2);
        //Draw bar
        var size_height = window.innerHeight*0.05;
        ctx.fillStyle =  "RGBa(0,0,0,0.3)";
        ctx.fillRect(0,window.innerHeight-size_height,window.innerWidth,size_height);
        //Draw loading
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
            ctx.arc(0,window.innerHeight/2,window.innerHeight/2.5,0,2*Math.PI);
            ctx.fillRect(0,window.innerHeight-size_height,window.innerWidth*(bar_progress/max_bar_progress),size_height);
            ctx.fill();
    
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(0,window.innerHeight/2,window.innerHeight/2.5,0,2*Math.PI);
            ctx.fillRect(0,window.innerHeight-size_height,window.innerWidth*(bar_progress/max_bar_progress),size_height);
            ctx.fill();


        });
        }

        ctx.fillStyle =  "RGBa(255,255,255)"; 
        ctx.font = size_height*0.75+"px serif";
        ctx.fillText(getTitleBar(), window.innerWidth*0.05,window.innerHeight-size_height*0.125);

        
    }

    this.open();
}

function closeLoadingFrame(){
    clearInterval(frame.interval);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
}

/**Utils*/

/**
 * 
 * @param {String} title 
 */
function setTitleBar(title){
    bar_title = title;
}

function getTitleBar(){
    return bar_title;
}

/**
 * 
 * @param {Number} progress 
 */
function setMaxBarProgress(progress){
    max_bar_progress = progress;
}

function addMaxBarProgress(progress){
    max_bar_progress += progress;
}

function getMaxBarProgress(){
    return max_bar_progress;
}

/**
 * 
 * @returns {Number}
 */
function getBarProgress(){
    return bar_progress;
}

function addBarProgress(progress){
    bar_progress += progress;
}

/**
 * 
 * @param {Number} progress 
 */
function setBarProgress(progress){
    bar_progress = progress;
}