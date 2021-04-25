import { AntsScene } from './scenes/ants.scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Ants simulation',
  version: '2.0',
  width: 1000,
  height: 800,
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
        fps: 60,
        gravity: { y: 0 }
    }
  },
  scene: [AntsScene],
  backgroundColor: '#ededed',
  render: { pixelArt: false, antialias: true }
};