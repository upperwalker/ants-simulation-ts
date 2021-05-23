import { AntsScene } from "../scenes/ants.scene";
import { Mark } from "./mark";

export class Grid {

  marks: Mark[][];
  constructor(scene: AntsScene, public sizeX: number, public sizeY: number) {
    this.marks = new Array<Array<Mark>>();
    for (let i = 0; i < sizeX; i++) {
      let row:Mark[]  = new Array<Mark>();      
      for (let j = 0; j < sizeY; j++){
        const point = scene.add.rectangle(i*4, j*4, 3, 3, 0x00ff00) //new Phaser.Geom.Rectangle(i*4, j*4, 3, 3);
        row.push(new Mark(point));
      }
      this.marks.push(row);
    }
  }
  findNeighbours(i: number, j: number, radius: number) {     
    for(let x = Math.max(0, i - radius); x <= Math.min(i + radius, this.sizeX); x++) {
      for(let y = Math.max(0, j - radius); y <= Math.min(j + radius, this.sizeY); y++) {
        if(x !== i || y !== j) {
          try {
            this.marks[x][y].point.fillColor = 0xffff00
          } catch(err) {console.log(i, j, x, y)}
        }
      }
    }
  }
  
}