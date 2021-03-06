import { Ant } from '../entities/ant';
import { Grid } from '../entities/grid';
import { AntsObjective } from '../enums/ant.objective.enum';
import { Point } from '../types/point';
 
 export class AntsScene extends Phaser.Scene {
   // Grid
   cWidth: number;
   cHeight: number;
   private fieldColor: string;
   private ants: Phaser.GameObjects.Group;
   private anthill: Phaser.GameObjects.Image;
   private antsNum = 500;
   public grid: Grid
   constructor() {
     super({
       key: 'AntsScene'
     });
   }
 
   preload(): void {
    this.load.image('ant', '../assets/ant.png')
    this.load.image('ant-food', '../assets/ant-food.png')
    this.load.image('anthill', '../assets/anthill.png')
    this.load.image("grass", "../assets/grass.jpg");
  }

   init(): void {
     // Init graphic and variables
     //this.sys.game.scale.gameSize
     this.cWidth = this.sys.canvas.width 
     this.cHeight = this.sys.canvas.height
     this.fieldColor ="#3498db";
     this.physics.world.setBounds(0, 0, this.cWidth, this.cHeight, true, true, true, true);
     this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor( this.fieldColor);
    //  this.generationText = this.add
    //    .text(10, 10, 'Generation: ' + this.generation.toString(), {
    //      fontFamily: 'Arial',
    //      fontSize: 20 + 'px',
    //      stroke: '#ffffff',
    //      strokeThickness: 1,
    //      color: '#000000'
    //    })
    //    .setDepth(2);
    // this.generationText.setText('Generation: ' + this.generation.toString());
   }
 
  create() {
    const p = this.add.image(this.cWidth/2, this.cHeight/2, "grass");
    this.grid = new Grid(this, this.cWidth/4, this.cHeight/4)
    p.displayHeight = this.cHeight;
    p.scaleX = p.scaleY
    this.anthill = this.add.image(this.cWidth/2, this.cHeight/2, 'anthill').setScale(0.3)
    this.ants = this.add.group(
      [ ...Array(this.antsNum).keys() ].map(el=> new Ant(this, this.cWidth/2, this.cHeight/2)),
      {runChildUpdate: true})
      this.time.addEvent({
        delay: 250, // ms
        callback: () => {
          this.ants.children.iterate ((child: Ant) => {
            child.setFeromone()
          })
        },
        args: [],
        //callbackScope: this,
        loop: true
    });
    this.time.addEvent({
      delay: 1000, // ms
      callback: () => {
        for (let i = 0; i < this.grid.sizeX; i++) {    
          for (let j = 0; j < this.grid.sizeY; j++){
            const mark = this.grid.marks[i][j]
            if (mark.toFood) this.grid.decrease(mark, AntsObjective.toFood)
            if (mark.toHome) this.grid.decrease(mark, AntsObjective.toHome)
          }
        }
      },
      args: [],
      //callbackScope: this,
      loop: true
  });
  const mouse = this.input.mousePointer;
  this.input.on('pointermove', (pointer: Point) => {
    if (mouse.isDown) this.grid.setFood(pointer)
  }, this);
 }
}