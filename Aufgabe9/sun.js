var SKIPISTE;
(function (SKIPISTE) {
    class Sundata {
        constructor(x, y, v) {
            this.x = x;
            this.y = y;
            this.v = v;
        }
        drawSun() {
            SKIPISTE.crc2.beginPath();
            SKIPISTE.crc2.arc(100, 70, 50, 0, 2 * Math.PI);
            SKIPISTE.crc2.fillStyle = "yellow";
            SKIPISTE.crc2.fill();
            SKIPISTE.crc2.closePath();
        }
        update() {
            this.drawSun();
            if (this.x > 800) {
                this.x = 0;
            }
            else
                this.x += 1;
            this.x += 0.01;
        }
    }
    SKIPISTE.Sundata = Sundata;
})(SKIPISTE || (SKIPISTE = {}));
//# sourceMappingURL=sun.js.map