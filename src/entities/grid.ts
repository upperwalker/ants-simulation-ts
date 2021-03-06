import { AntsObjective } from "../enums/ant.objective.enum";
import { AntsScene } from "../scenes/ants.scene";
import { Point } from "../types/point";
import { Mark } from "./mark";

export class Grid {
  scene: Phaser.Scene;
  marks: Mark[][];
  constructor(scene: AntsScene, public sizeX: number, public sizeY: number) {
    this.scene = scene;
    this.marks = new Array<Array<Mark>>();
    for (let i = 0; i < sizeX; i++) {
      let row:Mark[]  = new Array<Mark>();      
      for (let j = 0; j < sizeY; j++){
          const point = scene.add.rectangle(i*4, j*4, 3, 3, 0xffffff) //new Phaser.Geom.Rectangle(i*4, j*4, 3, 3);
          if ((sizeX/2 - i)**2 + (sizeY/2 - j)**2 < 25)  row.push(new Mark(point, undefined, undefined, undefined, 1));
          else row.push(new Mark(point));

      }
      this.marks.push(row);
    }
  }
  setFood({x, y}: Point) {
    this.marks[this.toGridNum(x)][this.toGridNum(y)].point.fillColor = 0x00ff00
    this.marks[this.toGridNum(x)][this.toGridNum(y)].food = 25
  }
  decrease(mark: Mark, key: AntsObjective) {
    if (! --mark[key]) mark.point.fillColor = 0xffffff
  }
  toGridNum(from: number): number{
    return Math.floor(from/4);
  }
  carryBorderPoint({x, y}: Point): Point {
    if (x < 0) x += this.sizeX;
    if (y < 0) y += this.sizeY;
    if (x >= this.sizeX) x -= this.sizeX;
    if (y >= this.sizeY) y -= this.sizeY;
    return {x, y}
  }
  getMarksInSector(i: number, j: number, radius: number, angle: number, velocity: Phaser.Math.Vector2) { 
    const result: Mark[] = []; 
    let {x: sx, y: sy} = velocity.clone().setLength(radius).rotate(-angle/2);
    let {x: ex, y: ey} = velocity.clone().setLength(radius).rotate(angle/2);
    for(let x = i - radius; x <= i + radius; x++) {
      for(let y = j - radius; y <= j + radius; y++) {
        if(x !== i || y !== j) {
          if (this.isInsideSector({x, y}, {x: i, y: j}, {x: sx, y: sy}, {x: ex, y: ey}, radius**2)) {
            const {x: l, y: m} = this.carryBorderPoint({x,y});
            result.push(this.marks[l][m])
          }
        }
      }
    }
    return result;
  }
  areClockwise(v1: Point, v2: Point): Boolean {
    return -v1.x*v2.y + v1.y*v2.x > 0;
  }

  isWithinRadius(v: Point, radiusSquared: number) {
          return v.x*v.x + v.y*v.y <= radiusSquared;
  }
  isInsideSector(point: Point, center: Point, sectorStart: Point, sectorEnd: Point, radiusSquared: number): Boolean {

    const relPoint: Point = {
        x: point.x - center.x,
        y: point.y - center.y
    }
    return !this.areClockwise(sectorStart, relPoint) && 
   this.areClockwise(sectorEnd, relPoint) && this.isWithinRadius(relPoint, radiusSquared); 
  
  }
  
}