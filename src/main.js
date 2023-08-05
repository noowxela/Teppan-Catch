import Boot from "./scenes/boot.js";
import InGame from "./scenes/ingame.js";
import Load from "./scenes/load.js";
import Menu from "./scenes/menu.js";

// import Phaser from "phaser";
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

function runGame() {
    var config = {
        type: Phaser.AUTO,
        width: 648,
        height: 1080,
        parent: 'game',
        backgroundColor: 0,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        // width: window.innerWidth-70,
        // height: window.innerHeight-70,
        // parent: "phaser-game",
        // mode: Phaser.Scale.NONE,
        // autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        dom: {
            createContainer: true
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }, 
                debug: false
            }
        },
        // roundPixels: true,
        // scene: [Boot, Load, Menu, InGame]
        scene: [Boot, Load, Welcome, PlayInstruction, Game, ScoreBoard, Reward],
        // scene: [Boot, Load, ScoreBoard, Reward],
    };

    new Phaser.Game(config);
}

window.onload = function () {
    // if (isMobile) {
        runGame();
    // } else {
    //     element.innerHTML = "Please Use Mobile to play";
    // }
};