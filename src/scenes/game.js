export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
    this.cursors = null;
    this.foods = null;
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

    this.load.spritesheet('foodpack', 'assets/foodpack.png',
         { frameWidth: 78, frameHeight: 72 }    );
  }

  create() {
    this.gameWidth = this.sys.game.canvas.getAttribute("width");
    this.gameHeight = this.sys.game.canvas.getAttribute("height");

    this.add.image(
      this.gameWidth/2,
      this.gameHeight/2, 'background').setScale(1.5);

      this.hpBG = this.add.image(250, 100, 'heatlhbar').setScale(0.3);
      this.shpBar = this.add.image(250, 100, '100bar').setScale(0.3);

    this.caption = this.add.text(50, this.gameHeight/4*1, '', this.captionStyle);

    this.bombs = this.physics.add.group({
      // defaultKey: 'foodpack',
      maxSize: 100,
    });
    this.foods = this.physics.add.group({
      defaultKey: 'foodpack',
      maxSize: 100,
    });

    // create player tappen
    this.player = this.physics.add.sprite(this.gameWidth/2, this.gameHeight-200, 'teppan').setScale(0.3);
    this.player.setCollideWorldBounds(true);

    // create low_point_food
    this.time.addEvent({
      delay: 600,
      loop: true,
      callback: () => {
        var foodpack = this.foods.get(
            Phaser.Math.Between(0, this.gameWidth), 
            Phaser.Math.Between(-64, 0),
            'foodpack',Phaser.Math.Between(0, 3)
        );
      }

    });

    // bomb creation
    this.time.addEvent({
        delay: 800,
        loop: true,
        callback: () => {
            var x = Phaser.Math.Between(0, this.gameWidth);
            var y = Phaser.Math.Between(-64, 0);
            
            var bomb = this.bombs.create(x,y,'crumpled_paper').setScale(0.3);
          }        


    });

    this.cursors = this.input.keyboard.createCursorKeys();

    //player collide with bombs and foods
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    this.physics.add.collider(this.player, this.foods, this.collectFood, null, this);
  }

  update() {

    this.caption.setText(Phaser.Utils.String.Format(this.captionTextFormat, [
      this.foods.getLength(),
      this.foods.maxSize,
      this.foods.countActive(true),
      this.foods.countActive(false),
      this.foods.getTotalUsed(),
      this.foods.getTotalFree(),
      this.foods.isFull(),
      this.score
    ]));

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.gameWidth/2);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }

    else {
      this.player.setVelocityX(0);
    }
  }

  collectFood(player, foods) {

    foods.disableBody(false, true);
    this.score += 10;

  }

  hitBomb(player, bomb) {
      
    // console.log('hitBomb');
    bomb.disableBody(true, true);
    this.score -= 10;

  }
}