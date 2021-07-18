import 'phaser';
import { AntsObjective } from '../enums/ant.objective.enum';
import { AntsScene } from '../scenes/ants.scene';
import { Mark } from './mark';
export class Ant extends Phaser.Physics.Arcade.Sprite {
    private _speed = 150;
    private _searchRadius = 30
    private _searchAngle = 1; // radians
    private _objective = AntsObjective.toFood;
    curGridX: number;
    curGridY: number;
    prevGridX: number; 
    prevGridY: number; 
    scene: AntsScene;
    constructor(scene: AntsScene, px: number, py: number) {
      super(scene, px, py, 'ant');
      this.curGridX =  Math.floor(px / 4);
      this.curGridY =  Math.floor(py / 4);
      this.prevGridX = Math.floor(px / 4);
      this.prevGridY =  Math.floor(py / 4);
      this.setScale(0.17);
      scene.add.existing(this);
      scene.physics.world.enable(this);
      scene.physics.world.wrap(this);
      this.setAngle(Phaser.Math.Between(-180, 180))
      const { x, y } = scene.physics.velocityFromAngle(this.angle - 90, this._speed)
      this.setVelocity(x, y)
    }
  
    // get velocity(): Phaser.Math.Vector2 {
    //   return this.position;
    // }

    // set velocity(newVelocity: Phaser.Math.Vector2) {
    //   this.velocity = newVelocity;
    // }

    get objective() {
      return this._objective
    }

    set objective(value) {
      this._objective = value
    }
    move() {
      //this.scenephysics.velocityFromRotation(angle, 600, chick.body.velocity);
      //this.physics.velocityFromRotation(sprite.rotation, 200, sprite.body.acceleration);
    }

    setFeromone() {
     // if (this.objective === AntsObjective.toFood || this.objective === AntsObjective.toHome) {
       const opposite =  this.objective == AntsObjective.toFood ? 
        { 
          color: 0xff0000, 
          objective: AntsObjective.toHome
        } :
        { 
          color: 0x0000ff,
          objective: AntsObjective.toFood
        }
        this.scene.grid.marks[this.curGridX][this.curGridY][opposite.objective] = 1
        this.scene.grid.marks[this.curGridX][this.curGridY].point.fillColor = opposite.color
     // }
      // TODO implement
    }

    search() {
      //Sensor.isInsideSector()
      if (this.scene.grid.marks[this.curGridX][this.curGridY].food) {

        if (!(--this.scene.grid.marks[this.curGridX][this.curGridY].food)) this.scene.grid.marks[this.curGridX][this.curGridY].point.fillColor = 0xffffff;
        this.objective = AntsObjective.toHome;
        return true
      }
      const searchedSector = this.scene.grid.getMarksInSector(this.curGridX, this.curGridY, this._searchRadius, this._searchAngle, this.body.velocity);
      //searchedSector.forEach(el => el.point.fillColor = 0xffff00)
      let max: Mark
      for (let mark of searchedSector) {
        if (mark[this.objective] && mark[this.objective] > (max?.[this.objective] || 0)) max = mark
      }
      if (max) {
        const vector = new Phaser.Math.Vector2(max.point.x - this.x , max.point.y - this.y);
        this.angle = (180/Math.PI)*vector.angle() + 90;
        this.scene.physics.velocityFromAngle(this.angle - 90, this._speed, this.body.velocity)
        return true
      }
      return false
    }

    update () {
      this.scene.physics.world.wrap(this);
      this.curGridX = Math.floor(this.x / 4)
      this.curGridY = Math.floor(this.y / 4)
      if (this.curGridX !== this.prevGridX || this.curGridY !== this.prevGridY) {
        this.prevGridX = this.curGridX
        this.prevGridY = this.curGridY
        if (!this.search()) { // randomly wander
          this.angle += Math.random() < 0.5 ? -3 : 3 
          const { x, y } = this.scene.physics.velocityFromAngle(this.angle - 90, this._speed)
          this.setVelocity(x, y)
        }
        // console.log(curGridX, curGridY)
        // console.log(this.scene.grid.marks[curGridX][curGridY])
        // here search of food should be called
      }
    }

    // public setValue(v: number): void {
    //   this.value = v;
    // }
  
    // public setValueChange(): void {
    //   this.valueHasChanged = true;
    // }
  
    // public changeValue(): boolean {
    //   return this.valueHasChanged;
    // }
  
    // public setValueToFalse(): void {
    //   this.valueHasChanged = false;
    // }
  }