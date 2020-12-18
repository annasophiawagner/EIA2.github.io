namespace SKIPISTE {

export class SkiFahrer {
    public x: number;
    public y: number;
    public color: string;
    public v: number;
    public moveright: boolean = Math.random() < 0.5;


    constructor (x: number, y: number, color: string, v: number) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.v = v;
    }

    public drawSkier () {
        crc2.fillStyle = this.color;
        crc2.beginPath();
        crc2.arc(this.x + 5, this.y + 5, 8, 0, 2 * Math.PI);
        crc2.fill();
        crc2.fillRect(this.x, this.y, 10, 40);
        crc2.lineWidth = 2;
        crc2.beginPath();
        
        if (this.moveright){
            crc2.moveTo(this.x + 30, this.y + 46);
            crc2.lineTo(this.x - 9, this.y + 38);
        }
        else {
            crc2.moveTo(this.x - 20, this.y + 46);
            crc2.lineTo(this.x + 19, this.y + 38);
        }
        
        crc2.strokeStyle = "black";
        crc2.stroke();
    }

    public update() {
        this.drawSkier();
        this.y += this.v;
        
        if (Math.random() * 100 < 1){
            this.moveright = !this.moveright;
        }
        if (this.moveright){
            this.x += this.v;
        }
        else {
            this.x -= this.v;
        }

        if (this.y > 600){
            this.y = 180;
            this.x = 400;
        }

    }

}
}