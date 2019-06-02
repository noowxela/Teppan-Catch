export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
    this.cursors = null;
    this.pointer = null;
    this.veges = null;
    this.meats = null;
    this.bombs = null;
    this.hpBar = null;
    this.hpBG = null;
    this.score = 0;
    this.gameWidth = null;
    this.gameHeight= null;
    this.caption = null;

    this.captionStyle = {
      fill: '#000000',
      fontFamily: 'monospace',
      lineSpacing: 4
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

    this.load.audio('collectSuccess', ['assets/audios/bubble.wav']);
    this.load.audio('collectFailed', ['assets/audios/knockpot.wav']);
  }

  create() {

    //get canvas size
    this.gameWidth = this.sys.game.canvas.getAttribute("width");
    this.gameHeight = this.sys.game.canvas.getAttribute("height");

    this.add.image(
      this.gameWidth/2,
      this.gameHeight/2, 'background').setScale(1.5);

      // this.hpBG = this.add.image(250, 100, 'heatlhbar').setScale(0.3);
      // this.hpBar = this.add.image(250, 100, '100bar').setScale(0.3);

    // foods produce logic
    // this.caption = this.add.text(50, this.gameHeight/4*1, '', this.captionStyle);

    this.bombs = this.physics.add.group({
      // defaultKey: 'foodpack',
      maxSize: 100,
    });
    this.veges = this.physics.add.group({
      defaultKey: 'vegepack',
      maxSize: 1000,
    });
    this.meats = this.physics.add.group({
      defaultKey: 'meatpack',
      maxSize: 1000,
    });

    // create player tappen
    this.player = this.physics.add.sprite(this.gameWidth/2, this.gameHeight-200, 'teppan').setScale(0.2);
    this.player.setCollideWorldBounds(true);

    // create low_point_food
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

    });
    // create high_point_food
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

    });

    // bomb creation
    this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
            var x = Phaser.Math.Between(120, this.gameWidth);
            var y = Phaser.Math.Between(-64, 0);
            
            var bomb = this.bombs.create(x,y,'crumpled_paper').setScale(0.3);
          }        


    });

    this.cursors = this.input.keyboard.createCursorKeys();

    //player collide with bombs and foods
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    this.physics.add.collider(this.player, this.veges, this.collectVeges, null, this);
    this.physics.add.collider(this.player, this.meats, this.collectMeats, null, this);
  }

  update() {

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
      this.player.setVelocityX(-this.gameWidth/4*3);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.gameWidth/4*3);
    }

    else {
      this.player.setVelocityX(0);
    }
    
    this.pointer = this.input.activePointer;
    if (this.pointer.isDown) {


      // console.log('DOWN');
      console.log("touch location :"+this.pointer.x);
      console.log("tappen location :"+this.player.x);

      var touchPoint = this.pointer.x;
      var tappen_location = this.player.x;

      if (touchPoint<tappen_location){
        this.player.setVelocityX(-this.gameWidth/4*3);
      }
      else if (touchPoint>tappen_location){
        this.player.setVelocityX(this.gameWidth/4*3);
      }
      else if(touchPoint == tappen_location){
        this.player.setVelocityX(0);

      }


    };
  }

  collectVeges(player, veges) {

    veges.disableBody(false, true);
    this.score += 10;
    this.sound.play("collectSuccess");

  }
  collectMeats(player, meats) {

    meats.disableBody(false, true);
    this.score += 30;
    this.sound.play("collectSuccess");

  }

  hitBomb(player, bomb) {
      
    // console.log('hitBomb');
    bomb.disableBody(true, true);
    this.score -= 10;
    this.sound.play("collectFailed");

  }
}