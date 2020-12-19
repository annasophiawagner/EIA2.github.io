namespace SKIPISTE {

    export class sun {
    public x: number;
    public y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public drawSun (){
    crc2.beginPath();
    crc2.arc(this.x, this.y, 40, 0, 2 * Math.PI);
    crc2.fillStyle = "yellow";
    crc2.fill();
    crc2.closePath();
    }
  
    public moveSun (){
    this.drawSun();
    if (this.x > 800) {
        this.x = 0
    } 
    this.x += 1;
    }

    public update(){
        this.moveSun();
    }
}}