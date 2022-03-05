import { Perlin } from './lib/Perlin';

const HEIGHT = 1200;
const WIDTH =  1200;
const canvas = document.createElement('canvas');
canvas.width = HEIGHT;
canvas.height = WIDTH;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let perlin = new Perlin();


// ctx.fillStyle = 'black';
// const frequency = 0.005;
// const amplitude = 10;
// for (let x = 0.0; x < WIDTH; x+= 0.05){

//     let n = 0; 
//     for (let i = 1; i < 8; i++){
//         n += perlin.noise1d(x*frequency*i) * amplitude*i;
//     }

//     ctx.fillRect( x, HEIGHT/2 + n, 1, 1 );
// }




var imgData = ctx.createImageData(WIDTH, HEIGHT);
for (let y = 0; y < HEIGHT; y++){
    for (let x = 0; x < WIDTH; x++){
        let value = perlin.noiseN(x,y) * 255;
        if (value < 0) value = 0;
        
        imgData.data[(x + y * WIDTH) * 4 + 0] = value;
        imgData.data[(x + y * WIDTH) * 4 + 1] = value;
        imgData.data[(x + y * WIDTH) * 4 + 2] = value;
        imgData.data[(x + y * WIDTH) * 4 + 3] = 255;
    }
}

ctx.putImageData(imgData, 0, 0);