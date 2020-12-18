var SKIPISTE;
(function (SKIPISTE) {
    class Snowflake {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        drawSnowflake() {
            SKIPISTE.crc2.beginPath();
            SKIPISTE.crc2.arc(this.x, this.y, 4, 0 * Math.PI, 2.0 * Math.PI);
            SKIPISTE.crc2.strokeStyle = "#BDBDBD";
            SKIPISTE.crc2.stroke();
            SKIPISTE.crc2.fillStyle = "white";
            SKIPISTE.crc2.fill();
            SKIPISTE.crc2.closePath();
        }
        update() {
            this.y += 1;
            if (this.y > 600) {
                this.y = 0;
            }
            this.drawSnowflake();
        }
    }
    SKIPISTE.Snowflake = Snowflake;
})(SKIPISTE || (SKIPISTE = {}));
//# sourceMappingURL=Snowflake.js.map