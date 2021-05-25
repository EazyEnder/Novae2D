
var noise_font = new Image();
noise_font.src = 'assets/noise/noise_font.png';
var noise_font_blue = new Image();
noise_font_blue.src = 'assets/noise/noise_font_blue.png';

noise_loaded = false;

function CreateFont(canvas, number){
    var array = [];
    for (let index = 0; index < number; index++) {
        array.push(new particle());
    }

    return array;
}

function RestoreGalaxyFont(){
    ctx.beginPath();
    var pattern = ctx.createPattern(noise_font, 'repeat');
    pattern.setTransform(new DOMMatrix([2, 0.2, 0, 1, 0, 0]).translate(0,1000,0).scale(10));
    ctx.fillStyle = pattern;
    ctx.fillRect( 0, 0, window.innerWidth, window.innerHeight);
    ctx.fill(); 
}

function RestoreFont(array){

    noise_font.onload = function() {
        noise_loaded = true;
    }
    if(noise_loaded){
    ctx.beginPath();
    pattern = ctx.createPattern(noise_font, 'repeat');
    const matrix = new DOMMatrix([2, 0.2, 0, 1, 0, 0]);
    pattern.setTransform(matrix.translate(0,1000,0).scale(10));
    ctx.fillStyle = pattern;
    ctx.fillRect( 0, 0, window.innerWidth, window.innerHeight);
    ctx.fill();

    //ctx.beginPath();
    //pattern2 = ctx.createPattern(noise_font_blue, 'repeat');
    //const matrix2 = new DOMMatrix([2, 0.2, 0, 1, 0, 0]);
    //pattern2.setTransform(matrix2.translate(0,1000,0).scale(5));
    //ctx.fillStyle = pattern2;
    //ctx.fillRect( 0, 0, window.innerWidth, window.innerHeight);
    //ctx.fill();

    for (let index = 0; index < array.length; index++) {
        array[index].draw();
    }
    }

}

function particle(){
    
    this.x = window.innerWidth * Math.random();
    this.y = window.innerHeight * Math.random();
    this.size = 0.5+Math.random() * 1;   

    var brightness = 100;
    var white = Math.ceil(brightness + (255-brightness)*Math.random());
    this.color = "RGBa("+white
    +","+white
    +","+white+")"

    this.draw = function draw(){
    ctx.fillStyle =  this.color;
    ctx.fillRect( this.x, this.y, this.size, this.size);
    }

    this.draw();

}