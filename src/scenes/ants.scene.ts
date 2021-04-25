
 import { Ant } from '../entities/ant';
 
 export class AntsScene extends Phaser.Scene {
   // Grid
   private cWidth: number;
   private cHeight: number;
   private fieldColor: string;
   private ants: Phaser.GameObjects.Group;
   private antsNum = 100;
   constructor() {
     super({
       key: 'AntsScene'
     });
   }
 
   preload(): void {
    this.load.image('ant', '../assets/ant.png')
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
    this.ants = this.add.group(
      [ ...Array(this.antsNum).keys() ].map(el=> new Ant(this, 300, 300)),
      {runChildUpdate: true})
    }
 }