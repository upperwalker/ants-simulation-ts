import 'phaser';
import { AntsObjective } from '../enums/ant.objective.enum';
import { AntsScene } from '../scenes/ants.scene';
import { Mark } from './mark';
export class Ant extends Phaser.Physics.Arcade.Sprite {
    private SPEED = 140;
    private SEARCH_RADIUS = 30
    private SEARCH_ANGLE = 1; // radians
    private PHEROMONE_INTENCITY = 40 // *250 ms 
    private _objective = AntsObjective.toFood;
    feromone_intencity = this.PHEROMONE_INTENCITY;
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
      const { x, y } = scene.physics.velocityFromAngle(this.angle - 90, this.SPEED)
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

    get curMark() {
      return this.scene.grid.marks[this.curGridX][this.curGridY]
    }
    set objective(value) {
      this._objective = value
    }
    move() {
      //this.scenephysics.velocityFromRotation(angle, 600, chick.body.velocity);
      //this.physics.velocityFromRotation(sprite.rotation, 200, sprite.body.acceleration);
    }

    setFeromone() {
        if (this.feromone_intencity && this.objective == AntsObjective.toFood && !this.curMark.home) {
          this.curMark.toHome = this.feromone_intencity
          this.curMark.point.fillColor = 0xff0000
          this.feromone_intencity-- 
        } else if (this.feromone_intencity && this.objective == AntsObjective.toHome && !this.curMark.food) {
          this.curMark.toFood = this.feromone_intencity;
          this.curMark.point.fillColor = 0x0000ff
          this.feromone_intencity-- 
        }
    }

    search() {
      //Sensor.isInsideSector()
      if (this.curMark.food && this.objective === AntsObjective.toFood) {
        this.setTexture('ant-food');
        this.feromone_intencity = this.PHEROMONE_INTENCITY;
        if (!(--this.curMark.food)) this.curMark.point.fillColor = 0xffffff;
        this.objective = AntsObjective.toHome;
        this.angle -= 180
        this.scene.physics.velocityFromAngle(this.angle - 90, this.SPEED, this.body.velocity)
        return true
      } else if (this.curMark.home && this.objective === AntsObjective.toHome) {
        this.setTexture('ant');
        this.objective = AntsObjective.toFood;
        this.angle -= 180
        this.scene.physics.velocityFromAngle(this.angle - 90, this.SPEED, this.body.velocity)
        return true  
      } else if (this.curMark.home && this.objective === AntsObjective.toFood) {
        this.feromone_intencity = this.PHEROMONE_INTENCITY;
      }
      const searchedSector = this.scene.grid.getMarksInSector(this.curGridX, this.curGridY, this.SEARCH_RADIUS, this.SEARCH_ANGLE, this.body.velocity);
      //searchedSector.forEach(el => el.point.fillColor = 0xffff00)
      let max: Mark
      for (let mark of searchedSector) {
        if ((mark.food && this.objective === AntsObjective.toFood) || (mark.home  && this.objective === AntsObjective.toHome)) {
          max = mark
          break;
        }
        if (mark[this.objective] && mark[this.objective] > (max?.[this.objective] || 0)) max = mark
      }
      if (max) {
        let dirX = max.point.x + 3 - this.x
        let dirY = max.point.y + 3 - this.y
        if (Math.abs(dirX) > this.scene.cWidth/2 ) {
          dirX > 0 ? dirX -= this.scene.cWidth : dirX += this.scene.cWidth
        }
        if (Math.abs(dirY) > this.scene.cHeight/2 ) {
          dirY > 0 ? dirY -= this.scene.cHeight : dirY += this.scene.cHeight
        }
        const vector = new Phaser.Math.Vector2(dirX , dirY);
        this.angle = (180/Math.PI)*vector.angle() + 90;
        this.scene.physics.velocityFromAngle(this.angle - 90, this.SPEED, this.body.velocity)
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
          const { x, y } = this.scene.physics.velocityFromAngle(this.angle - 90, this.SPEED)
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