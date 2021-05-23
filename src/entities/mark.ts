export class Mark  {
    x; y; toFood; toHome: number
    constructor(x: number, y: number) {
        this.x = x; // position
        this.y = y;
        this.toFood = 0 // toFood feromone intencity
        this.toHome = 0 // toHome feromone intencity
    }
}