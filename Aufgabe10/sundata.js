var SKIPISTE;
(function (SKIPISTE) {
    class sun {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        draw() {
            SKIPISTE.crc2.beginPath();
            SKIPISTE.crc2.arc(this.x, this.y, 40, 0, 2 * Math.PI);
            SKIPISTE.crc2.fillStyle = "yellow";
            SKIPISTE.crc2.fill();
            SKIPISTE.crc2.closePath();
        }
        update() {
            this.draw();
            if (this.x > 800) {
                this.x = 0;
            }
            this.x += 1;
        }
    }
    SKIPISTE.sun = sun;
})(SKIPISTE || (SKIPISTE = {}));
//# sourceMappingURL=sundata.js.map