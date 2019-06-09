import Phaser from "phaser";
import Game from "./scenes/game.js"
import Welcome from "./scenes/welcome.js"
import Register from "./scenes/register.js"
import PlayInstruction from "./scenes/playIntruction.js"
import ScoreBoard from "./scenes/scoreBoard.js"
import Reward from "./scenes/reward.js"
import Test from "./scenes/test.js"

const game = new Phaser.Game({
  parent: "phaser-game",
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

  // scene: [Welcome, Register, PlayInstruction, Game, ScoreBoard, Reward],
  scene: [ScoreBoard, Reward],
  // scene: [Game],

})

// set maximum number of pointers allowed to be active at any one time
// game.input.maxPointers = 1;