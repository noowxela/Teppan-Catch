import Phaser from "phaser";
import Game from "./scenes/game.js"
import Welcome from "./scenes/welcome.js"
import Register from "./scenes/register.js"
import PlayInstruction from "./scenes/playIntruction.js"
import ScoreBoard from "./scenes/scoreBoard.js"
import Reward from "./scenes/reward.js"
import Test from "./scenes/test.js"

let game;
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let element = document.getElementById('warning');

// if (isMobile) {
    game = new Phaser.Game({
    parent: "phaser-game",
    type: Phaser.AUTO,
    width: window.innerWidth-70,
    height: window.innerHeight-70,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    dom: {
      createContainer: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 }, 
        debug: false
      }
    },

    scene: [Welcome, Register, PlayInstruction, Game, ScoreBoard, Reward],
    // scene: [Register, PlayInstruction, Game, ScoreBoard, Reward],
    // scene: [ScoreBoard],
  })

 // } else {
 //   element.innerHTML = "Please Use Mobile to play";
 // }