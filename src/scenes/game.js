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

    this.timeBar = null;
    this.timeBase = null;
    this.heart = null;

    this.caption = null;

    this.score = 0;
    this.stateText = null;
    this.scoreText = null;


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
  }

  preload() {
    // console.log(this.scene);
    this.load.image('background', 'assets/background.png');
    
    this.load.image('heart', 'assets/heart.png');
    this.load.image('timeBase', 'assets/timeBase.png');
    this.load.image('timeBar', 'assets/100bar.png');
    this.load.image('smallbar', 'assets/smallbar.png');
    this.load.image('smallpot', 'assets/smallpot.png');
    this.load.image('gift', 'assets/gift.png');
    
    this.load.image('teppan', 'assets/teppan.png');
    this.load.image('crumpled_paper', 'assets/crumpled_papera.png');

    this.load.spritesheet('vegepack', 'assets/vegepack.png',
         { frameWidth: 237, frameHeight: 203 }    );
    this.load.spritesheet('meatpack', 'assets/meatpack.png',
         { frameWidth: 240, frameHeight: 249 }    );

    this.load.image('playButton', 'assets/play-button.png');
    
    this.load.image('blackBar', 'assets/blackBar.png');


    this.load.audio('collectSuccess', ['assets/audios/bubble.wav','assets/audios/bubble.ogg']);
    this.load.audio('collectFailed', ['assets/audios/knockpot.wav','assets/audios/knockpot.ogg']);
  }

  create() {
    // console.log(this.sys.game)
    //get canvas size
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
     
    //scoretext
    // this.stateText = this.add.text(this.gameWidth/2, this.gameHeight/2, '', this.stateStyle).setOrigin(0.5,0);
    this.scoreText = this.add.text(this.gameWidth-205, 100, '', this.scoreStyle).setOrigin(0,0.3).setDepth(100);
    
    // event
    
    //Game Run Time
    this.timerEvents.push(
      this.time.addEvent({
        delay: 30000,
        // delay: 3000,
        callback: () => {
          this.scene.pause();
          // this.scene.events.on('transitioninit', function(fromScene, duration){});
          // this.scene.transition({
          //   duration: 1000, 
          //   target:"ScoreBoard",
          //   // moveBelow: false,
          //   // sleep: false, 
          // });
          this.saveIntoDB();

        },
        callbackScope: this,
      })  
    )
    // timeBar rescale
    this.timeBarOriginal = this.timeBar.displayWidth ;
    // console.log(this.timeBar.displayWidth);
    // console.log(this.timeBarOriginal);
    
    this.timerEvents.push(
      this.time.addEvent({
        delay: 1000,
        repeat: 30,
        callback: () => {
          var scale = this.timerEvents[1].getRepeatCount();
          // console.log(this.timerEvents[1].getRepeatCount());
          // this.timeBar.scaleX *= (scale/10);
          // this.timeBar.displayWidth = this.timeBar.displayWidth-3.33;
          this.timeBar.displayWidth = this.timeBar.displayWidth-(this.timeBarOriginal*1/30);
          // console.log(this.timeBar.displayWidth-(this.timeBarOriginal*1/30));
          // console.log(this.timeBar.displayWidth);
          // console.log(Math.round(this.timeBarOriginal*(scale*10)/100));
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
          var vegepack = this.veges.get(
              Phaser.Math.Between(120, this.gameWidth-120), 
              Phaser.Math.Between(-64, 0),
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
          var meatpack = this.meats.get(
              Phaser.Math.Between(120, this.gameWidth-120), 
              Phaser.Math.Between(-64, 0),
              'meatpack',Phaser.Math.Between(0, 1)
          );
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
            var x = Phaser.Math.Between(120, this.gameWidth);
            var y = Phaser.Math.Between(-64, 0);
            
            var bomb = this.bombs.create(x,y,'crumpled_paper').setScale(0.3);
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
    // this.playButton.on('pointerup', function (pointer) {

    // });

 
    this.bombs = this.physics.add.group({
      maxSize: 10000,
    });
    this.veges = this.physics.add.group({
      defaultKey: 'vegepack',
      maxSize: 10000,
    });
    this.meats = this.physics.add.group({
      defaultKey: 'meatpack',
      maxSize: 10000,
    });

    // create player tappen
    this.player = this.physics.add.sprite(this.gameWidth/2, this.gameHeight - 10, 'teppan').setScale(0.2);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    //player collide with bombs and foods
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    this.physics.add.collider(this.player, this.veges, this.collectVeges, null, this);
    this.physics.add.collider(this.player, this.meats, this.collectMeats, null, this);
  

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
    this.score += 5;
    this.sound.play("collectSuccess");

  }
  collectMeats(player, meats) {

    meats.disableBody(false, true);
    this.score += 10;
    this.sound.play("collectSuccess");

  }

  hitBomb(player, bomb) {
    // console.log('hitBomb');
    bomb.disableBody(true, true);
    this.score -= 30;
    this.sound.play("collectFailed");

  }

  saveIntoDB() {
    // this.
    console.log("saving score");
    this.sys.game.playerName = "cat";
    this.sys.game.playerContact = "Contliao act";
    this.sys.game.playerEmail = "Emailya";
    this.sys.game.playerScore = this.score;

    var http_request;
    http_request = new XMLHttpRequest();
    http_request.onload = function () { console.log(this.responseText); };
    http_request.open("POST", "http://localhost/teppan/game.php");
    // http_request.open("POST", "X");
    http_request.withCredentials = false;
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.send("name=" + this.sys.game.playerName + "&contact=" + this.sys.game.playerContact + "&email=" + this.sys.game.playerEmail + "&score=" + this.score);

    console.log("saving done");
    // this.scene.start("ScoreBoard");

  }


}