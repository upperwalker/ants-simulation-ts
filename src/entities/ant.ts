import 'phaser';
import { AntObjective } from '../enums/ant.objective.enum';
import { AntsScene } from '../scenes/ants.scene';
import { Sensor } from './sensor';
export class Ant extends Phaser.Physics.Arcade.Sprite {
    private _speed = 150;
    private _searchRadius = 5
    private _searchAngle = 2; // radians
    private _objective = AntObjective.findFood;
    prevGridX: number
    prevGridY: number
    scene: AntsScene;
    constructor(scene: AntsScene, px: number, py: number) {
      super(scene, px, py, 'ant');
      this.prevGridX = px / 4;
      this.prevGridY = py / 4;
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

    set objective(value: AntObjective) {
      this._objective = value
    }
    move() {
      //this.scenephysics.velocityFromRotation(angle, 600, chick.body.velocity);
      //this.physics.velocityFromRotation(sprite.rotation, 200, sprite.body.acceleration);
    }

    setFeromone() {
      this.scene.grid.marks[this.prevGridX][this.prevGridY].point.fillColor = 0xff0000
      // TODO implement
    }

    search() {
      //Sensor.isInsideSector()
      this.scene.grid.getPointsInSector(this.prevGridX, this.prevGridY, this._searchRadius, this._searchAngle, this.body.velocity).forEach(el => el.fillColor = 0xffff00)
    }

    update () {
      this.scene.physics.world.wrap(this);
      const curGridX = Math.floor(this.x / 4)
      const curGridY = Math.floor(this.y / 4)
      if (curGridX !== this.prevGridX || curGridY !== this.prevGridY) {
        this.prevGridX = curGridX
        this.prevGridY = curGridY
        // console.log(curGridX, curGridY)
        // console.log(this.scene.grid.marks[curGridX][curGridY])
        // here search of food should be called
        this.search()
      }

      this.angle += Math.random() < 0.5 ? -3 : 3
      const { x, y } = this.scene.physics.velocityFromAngle(this.angle - 90, this._speed)
      this.setVelocity(x, y)
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