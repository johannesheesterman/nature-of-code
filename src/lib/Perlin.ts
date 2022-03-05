
// Understanding Perlin Noise: 
// https://mrl.cs.nyu.edu/~perlin/noise/
// https://adrianb.io/2014/08/09/perlinnoise.html
// https://gpfault.net/posts/perlin-noise.txt.html


export class Perlin {

    private permutation: number[] = [151, 160, 137, 91, 90, 15,
        131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
        190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
        88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
        77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
        102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
        135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
        5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
        223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
        129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
        251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
        49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
        138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

    private p: number[] = [];

    constructor() {
        for (let i = 0; i < 512; i++) {
            this.p[i] = this.permutation[i % 256];
        }
    }

    public noise1d(p: number): number {
        // Points surrounding p.
        const p0 = Math.floor(p);
        const p1 = p0 + 1;

        const a = this.gradient(p0) * (p-p0);
        const b = this.gradient(p1) * (p-p1);
        const f = this.fade(p-p0);

        //return (1 - f) * a + f * b;
        return this.lerp(a, b, f);
    }

    private gradient(p:number): number{
        return this.permutation[p%255] > 128 ? 1 : -1;
    }


    public noiseN(...p:number[]): number {
        // Find lattice points (points surrounding p).
        const p0 = p.map(i => Math.floor(i));
        const p1 = p0.map(i => i + 1);

        const latticePoints = [];
        for (let i = 0; i < Math.pow(2, p.length); i++)
        {
               
        }

        // x = {0, 1}
        // y = {0, 1} 
        // y = {0, 1}
        // lattice points = 000 001 010 011 100 101 110 111
        // where 0 is floor(pi) and 1 is (floor(pi) + 1)
        
        return this.gradientN(p);
    }

    private gradientN(p: number[]): number {
        return p.map(i => this.permutation[i%255]).reduce((a,b) => a + b, 0) > 128 ? 1 : -1;
    }





    public noise(x: number, y: number, z: number): number {  
        
        let xi = Math.floor(x) & 255;
        let yi = Math.floor(y) & 255;
        let zi = Math.floor(z) & 255;

        let u = this.fade(x);
        let v = this.fade(y);
        let w = this.fade(z);

      
        let A = this.p[xi] + yi;
        let AA = this.p[A] + zi;
        let AB = this.p[A + 1] + zi;
        let B = this.p[xi + 1] + yi;
        let BA = this.p[B] + zi;
        let BB = this.p[B + 1] + zi;

        return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z),
            this.grad(this.p[BA], x - 1, y, z)),
            this.lerp(u, this.grad(this.p[AB], x, y - 1, z),
                this.grad(this.p[BB], x - 1, y - 1, z))),
            this.lerp(v, this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1),
                this.grad(this.p[BA + 1], x - 1, y, z - 1)),
                this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1),
                    this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))));
    }

    octaveNoise(x: number, y: number, z: number, octaves: number, persistence: number) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;  // Used for normalizing result to 0.0 - 1.0
        for(let i=0;i<octaves;i++) {
            total += this.noise(x * frequency, y * frequency, z * frequency) * amplitude;
            
            maxValue += amplitude;
            
            amplitude *= persistence;
            frequency *= 2;
        }
        
        return total/maxValue;
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private lerp(a: number, b: number, x: number): number {
        return a + (b - a) * x;
    }

    private grad(hash: number, x: number, y: number, z: number): number {
        switch (hash & 0xF) {
            case 0x0: return x + y;
            case 0x1: return -x + y;
            case 0x2: return x - y;
            case 0x3: return -x - y;
            case 0x4: return x + z;
            case 0x5: return -x + z;
            case 0x6: return x - z;
            case 0x7: return -x - z;
            case 0x8: return y + z;
            case 0x9: return -y + z;
            case 0xA: return y - z;
            case 0xB: return -y - z;
            case 0xC: return y + x;
            case 0xD: return -y + z;
            case 0xE: return y - x;
            case 0xF: return -y - z;
            default: return 0; // never happens
        }
    }
}
