import { AntsScene } from "../scenes/ants.scene";
import { Point } from "../types/point";
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
  toGrid(xy: number): number {
    return Math.floor(xy/4);
  }
  carryBorderPoint({x, y}: Point): Point {
    if (x < 0) x += this.sizeX;
    if (y < 0) y += this.sizeY;
    if (x >= this.sizeX) x -= this.sizeX;
    if (y >= this.sizeY) y -= this.sizeY;
    return {x, y}
  }
  getPointsInSector(i: number, j: number, radius: number, angle: number, velocity: Phaser.Math.Vector2) { 
    const result: Phaser.GameObjects.Rectangle[] = []; 
    for(let x = i - radius; x <= i + radius; x++) {
      for(let y = j - radius; y <= j + radius; y++) {
        if(x !== i || y !== j) {
          let {x: sx, y: sy} = velocity.clone().setLength(radius).rotate(-angle/2);
          let {x: fx, y: fy} = velocity.clone().setLength(radius).rotate(angle/2);
          this.marks[i + Math.floor(sx)][ j + Math.floor(sy)].point.fillColor = 0xff0000
          this.marks[i + Math.floor(fx)][j + Math.floor(fy)].point.fillColor = 0xff0000
          console.log({x, y}, {x: i, y: j}, {x: i + sx, y: j + sy}, {x: i + fx, y: j + fy})
          if (this.isInsideSector({x, y}, {x: i, y: j}, {x: i + sx, y: j + sy}, {x: i + fx, y: j + fy})) {
            const {x: l, y: m} = this.carryBorderPoint({x,y});
            console.log(i, j, l, m)
            result.push(this.marks[l][m].point)
          }
        }
      }
    }
    return result;
  }
  areClockwise(v1: Point, v2: Point): Boolean {
    return -v1.x*v2.y + v1.y*v2.x > 0;
  }
  isInsideSector(point: Point, center: Point, sectorStart: Point, sectorEnd: Point): Boolean {

    const relPoint: Point = {
        x: point.x - center.x,
        y: point.y - center.y
    }

    return !this.areClockwise(sectorStart, relPoint) &&
        this.areClockwise(sectorEnd, relPoint);
  }
  
}