import Phaser from "phaser";
import Game from "./scenes/game.js"
import Welcome from "./scenes/welcome.js"
import Register from "./scenes/register.js"
import PlayInstruction from "./scenes/playIntruction.js"

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
  // scene: [Game],
  scene: [Welcome, Register, PlayInstruction, Game],
})

// set maximum number of pointers allowed to be active at any one time
game.input.maxPointers = 1;
