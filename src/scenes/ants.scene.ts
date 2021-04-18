
 import { Ant } from '../entities/ant';
 
 export class AntsScene extends Phaser.Scene {
   // Grid
   private cWidth: number;
   private cHeight: number;
   private fieldColor: number;

 
   constructor() {
     super({
       key: 'AntsScene'
     });
   }
 
   init(): void {

 
     // Init graphic and variables
     this.cWidth = this.sys.canvas.width 
     this.cHeight = this.sys.canvas.height
     this.fieldColor = 0xedbe3b;

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
 
   /**
    * This function creates the next generation with the predefined
    * set of rules.
    */
  
 }