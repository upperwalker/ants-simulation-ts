import 'phaser';
export class Ant {
    private position: Phaser.Math.Vector2;
  
    constructor(x: number, y: number) {
      this.position = new Phaser.Math.Vector2(x, y);
    }
  
  
    get getPosition(): Phaser.Math.Vector2 {
      return this.position;
    }

    // set setPosition(): void {

    // }
  
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