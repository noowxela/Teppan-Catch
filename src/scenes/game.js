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
    this.hpBar = null;
    this.hpBG = null;
    this.caption = null;
    this.score = 0;
    this.scoretext = null;


    this.playButton = null;
    this.gamerun = 0;

    this.timerEvents = [];

    this.captionStyle = {
      fill: '#000000',
      fontFamily: 'heavitas',
      fontsize: 80 ,
      lineSpacing: 6
    };
    this.sadlife = {
      fill: '#000000',
      fontFamily: 'heavitas',
      fontSize: 80 ,
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
    this.scoreBoard = (
      'Score:    %1\n' +
      'Time:     %2\n' 
      );
  }

  preload() {

    this.load.image('background', 'assets/background.png');
    this.load.image('space', 'assets/space.jpg');
    
    this.load.image('buttonBG', 'assets/button-bg.png');
    this.load.image('buttonText', 'assets/button-text.png');

    this.load.image('heatlhbar', 'assets/heatlhbar.png');
    this.load.image('100bar', 'assets/100bar.png');
    
    this.load.image('teppan', 'assets/teppan.png');
    this.load.image('crumpled_paper', 'assets/crumpled_papera.png');

    this.load.spritesheet('vegepack', 'assets/vegepack.png',
         { frameWidth: 237, frameHeight: 203 }    );
    this.load.spritesheet('meatpack', 'assets/meatpack.png',
         { frameWidth: 240, frameHeight: 249 }    );

    this.load.image('playButton', 'assets/play-button.png');


    this.load.audio('collectSuccess', ['assets/audios/bubble.wav','assets/audios/bubble.ogg']);
    this.load.audio('collectFailed', ['assets/audios/knockpot.wav','assets/audios/knockpot.ogg']);
  }

  create() {
    //get canvas size
    this.gameWidth = this.sys.game.canvas.getAttribute("width");
    this.gameHeight = this.sys.game.canvas.getAttribute("height");
    
    this.gamerun = 1;
    
    this.add.image(
      this.gameWidth/2,
      this.gameHeight/2, 'background').setScale(1.5);
      
    //scoretext
    this.scoretext = this.add.text(this.gameWidth/2, this.gameHeight/2, 'sdfghgfdfghgfdsd', this.sadlife).setOrigin(0.5,0);
    // foods produce logic
    this.caption = this.add.text(50, this.gameHeight/4*1, '', this.captionStyle);

    this.hpBG = this.add.image(250, 100, 'heatlhbar').setScale(0.3);
    this.hpBar = this.add.image(50, 65, '100bar').setScale(0.3).setOrigin(0,0);

    // this.playButton = this.add.image(this.gameWidth/2, this.gameHeight/2, 'playButton').setScale(1.3).setInteractive();
    
    // event
    {
      //Game Run Time
      this.timerEvents.push(
        this.time.addEvent({
          // delay: 30000,
          delay: 5000,
          callback: () => {
            this.scene.pause();
            // this.scene.events.on('transitioninit', function(fromScene, duration){});
            // this.scene.transition({
            //   duration: 1000, 
            //   target:"ScoreBoard",
            //   allowInput: true, 
            //   // moveBelow: false,
            //   // sleep: false, 
            // });

          },
          callbackScope: this,
        })  
      )
      // Hpbar minus
      this.timerEvents.push(
        this.time.addEvent({
          delay: 3000,
          repeat: 9,
          callback: () => {
            var scale = this.timerEvents[1].getRepeatCount();
            console.log(this.timerEvents[1].getRepeatCount());
            this.hpBar.scaleX *= (scale/10);
          },
          callbackScope: this,
        })  
      )
      // // create low_point_food
      this.timerEvents.push(
        this.time.addEvent({
          delay: 1500,
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
          delay: 3000,
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
            delay: 2000,
            loop: true,
            callback: () => {
              var x = Phaser.Math.Between(120, this.gameWidth);
              var y = Phaser.Math.Between(-64, 0);
              
              var bomb = this.bombs.create(x,y,'crumpled_paper').setScale(0.3);
            }
        })
      )
    }

 
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
    // console.log(this.timerEvents[0].getElapsedSeconds());
    // console.log(this.timerEvents[0].getElapsedSeconds().toString().substr(0, 1));
    // console.log(this.timerEvents[0].getElapsedSeconds());
    // this.text.setText('Event.progress: ' + this.timerEvents.getProgress().toString().substr(0, 4));
    var timeEllapsed = Math.round(this.timerEvents[0].getElapsedSeconds());
    // console.log(timeEllapsed);

    this.scoretext.setText(Phaser.Utils.String.Format(this.scoreBoard, [
      this.score +'  PTS',
      30-timeEllapsed+'  s',
  ]));

    this.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
      this.veges.getLength(),
      this.veges.maxSize,
      this.veges.countActive(true),
      this.veges.countActive(false),
      this.veges.getTotalUsed(),
      this.veges.getTotalFree(),
      this.veges.isFull(),
      this.score
    ]));

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

    this.input.on('pointerup', function (pointer, gameobject) {
        if (gameobject === this.playButton && gamerun==1 )
        {
          console.log(gamerun);
          this.scene.pause()  
            // text.setText('Pause All');
        }
        else if (gameobject === this.playButton && gamerun==0)
        {
          console.log(gamerun);
          this.scene.resume()  
            // text.setText('Resume All');
        }
    });


    };

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

  hitBomb(player, bomb) {
    // console.log('hitBomb');
    bomb.disableBody(true, true);
    this.score -= 1;
    this.sound.play("collectFailed");

  }



}