export default class Prize extends Phaser.Scene {
  constructor() {
    super({ key: 'Prize' })

    this.captionStyle = {
        fill: '#000002',
        fontFamily: 'heavitas',
        fontSize: 80 ,
        lineSpacrring: 6
    };

    this.scoreStlye = {
        fill: '#ee3627',
        fontFamily: 'heavitas',
        fontSize: 133 ,
        lineSpacrring: 6
    };


  }
  

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('reward_1', 'assets/reward/series1-reward-1.png');
    this.load.image('reward_2', 'assets/reward/series1-reward-2.png');
    this.load.image('reward_3', 'assets/reward/series1-reward-3.png');
    // this.load.image('product', 'assets/product.png');
  }

  create() {
    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3);
    let logo = this.add.image(this.width/2, 150, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 320, 'logoTitle').setScale(1.3);
    
    let scoreLV = this.add.text(this.width/2, 420, 'expert level', this.captionStyle).setOrigin(0.5,0);
    let score = this.add.text(this.width/2, 500, '200 PTS', this.scoreStlye).setOrigin(0.5,0);


    let product = this.add.image(this.width/2, this.height, 'reward_1').setScale(1.3).setOrigin(0.5,1);
    // let product = this.add.image(this.width/2, this.height, 'reward_2').setScale(1.3).setOrigin(0.5,1);
    // let product = this.add.image(this.width/2, this.height, 'reward_3').setScale(1.3).setOrigin(0.5,1);

}

}