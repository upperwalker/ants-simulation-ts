import { Mark } from "./mark";

export class Grid {

  marks: Mark[][];

  constructor(x: number, y: number) {
    this.marks = new Array<Array<Mark>>();
    for (let i = 0; i <= x; i++) {
      let row:Mark[]  = new Array<Mark>();      
      for (let j = 0; j <= y; j++){
        row.push(new Mark(i, j));
      }
      this.marks.push(row);
    }
  }
  
}