namespace SKIPISTE {

    export class SkiFahrer extends MovingObject {
        static LIFT_HEIGHT = 470;
        static LIFT_X = 413;
        static LIFT_UP_Y = 180;

        public color: string;
        public v: number;
        public moveright: boolean = Math.random() < 0.5;
        public status: skierstatus = skierstatus.DRIVE_DOWN;

        constructor(x: number, y: number, color: string, v: number) {
            super(x, y)
            this.color = color;
            this.v = v;
        }

        public draw() {
            crc2.fillStyle = this.color;
            crc2.beginPath();
            crc2.arc(this.x + 5, this.y + 5, 8, 0, 2 * Math.PI);
            crc2.fill();
            crc2.fillRect(this.x, this.y, 10, 40);
            crc2.lineWidth = 2;
            crc2.beginPath();

            if (this.moveright) {
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
    export enum skierstatus {
        DRIVE_DOWN = 0,
        GO_TO_LIFT = 1,
        LIFT_UP = 2,
    }


}



