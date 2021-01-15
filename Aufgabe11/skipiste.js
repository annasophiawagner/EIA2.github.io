var SKIPISTE;
(function (SKIPISTE) {
    const canvas = document.getElementById("slope");
    SKIPISTE.crc2 = canvas.getContext("2d");
    var movingObejcts = [];
    var skiers = [];
    //Skifahrer
    skiers.push(new SKIPISTE.SkiFahrer(250, 300, "#27b4df", (Math.random() * 2) + 1));
    skiers.push(new SKIPISTE.SkiFahrer(300, 450, "#d84b20", (Math.random() * 2) + 1));
    skiers.push(new SKIPISTE.SkiFahrer(450, 500, "#7fb0b2", (Math.random() * 2) + 1));
    skiers.push(new SKIPISTE.SkiFahrer(500, 200, "#cf3476", (Math.random() * 2) + 1));
    skiers.push(new SKIPISTE.SkiFahrer(290, 340, "#cf3476", (Math.random() * 2) + 1));
    skiers.push(new SKIPISTE.SkiFahrer(450, 290, "#27b4df", (Math.random() * 2) + 1));
    skiers.push(new SKIPISTE.SkiFahrer(290, 190, "#7fb0b2", (Math.random() * 2) + 1));
    skiers.push(new SKIPISTE.SkiFahrer(560, 300, "#cf3476", (Math.random() * 2) + 1));
    movingObejcts.push(...skiers);
    // Schneeflocken
    for (var i = 1; i < 40; i++) {
        movingObejcts.push(new SKIPISTE.Snowflake(Math.floor(Math.random() * (800 + 1)), Math.floor(Math.random() * (600 + 1))));
    }
    //Sonne
    let Sundata = new SKIPISTE.sun(Math.random() * (0 - 400 + 1) + 360, Math.random() * (140 - 30 + 1) + 40);
    movingObejcts.push(Sundata);
    //Update
    updateframe();
    function updateframe() {
        requestAnimationFrame(updateframe);
        drawBackground();
        drawTree();
        for (let element of movingObejcts) {
            element.update();
        }
        drawLift();
    }
    //Hintergrund
    function drawBackground() {
        //Himmel
        var grd = SKIPISTE.crc2.createLinearGradient(0, 0, 0, 300);
        var grd2 = SKIPISTE.crc2.createLinearGradient(0, 0, 0, 300);
        grd.addColorStop(0, "#66e0ff");
        grd.addColorStop(1, "white");
        grd2.addColorStop(0, "#00ffff");
        grd2.addColorStop(1, "white");
        SKIPISTE.crc2.fillStyle = grd;
        SKIPISTE.crc2.fillRect(0, 0, 800, 600);
        //Berge
        //Berg1
        SKIPISTE.crc2.beginPath();
        SKIPISTE.crc2.moveTo(460, 220);
        SKIPISTE.crc2.lineTo(520, 130);
        SKIPISTE.crc2.lineTo(570, 220);
        SKIPISTE.crc2.lineTo(460, 220);
        SKIPISTE.crc2.closePath();
        SKIPISTE.crc2.fillStyle = "#393c3e";
        SKIPISTE.crc2.fill();
        //Berg2
        SKIPISTE.crc2.beginPath();
        SKIPISTE.crc2.moveTo(280, 200);
        SKIPISTE.crc2.lineTo(320, 90);
        SKIPISTE.crc2.lineTo(390, 200);
        SKIPISTE.crc2.lineTo(280, 200);
        SKIPISTE.crc2.closePath();
        SKIPISTE.crc2.fillStyle = "#393c3e";
        SKIPISTE.crc2.fill();
        //Berg3
        SKIPISTE.crc2.beginPath();
        SKIPISTE.crc2.moveTo(320, 220);
        SKIPISTE.crc2.lineTo(400, 50);
        SKIPISTE.crc2.lineTo(450, 220);
        SKIPISTE.crc2.lineTo(320, 220);
        SKIPISTE.crc2.closePath();
        SKIPISTE.crc2.fillStyle = "#595e62";
        SKIPISTE.crc2.fill();
        //Berg4
        SKIPISTE.crc2.beginPath();
        SKIPISTE.crc2.moveTo(370, 220);
        SKIPISTE.crc2.lineTo(450, 100);
        SKIPISTE.crc2.lineTo(500, 220);
        SKIPISTE.crc2.lineTo(370, 220);
        SKIPISTE.crc2.closePath();
        SKIPISTE.crc2.fillStyle = "gray";
        SKIPISTE.crc2.fill();
        //Skipiste/Hügel
        SKIPISTE.crc2.beginPath();
        SKIPISTE.crc2.arc(350, 1010, 820, 1.0 * Math.PI, 2 * Math.PI);
        SKIPISTE.crc2.fillStyle = "#faffff";
        SKIPISTE.crc2.fill();
        SKIPISTE.crc2.beginPath();
    }
    //Skilift
    function drawLift() {
        //Liftstationen
        SKIPISTE.crc2.fillStyle = "#000000";
        SKIPISTE.crc2.fillRect(397, 450, 10, 50);
        SKIPISTE.crc2.beginPath();
        SKIPISTE.crc2.fillRect(387, 450, 30, 20);
        SKIPISTE.crc2.closePath();
        SKIPISTE.crc2.fill();
        SKIPISTE.crc2.fillRect(397, 180, 10, 50);
        SKIPISTE.crc2.beginPath();
        SKIPISTE.crc2.fillRect(387, 180, 30, 20);
        SKIPISTE.crc2.closePath();
        SKIPISTE.crc2.fill();
        //Seile
        SKIPISTE.crc2.fillStyle = "000000";
        SKIPISTE.crc2.fillRect(390, 190, 1, 260);
        SKIPISTE.crc2.fillRect(413, 190, 1, 260);
    }
    //Bäume abbilden
    function drawTree() {
        createTree(100, 275, SKIPISTE.crc2);
        createTree(150, 375, SKIPISTE.crc2);
        createTree(30, 350, SKIPISTE.crc2);
        createTree(650, 300, SKIPISTE.crc2);
        createTree(700, 450, SKIPISTE.crc2);
        createTree(50, 500, SKIPISTE.crc2);
        createTree(620, 525, SKIPISTE.crc2);
    }
    //Bäume erstellen
    function createTree(x, y, crc2) {
        crc2.fillStyle = "#8B4513";
        crc2.fillRect(x, y, 12, 20);
        crc2.beginPath();
        crc2.moveTo(x - 14, y);
        crc2.lineTo(x + 26, y);
        crc2.lineTo(x + 4, y - 60);
        crc2.lineTo(x - 14, y);
        crc2.fillStyle = "green";
        crc2.fill();
        crc2.closePath();
    }
    //onclick function 
    canvas.addEventListener("click", (e) => {
        console.log(e.x + ", " + e.y);
        if (e.offsetX > 380 && e.offsetX < 420 && e.offsetY > 440 && e.offsetY < 480) {
            for (const skier of skiers) {
                if (skier.status == SKIPISTE.skierstatus.LIFT_UP) {
                    skier.status = SKIPISTE.skierstatus.DRIVE_DOWN;
                }
            }
        }
    });
})(SKIPISTE || (SKIPISTE = {}));
//# sourceMappingURL=skipiste.js.map