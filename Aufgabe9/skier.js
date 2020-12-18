var SKIPISTE;
(function (SKIPISTE) {
    class SkiFahrer {
        constructor(x, y, color, v) {
            this.moveright = Math.random() < 0.5;
            this.x = x;
            this.y = y;
            this.color = color;
            this.v = v;
        }
        drawSkier() {
            SKIPISTE.crc2.fillStyle = this.color;
            SKIPISTE.crc2.beginPath();
            SKIPISTE.crc2.arc(this.x + 5, this.y + 5, 8, 0, 2 * Math.PI);
            SKIPISTE.crc2.fill();
            SKIPISTE.crc2.fillRect(this.x, this.y, 10, 40);
            SKIPISTE.crc2.lineWidth = 2;
            SKIPISTE.crc2.beginPath();
            if (this.moveright) {
                SKIPISTE.crc2.moveTo(this.x + 30, this.y + 46);
                SKIPISTE.crc2.lineTo(this.x - 9, this.y + 38);
            }
            else {
                SKIPISTE.crc2.moveTo(this.x - 20, this.y + 46);
                SKIPISTE.crc2.lineTo(this.x + 19, this.y + 38);
            }
            SKIPISTE.crc2.strokeStyle = "black";
            SKIPISTE.crc2.stroke();
        }
        update() {
            this.drawSkier();
            this.y += this.v;
            if (Math.random() * 100 < 1) {
                this.moveright = !this.moveright;
            }
            if (this.moveright) {
                this.x += this.v;
            }
            else {
                this.x -= this.v;
            }
            if (this.y > 600) {
                this.y = 180;
                this.x = 400;
            }
        }
    }
    SKIPISTE.SkiFahrer = SkiFahrer;
})(SKIPISTE || (SKIPISTE = {}));
//# sourceMappingURL=skier.js.map