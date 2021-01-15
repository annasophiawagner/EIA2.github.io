var SKIPISTE;
(function (SKIPISTE) {
    class SkiFahrer extends SKIPISTE.MovingObject {
        constructor(x, y, color, v) {
            super(x, y);
            this.moveright = Math.random() < 0.5;
            this.status = skierstatus.DRIVE_DOWN;
            this.color = color;
            this.v = v;
        }
        draw() {
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
            this.draw();
            if (this.status == skierstatus.DRIVE_DOWN) {
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
                if (this.y >= SkiFahrer.LIFT_HEIGHT) {
                    this.status = skierstatus.GO_TO_LIFT;
                }
            }
            else if (this.status == skierstatus.GO_TO_LIFT) {
                this.moveright = this.x < SkiFahrer.LIFT_X;
                if (this.moveright) {
                    this.x += this.v;
                }
                else {
                    this.x -= this.v;
                }
                if (this.x > SkiFahrer.LIFT_X - 3 && this.x < SkiFahrer.LIFT_X + 3) {
                    this.x = SkiFahrer.LIFT_X;
                    this.status = skierstatus.LIFT_UP;
                    this.moveright = true;
                }
            }
            else if (this.status == skierstatus.LIFT_UP) {
                this.y -= 1;
                if (this.y <= SkiFahrer.LIFT_UP_Y) {
                    this.status = skierstatus.DRIVE_DOWN;
                    this.moveright = Math.random() < 0.5;
                }
            }
        }
    }
    SkiFahrer.LIFT_HEIGHT = 470;
    SkiFahrer.LIFT_X = 413;
    SkiFahrer.LIFT_UP_Y = 180;
    SKIPISTE.SkiFahrer = SkiFahrer;
    let skierstatus;
    (function (skierstatus) {
        skierstatus[skierstatus["DRIVE_DOWN"] = 0] = "DRIVE_DOWN";
        skierstatus[skierstatus["GO_TO_LIFT"] = 1] = "GO_TO_LIFT";
        skierstatus[skierstatus["LIFT_UP"] = 2] = "LIFT_UP";
    })(skierstatus = SKIPISTE.skierstatus || (SKIPISTE.skierstatus = {}));
})(SKIPISTE || (SKIPISTE = {}));
//# sourceMappingURL=skier.js.map