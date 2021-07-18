export class Mark  {
    constructor(
        public point: Phaser.GameObjects.Rectangle, // for coloring
        public toFood = 0, // toFood feromone intencity
        public toHome = 0, // toHome feromone intencity
        public food = 0, // food units here
         ) {

    }
}