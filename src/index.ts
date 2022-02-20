import { Perlin } from './lib/Perlin';

const HEIGHT = 100;
const WIDTH =  100;
const canvas = document.createElement('canvas');
canvas.width = HEIGHT;
canvas.height = WIDTH;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let perlin = new Perlin();

var imgData = ctx.createImageData(WIDTH, HEIGHT);
for (let y = 0; y < HEIGHT; y++){
    for (let x = 0; x < WIDTH; x++){
        let value = perlin.noise(x, y, 0) * 255;
        imgData.data[(x + y * WIDTH) * 4 + 0] = value;
        imgData.data[(x + y * WIDTH) * 4 + 1] = value;
        imgData.data[(x + y * WIDTH) * 4 + 2] = value;
        imgData.data[(x + y * WIDTH) * 4 + 3] = 255;
    }
}

ctx.putImageData(imgData, 0, 0);