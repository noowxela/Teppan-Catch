import {
  GRAVITY_LEVELS,
  MILLISECONDS_PER_FRAME,
  SOFTDROP_DELAY,
  PIECE_TYPES,
  COOKIE_LAST,
  COOKIE_TOP
} from '../prefabs/constants.js';
import * as h from '../prefabs/helpers.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
    this.gameWidth = null;
    this.gameHeight= null;
    this.cursors = null;
    this.pointer = null;

    this.veges = null;
    this.meats = null;
    this.bombs = null;
    this.spoon = null;

    this.timeBar = null;
    this.timeBase = null;
    this.heart = null;

    this.caption = null;

    this.stateText = null;
    this.scoreText = null;
    this.score = 0;
    this.timerText = null;
    this.timer = 30;


    this.playButton = null;
    this.gamerun = 0;

    this.timerEvents = [];

    this.captionStyle = {
      fill: '#000000',
      fontFamily: 'heavitas',
      fontsize: 80 ,
      lineSpacing: 6
    };
    this.stateStyle = {
      fill: '#000000',
      fontFamily: 'heavitas',
      fontSize: 80 ,
      lineSpacrring: 6
  };
    this.scoreStyle = {
      fill: '#ffffff',
      fontFamily: 'heavitas',
      fontSize: 20 ,
      lineSpacrring: 6
  };

    this.captionTextFormat = (
      'Total:    %1\n' +
      'Max:      %2\n' +
      'Active:   %3\n' +
      'Inactive: %4\n' +
      'Used:     %5\n' +
      'Free:     %6\n' +
      'Full:     %7\n' +
      'Score:    %8\n'
    );
    this.stateBoard = (
      'Score:    %1\n' +
      'Time:     %2\n' 
      );
    this.scoreBoard = (
      '%1\n' 
      );
    this.timerBoard = (
      '%1\n' 
      );
  }

  preload() {
    this.gameWidth = this.sys.game.canvas.getAttribute("width");
    this.gameHeight = this.sys.game.canvas.getAttribute("height");
    this.gamerun = 1;
  }

  create() {
    // Background
    this.add.image(
      this.gameWidth/2,
      this.gameHeight/2, 'background').setScale(1);
      
    // Music
    this.music_gameover = this.sound.add('gameover');
    this.music_ingame = this.sound.add('gameBGM', { volume: 1, loop: true });
    this.music_ingame.play();
    
    // UI GAME OVER
    this.ui_gameover_1 = this.add.text(330, 446, 'GAME OVER', { fontSize: 52, align: 'center', fill: '#000000', fontStyle: 'bold' })
        .setOrigin(0.5).setDepth(102)
        .setVisible(false);
    this.ui_gameover_2 = this.add.text(330, 510, '-SCORE-', { fontSize: 48, align: 'center', fill: '#000000' })
        .setOrigin(0.5).setDepth(102)
        .setVisible(false);
    this.ui_gameover_score = this.add.text(330, 580, '', { fontSize: 48, align: 'center', fill: '#000000', fontStyle: 'bold' })
        .setOrigin(0.5).setDepth(100)
        .setVisible(false);
    this.ui_gameover_click = this.add.text(330, 900, 'click to continue', { fontSize: 24, align: 'center', fill: '#000000' })
        .setOrigin(0.5).setDepth(102)
        .setVisible(false);
    this.ui_higscore = this.add.image(330, 740, 'highscore')
        .setScale(0.9).setDepth(102)
        .setAngle(-20)
        .setAlpha(0.5)
        .setVisible(false);

        
    //// Sounds
    this.snd_explosion = this.sound.add('explosion');
    this.snd_line = this.sound.add('line');
    this.snd_spin = this.sound.add('spin').setVolume(0.8);
    this.snd_down = this.sound.add('knock').setVolume(0.4);
    this.snd_levelup = this.sound.add('levelup');
    this.snd_score4 = this.sound.add('score4');
    this.snd_move = this.sound.add('move').setVolume(0.4);

  // foods produce logic
    // this.caption = this.add.text(50, this.gameHeight/4*1, '', this.captionStyle);
    
    this.heart = this.add.image(30, 50, 'heart').setScale(0.8).setOrigin(0,0).setDepth(101);
    this.timeBase = this.add.image(200, 80, 'timeBase').setScale(0.15).setDepth(100);
    this.timeBar = this.add.image(100, 62, 'timeBar').setScale(0.15).setOrigin(0,0).setDepth(100);
    // timerText
    this.timerText = this.add.text(185, 80, '', this.scoreStyle).setOrigin(0,0.3).setDepth(100);
    
    this.smallpot = this.add.image(this.gameWidth-190, 80, 'smallpot').setScale(0.8).setDepth(101);
    this.smallbar = this.add.image(this.gameWidth-15, 80, 'smallbar').setScale(1).setOrigin(1,0.5).setDepth(100);
    // scoretext
    this.scoreText = this.add.text(this.gameWidth-110, 80, '', this.scoreStyle).setOrigin(0,0.3).setDepth(100);
    
    // event
    var rangeX = Array(5);
    var ThiPeen = Array(5);
    ThiPeen[0] = 0;
    ThiPeen[1] = 0;
    ThiPeen[2] = 0;
    ThiPeen[3] = 0;
    ThiPeen[4] = 0;

    //Game Run Time
    this.timerEvents.push(
      this.time.addEvent({
        delay: 30000,
        callback: () => {
          this.scene.pause();
          // this.saveIntoDB();
          this.onGameOver();
        },
        callbackScope: this,
      })  
    )
    // timeBar rescale
    this.timeBarOriginal = this.timeBar.displayWidth ;
    
    this.timerEvents.push(
      this.time.addEvent({
        delay: 1000,
        repeat: 30,
        callback: () => {
          var scale = this.timerEvents[1].getRepeatCount();
          this.timeBar.displayWidth = this.timeBar.displayWidth-(this.timeBarOriginal*1/30);
          this.timer -= 1;

        },
        callbackScope: this,
      })  
    )
    // // create low_point_food
    this.timerEvents.push(
      this.time.addEvent({
        delay: 800,
        // delay: 200,
        loop: true,
        callback: () => {
          rangeX[0] = Phaser.Math.Between(120, 240);
          rangeX[1] = Phaser.Math.Between(240, 480);
          rangeX[2] = Phaser.Math.Between(480, 600);
          rangeX[3] = Phaser.Math.Between(600, 720);
          rangeX[4] = Phaser.Math.Between(720, 840);

          var i = Phaser.Math.Between(0,4)
          // while (ThiPeen[i] = 1){
          //   if(ThiPeen[0]==1 && ThiPeen[1]==1 && ThiPeen[2]==1 && ThiPeen[3]==1 && ThiPeen[4]==1 ){
          //     ThiPeen[0] = 0;
          //     ThiPeen[1] = 0;
          //     ThiPeen[2] = 0;
          //     ThiPeen[3] = 0;
          //     ThiPeen[4] = 0;
          //   }
          //   i = Phaser.Math.Between(0,4)

          // }

          this.veges.get(
              Phaser.Math.Between(120, rangeX[i]), 
              Phaser.Math.Between(-200, 0),
              'vegepack',Phaser.Math.Between(0, 3)
          ).setScale(0.5);
        }
      })
    )
    // create high_point_food
    this.timerEvents.push(
      this.time.addEvent({
        delay: 1800,
        // delay: 500,
        loop: true,
        callback: () => {
          rangeX[0] = Phaser.Math.Between(120, 240);
          rangeX[1] = Phaser.Math.Between(240, 480);
          rangeX[2] = Phaser.Math.Between(480, 600);
          rangeX[3] = Phaser.Math.Between(600, 720);
          rangeX[4] = Phaser.Math.Between(720, 840);

          var i = Phaser.Math.Between(0,4)

          this.meats.get(
              Phaser.Math.Between(120, rangeX[i]), 
              Phaser.Math.Between(-200, 0),
              'meatpack',Phaser.Math.Between(0, 1)
          ).setScale(0.5);
        }
      })
    )
    // spoon creation
    this.timerEvents.push(
      this.time.addEvent({
          delay: 2500,
          // delay: 200,
          loop: true,
          callback: () => {

            rangeX[0] = Phaser.Math.Between(120, 240);
            rangeX[1] = Phaser.Math.Between(240, 480);
            rangeX[2] = Phaser.Math.Between(480, 600);
            rangeX[3] = Phaser.Math.Between(600, 720);
            rangeX[4] = Phaser.Math.Between(720, 840);
  
            var i = Phaser.Math.Between(0,4)

            var x = Phaser.Math.Between(120, this.gameWidth-120);
            var y = -200;
            
            var spoon = this.spoon.create(rangeX[i],y,'spoon').setScale(0.5);
          }
      })
    )
    // bomb creation

    this.timerEvents.push(
      this.time.addEvent({
          delay: 1300,
          // delay: 200,
          loop: true,
          callback: () => {
            rangeX[0] = Phaser.Math.Between(this.gameWidth/7, this.gameWidth/7*2);
            rangeX[1] = Phaser.Math.Between(this.gameWidth/7*2, this.gameWidth/7*3);
            rangeX[2] = Phaser.Math.Between(this.gameWidth/7*3, this.gameWidth/7*4);
            rangeX[3] = Phaser.Math.Between(this.gameWidth/7*4, this.gameWidth/7*5);
            rangeX[4] = Phaser.Math.Between(this.gameWidth/7*5, this.gameWidth/7*6);

            var i = Phaser.Math.Between(0,4)
            
            var x = Phaser.Math.Between(120, this.gameWidth-120);
            var y = -200;
            
            var bomb = this.bombs.create(rangeX[i],y,'crumpled_paper').setScale(1);
          }
      })
    )
  
    // pause all timer event
    {
    // this.timerEvents[0].paused = true;
    // this.timerEvents[1].paused = true;
    // this.timerEvents[2].paused = true;
    // this.timerEvents[3].paused = true;
    // this.timerEvents[4].paused = true;
    }
    
    // add play button
    // this.playButton = this.add.sprite(this.gameWidth/2, this.gameHeight/2-100, 'playButton').setInteractive();
    // this.playButton.setTint(0xff0000);

    //[play button functouin]
    {
      // this.playButton.on('pointerdown', function (pointer) {
      //   if( this.scene.gamerun == 0 ){
      //     console.log("start");

      //     this.clearTint();
      //     this.setTint(0x00ff00);

      //     this.scene.gamerun = 1;
      //     this.scene.timerEvents[0].paused = false;
      //     this.scene.timerEvents[1].paused = false;
      //     this.scene.timerEvents[2].paused = false;
      //     this.scene.timerEvents[3].paused = false;
      //     this.scene.timerEvents[4].paused = false;
      //   }
      //   else if( this.scene.gamerun == 1 ){
      //     console.log("pause");

      //     this.clearTint();
      //     this.setTint(0xff0000);

      //     this.scene.gamerun = 0;
      //     this.scene.timerEvents[0].paused = true;
      //     this.scene.timerEvents[1].paused = true;
      //     this.scene.timerEvents[2].paused = true;
      //     this.scene.timerEvents[3].paused = true;
      //     this.scene.timerEvents[4].paused = true;
      //     // this.scene.scene.pause();

      //   }

      // });
    }

 
    this.bombs = this.physics.add.group({
      maxSize: 100,
    });
    this.spoon = this.physics.add.group({
      maxSize: 100,
    });
    this.veges = this.physics.add.group({
      defaultKey: 'vegepack',
      maxSize: 100,
    });
    this.meats = this.physics.add.group({
      defaultKey: 'meatpack',
      maxSize: 100,
    });

    // create player tappen
    this.player = this.physics.add.sprite(this.gameWidth/2, this.gameHeight - 10, 'teppan').setScale(0.1);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    //player collide with bombs and foods
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    this.physics.add.collider(this.player, this.veges, this.collectVeges, null, this);
    this.physics.add.collider(this.player, this.meats, this.collectMeats, null, this);
    this.physics.add.collider(this.player, this.spoon, this.collectSpoon, null, this);
  

  }

  update() {
    var timeEllapsed = Math.round(this.timerEvents[0].getElapsedSeconds());

    if (this.score <= 0){
      this.score = 0;

    }else if(this.score > 0){
      this.score = this.score;

    }

// middle debug
  //   this.stateText.setText(Phaser.Utils.String.Format(this.stateBoard, [
  //     this.score+'  PTS',
  //     30-timeEllapsed+'  s',
  // ]));
    this.scoreText.setText(Phaser.Utils.String.Format(this.scoreBoard, [
      this.score ,
    ]));
    this.timerText.setText(Phaser.Utils.String.Format(this.timerBoard, [
      this.timer ,
    ]));

// game physic debug
    // this.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
    //   this.veges.getLength(),
    //   this.veges.maxSize,
    //   this.veges.countActive(true),
    //   this.veges.countActive(false),
    //   this.veges.getTotalUsed(),
    //   this.veges.getTotalFree(),
    //   this.veges.isFull(),
    //   this.score
    // ]));

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.gameWidth/10*9*2);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.gameWidth/10*9*2);
    }

    else {
      this.player.setVelocityX(0);
    }
    
    this.pointer = this.input.activePointer;

    if (this.pointer.isDown) {
      var touchPoint = this.pointer.x;
      var tappen_location = this.player.x;

      if ((touchPoint + 15) < tappen_location){
        this.player.setVelocityX(-this.gameWidth/6*4.5);
      }
      else if ((touchPoint - 15)> tappen_location){
        this.player.setVelocityX(this.gameWidth/6*4.5);
      }
      else{
        this.player.setVelocityX(0);
      }
    };

  }

  render(){
    
  } 

  collectVeges(player, veges) {

    veges.disableBody(false, true);
    this.score += 1;
    this.sound.play("collectSuccess");

  }
  collectMeats(player, meats) {

    meats.disableBody(false, true);
    this.score += 3;
    this.sound.play("collectSuccess");

  }
  collectSpoon(player, spoon) {

    spoon.disableBody(false, true);
    this.score += 5;
    this.sound.play("collectSuccess");

  }

  hitBomb(player, bomb) {
    // console.log('hitBomb');
    bomb.disableBody(true, true);
    this.score -= 1;
    this.sound.play("collectFailed");

  }

  saveIntoDB() {
    // console.log("saving score");
    this.sys.game.playerScore = this.score;

		var oneForAllArray = [this.sys.game.playerName,this.sys.game.playerContact,this.sys.game.playerEmail,this.score];
		var playerData = JSON.stringify(oneForAllArray); 
		var encrypted = window.btoa(playerData);

    

    var http_request;
    var vm = this
    http_request = new XMLHttpRequest();
    http_request.onload = function () {
      // console.log(this.responseText); 
      document.getElementById("background").pause(); 
      vm.scene.start("ScoreBoard");
    };
    http_request.open("POST", window.location.protocol + "//pepperlunchgame.com/game.php");
    // http_request.open("POST", "http://localhost/teppan/game.php");
    // http_request.open("POST", "X");
    http_request.withCredentials = false;
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // http_request.send("name=" + this.sys.game.playerName + "&contact=" + this.sys.game.playerContact + "&email=" + this.sys.game.playerEmail + "&score=" + this.score + "&key=t");
		http_request.send("encrypted=" + encrypted );

    // console.log("saving done");
    // this.music.stop();
    
  }


  // CaesarCipher(str, num) {

  //     var result = '';
  //     var charcode = 0;

  //     for (var i = 0; i < str.length; i++) {
  //         charcode = (str[i].charCodeAt()) + num;
  //         result += String.fromCharCode(charcode);
  //     }
  //     return result;

  // }

  //  makeid(length) {
  //    var result           = '';
  //    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //    var charactersLength = characters.length;
  //    for ( var i = 0; i < length; i++ ) {
  //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //    }
  //    return result;
  // }

  //// Event handlers
  onGameOver() {
    this.isGameOver = true;

    this.input.keyboard.removeAllKeys();

    this.music_ingame.stop();

    this.music_gameover.play();
    this.music_gameover.on('complete', () => {
      this.onExplodeAll();
    });
  }

  onExplodeAll() {
    // Print game over
    this.ui_gameover_1.setVisible(true);
    this.ui_gameover_2.setVisible(true);
    this.ui_gameover_score.setText(this.scoreText.text);
    this.ui_gameover_score.setVisible(true);

    this.snd_levelup.play();

    let t = this;
    this.tweens.add({
        targets: [t.ui_gameover_1, t.ui_gameover_2, t.ui_gameover_score],
        scale: 1.2,
        yoyo: true,
        duration: 100,
        delay: 0
    });

    // Check scores
    let topScore = h.getCookie(COOKIE_TOP);
    topScore = topScore ? parseInt(topScore) : 0;
    if (this.score > topScore) {
        h.setCookie(COOKIE_TOP, this.score, 365);
        setTimeout(() => {
            this.ui_higscore.setVisible(true);
            this.snd_line.play();
            this.cameras.main.shake(60, 0.03);
            setTimeout(() => {
                this.snd_score4.play();
                this.ui_gameover_click.setVisible(true);
                this.scene.start('ScoreBoard');
            }, 500);
        }, 1500);
    } else {
        this.ui_gameover_click.setVisible(true);
        this.scene.start('ScoreBoard');
    }
    h.setCookie(COOKIE_LAST, this.score, 365);
  }
}