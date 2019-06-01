export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
    this.cursors = null;
    this.foods = null;
    this.foobos = null;
    this.foobpack = null;
    this.bombs = null;
    this.score = 0;
    this.caption = null;
    this.captionStyle = {
      fill: '#7fdbff',
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
    this.load.image('space', 'assets/space.jpg');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('teppan', 'assets/teppan.png');
    this.load.image('crumpled_paper', 'assets/crumpled_papera.png');
    this.load.spritesheet('foodpack', 'assets/foodpack.png',
      { frameWidth: 40, frameHeight: 40 }
    );
  }

  create() {
    this.anims.create({
      key: 'creep',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 8 }),
      frameRate: 3,
      repeat: -1
    });

    this.add.image(400, 300, 'space');
    Phaser.Math.Between(-200, 200)

    this.foods = this.physics.add.group({
      defaultKey: 'dude',
      maxSize: 100,
      createCallback: function (dude) {
        dude.setName('dude' + this.getLength());
        console.log('Created', dude.name);
      },
      removeCallback: function (dude) {
        console.log('Removed', dude.name);
      }
    });
    console.log(this.foods)
    console.log('how:');
    console.log(this.score);

    this.bombs = this.physics.add.group();
    this.player = this.physics.add.sprite(400, 500, 'teppan').setScale(0.1);
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    var vm = this
    // create low_point_food
    this.time.addEvent({
      delay: 400,
      loop: true,
      callback: () => {
        var dude = this.foods.get(Phaser.Math.Between(250, 800), Phaser.Math.Between(-64, 0));

        if (!dude) return; // None free

        this.activateAlien(dude);
      }
    });

    // bomb creation
    // this.time.addEvent({
    //     delay: 400,
    //     loop: true,
    //     callback: createBombs
    // });

    this.caption = this.add.text(16, 16, '', this.captionStyle);


    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    this.physics.add.collider(this.player, this.foods, this.collectFood, null, this);
  }

  update() {
    Phaser.Actions.IncY(this.foods.getChildren(), 1);

    this.foods.children.iterate((dude) => {
      if (dude.y > 600) {
        this.foods.killAndHide(dude);
      }
    });

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
      this.player.setVelocityX(-300);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(+200);
    }
    else {
      this.player.setVelocityX(0);
    }
  }

  activateAlien(dude) {
    dude
      .setActive(true)
      .setVisible(true)
      .setTint(Phaser.Display.Color.RandomRGB().color)
      .play('creep');
  }


  creation() {

  }

  collectFood(player, foods) {
    // console.log('collectFood');
    foods.disableBody(true, true);

    this.score += 10;
    // scoreText.setText('Score: ' + score);

    // if (stars.countActive(true) === 0)
    // {
    //     //  A new batch of stars to collect
    //     stars.children.iterate(function (child) {

    //         child.enableBody(true, child.x, 0, true, true);

    //     });

    //     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    //     var bomb = bombs.create(x, 16, 'bomb');
    //     bomb.setBounce(1);
    //     bomb.setCollideWorldBounds(true);
    //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //     bomb.allowGravity = false;

    // }

  }

  hitBomb(player, bomb) {
    console.log('hitBomb');
    bomb.disableBody(true, true);
    this.hp -= 20;
    this.hpText.setText('HP: ' + hp);

    // this.physics.pause();

    // player.setTint(0xff0000);

    // player.anims.play('turn');

    // gameOver = true;

  }
}