namespace SKIPISTE {
const canvas = <HTMLCanvasElement>document.getElementById("slope")
export const crc2 = canvas.getContext("2d")



// Schneeflocken
let snowflakes = [];

for (var i = 1; i < 40; i++) {
    snowflakes.push(new Snowflake(Math.floor(Math.random()  * (800 + 1)), Math.floor(Math.random()  * (600 + 1))));
  }

//Skifahrer
let Skiers: SkiFahrer[] = [];

Skiers.push(new SkiFahrer(250, 300, "#27b4df", (Math.random()*2)+1));
Skiers.push(new SkiFahrer(300, 450, "#d84b20", (Math.random()*2)+1));
Skiers.push(new SkiFahrer(450, 500, "#7fb0b2", (Math.random()*2)+1));
Skiers.push(new SkiFahrer(500, 200, "#cf3476", (Math.random()*2)+1));
Skiers.push(new SkiFahrer(290, 340, "#cf3476", (Math.random()*2)+1));
Skiers.push(new SkiFahrer(450, 290, "#27b4df", (Math.random()*2)+1));
Skiers.push(new SkiFahrer(290, 190, "#7fb0b2", (Math.random()*2)+1));
Skiers.push(new SkiFahrer(560, 300, "#cf3476", (Math.random()*2)+1));


function drawSkiers() {
    for(let Skier of Skiers){
        Skier.update();
    }
}

//Sonne
let Sundata: sun = new sun (Math.random() * (0 - 400 + 1)+360, Math.random() * (140 - 30 + 1)+40);

//Update
updateframe();

function updateframe() {
    requestAnimationFrame(updateframe);
    drawBackground();
    drawSkiers();
    drawTree();
    drawLift();

    for (let snowflake of snowflakes){
        snowflake.update();
    }
}

//Hintergrund
function drawBackground () {
    //Himmel
    var grd = crc2.createLinearGradient(0, 0, 0, 300);
    var grd2 = crc2.createLinearGradient(0, 0, 0, 300);
    grd.addColorStop(0, "#66e0ff");
    grd.addColorStop(1, "white");
    grd2.addColorStop(0, "#00ffff");
    grd2.addColorStop(1, "white");
    crc2.fillStyle = grd;
    crc2.fillRect(0, 0, 800, 600);

    Sundata.update();

    //Berge
    //Berg1
    crc2.beginPath();
    crc2.moveTo(460, 220);
    crc2.lineTo(520, 130);
    crc2.lineTo(570, 220);
    crc2.lineTo(460, 220);
    crc2.closePath();
    crc2.fillStyle = "#393c3e";
    crc2.fill();

    //Berg2
    crc2.beginPath();
    crc2.moveTo(280, 200);
    crc2.lineTo(320, 90);
    crc2.lineTo(390, 200);
    crc2.lineTo(280, 200);
    crc2.closePath();
    crc2.fillStyle = "#393c3e";
    crc2.fill();

    //Berg3
    crc2.beginPath();
    crc2.moveTo(320, 220);
    crc2.lineTo(400, 50);
    crc2.lineTo(450, 220);
    crc2.lineTo(320, 220);
    crc2.closePath();
    crc2.fillStyle = "#595e62";
    crc2.fill();


    //Berg4
    crc2.beginPath();
    crc2.moveTo(370, 220);
    crc2.lineTo(450, 100);
    crc2.lineTo(500, 220);
    crc2.lineTo(370, 220);
    crc2.closePath();
    crc2.fillStyle = "gray";
    crc2.fill();

    

    //Skipiste/Hügel
    crc2.beginPath();
    crc2.arc(350, 1010, 820, 1.0 * Math.PI, 2 * Math.PI);
    crc2.fillStyle = "#faffff";
    crc2.fill();
    crc2.beginPath();
}


//Skilift
function drawLift () {

    //Liftstationen
    crc2.fillStyle = "#000000";
    crc2.fillRect(397, 450, 10, 50);
    crc2.beginPath();
    crc2.fillRect(387, 450, 30, 20);
    crc2.closePath();
    crc2.fill();
    crc2.fillRect(397, 180, 10, 50);
    crc2.beginPath();
    crc2.fillRect(387, 180, 30, 20);
    crc2.closePath();
    crc2.fill();

    //Seile
    crc2.fillStyle = "000000";
    crc2.fillRect(390, 190, 1, 260);
    crc2.fillRect(413, 190, 1, 260);
}

//Bäume abbilden
function drawTree () {
    createTree(100, 275, crc2);
    createTree(150, 375, crc2);
    createTree(30, 350, crc2);
    createTree(650, 300, crc2);
    createTree(700, 450, crc2);
    createTree(50, 500, crc2);
    createTree(620, 525, crc2);
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

}

 




 
 
 





