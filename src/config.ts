import { AntsScene } from './scenes/ants.scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Ants simulation',
  version: '2.0',
  width: 600,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [AntsScene],
  backgroundColor: '#ededed',
  render: { pixelArt: false, antialias: true }
};