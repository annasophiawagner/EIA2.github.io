namespace SKIPISTE {
    
export class Snowflake {
    public x: number;
    public y: number;

    constructor (x: number, y: number){
        this.x = x;
        this.y = y;
    }


    public drawSnowflake(){
        crc2.beginPath();
        crc2.arc(this.x, this.y, 4, 0 * Math.PI, 2.0 * Math.PI);
        crc2.strokeStyle = "#BDBDBD";
        crc2.stroke();
        crc2.fillStyle = "white";
        crc2.fill();
        crc2.closePath();
    }

    public update() {
        if (this.y > 600) {
            this.y = 0;
        }
        else
        this.y += 1;

    this.drawSnowflake();
    }
}
}
