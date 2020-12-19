namespace SKIPISTE {

    export class Sundata {
        public x: number;
        public y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    public drawSun () : void {
        crc2.beginPath();
        crc2.arc(100, 70, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "yellow";
        crc2.fill();
        crc2.closePath();
      }
 

    public update(): void{
        this.drawSun();
        if (this.x > 800) {
        this.x = 0;
        }
        else
        this.x += 1;
        this.x += 0.01;
        }
        
    }
}
