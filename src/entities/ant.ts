import 'phaser';
export class Ant extends Phaser.Physics.Arcade.Sprite {
    private _speed = 150;
    constructor(scene: Phaser.Scene, px: number, py: number) {
      super(scene, px, py, 'ant');
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


    move() {
      //this.scenephysics.velocityFromRotation(angle, 600, chick.body.velocity);
      //this.physics.velocityFromRotation(sprite.rotation, 200, sprite.body.acceleration);
    }
    update () {
      this.scene.physics.world.wrap(this);
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