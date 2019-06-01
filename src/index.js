import Phaser from "phaser";
import Game from "./scenes/game.js"

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  mode: Phaser.Scale.NONE,
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Game],
})
