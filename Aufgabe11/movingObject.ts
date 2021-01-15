namespace SKIPISTE {

export abstract class MovingObject {
    x: number;
    y: number;
    
    constructor (x: number, y: number){
        this.x = x;
        this.y = y;
    }
    
    abstract draw();
    abstract update();
    }

}