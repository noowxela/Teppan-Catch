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
      fontSize: 60 ,
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
    this.load.image('background', 'assets/background.png');
    
    this.load.image('heart', 'assets/heart.png');
    this.load.image('timeBase', 'assets/timeBase.png');
    this.load.image('timeBar', 'assets/100bar.png');
    this.load.image('smallbar', 'assets/smallbar.png');
    this.load.image('smallpot', 'assets/smallpot.png');
    this.load.image('gift', 'assets/gift.png');
    
    this.load.image('teppan', 'assets/teppan.png');
    this.load.image('crumpled_paper', 'assets/rubbish.png');
    this.load.image('spoon', 'assets/spoon.png');

    this.load.spritesheet('vegepack', 'assets/vegepack.png',
         { frameWidth: 237, frameHeight: 203 }    );
    this.load.spritesheet('meatpack', 'assets/steakv2.png',
         { frameWidth: 222, frameHeight: 127 }    );

    this.load.image('playButton', 'assets/play-button.png');
    
    // this.load.image('blackBar', 'assets/blackBar.png');


    this.load.audio('collectSuccess', ['assets/audios/bubble.wav','assets/audios/bubble.ogg']);
    this.load.audio('collectFailed', ['assets/audios/knockpot.wav','assets/audios/knockpot.ogg']);
    // this.load.audio('background', ['assets/audios/BackgroundMusic01.wav','assets/audios/BackgroundMusic01.ogg']);
  }

  create() {
    // this.music = this.sound.add('background',{loop:true});
    // this.music.play();
    document.getElementById("background").play(); 

    this.gameWidth = this.sys.game.canvas.getAttribute("width");
    this.gameHeight = this.sys.game.canvas.getAttribute("height");
    
    this.gamerun = 1;
    
    this.add.image(
      this.gameWidth/2,
      this.gameHeight/2, 'background').setScale(1.5);
      
  // foods produce logic
    // this.caption = this.add.text(50, this.gameHeight/4*1, '', this.captionStyle);

    this.heart = this.add.image(30, 50, 'heart').setScale(1.3).setOrigin(0,0).setDepth(101);
    this.timeBase = this.add.image(300, 100, 'timeBase').setScale(0.3).setDepth(100);
    this.timeBar = this.add.image(100, 65, 'timeBar').setScale(0.3).setOrigin(0,0).setDepth(100);
    
    this.smallbar = this.add.image(this.gameWidth-15, 100, 'smallbar').setScale(1.6).setOrigin(1,0.5).setDepth(100);
    this.smallpot = this.add.image(this.gameWidth-280, 100, 'smallpot').setScale(1.3).setDepth(100);
     
    //scoretext & timerText
    // this.stateText = this.add.text(this.gameWidth/2, this.gameHeight/2, '', this.stateStyle).setOrigin(0.5,0);
    this.scoreText = this.add.text(this.gameWidth-205, 100, '', this.scoreStyle).setOrigin(0,0.3).setDepth(100);
    this.timerText = this.add.text(205, 100, '', this.scoreStyle).setOrigin(0,0.3).setDepth(100);
    
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
        // delay: 3000,
        callback: () => {
          this.scene.pause();
          this.saveIntoDB();

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

          var vegepack = this.veges.get(
              Phaser.Math.Between(120, rangeX[i]), 
              Phaser.Math.Between(-200, 0),
              'vegepack',Phaser.Math.Between(0, 3)
          ).setScale(0.9);
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

          var meatpack = this.meats.get(
              Phaser.Math.Between(120, rangeX[i]), 
              Phaser.Math.Between(-200, 0),
              'meatpack',Phaser.Math.Between(0, 1)
          );
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
            
            var spoon = this.spoon.create(rangeX[i],y,'spoon').setScale(1);
          }
      })
    )
    // bomb creation
    console.log(this.gameWidth);
    console.log(this.gameWidth/7*2);
    console.log(this.gameWidth/7*3);
    console.log(this.gameWidth/7*4);
    console.log(this.gameWidth/7*5);
    console.log(this.gameWidth/7*6);

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
            console.log(' x :'+rangeX[i]);

            var x = Phaser.Math.Between(120, this.gameWidth-120);
            var y = -200;
            
            var bomb = this.bombs.create(rangeX[i],y,'crumpled_paper').setScale(1.3);
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
    this.player = this.physics.add.sprite(this.gameWidth/2, this.gameHeight - 10, 'teppan').setScale(0.2);
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

    var http_request;
    http_request = new XMLHttpRequest();
    http_request.onload = function () {
      // console.log(this.responseText); 
    };
    http_request.open("POST", "http://pepperlunchgame.com/game.php");
    // http_request.open("POST", "http://localhost/teppan/game.php");
    // http_request.open("POST", "X");
    http_request.withCredentials = false;
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.send("name=" + this.sys.game.playerName + "&contact=" + this.sys.game.playerContact + "&email=" + this.sys.game.playerEmail + "&score=" + this.score);

    // console.log("saving done");
    // this.music.stop();
    document.getElementById("background").pause(); 
    this.scene.start("ScoreBoard");
  }




}