export default class Welcome extends Phaser.Scene {
  constructor() {
    super({ key: 'Welcome' })
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('welcomeTitle', 'assets/welcome-title.png');
    this.load.image('playButton', 'assets/play-button.png');
    this.load.image('product', 'assets/product.png');
  }

  create() {
    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3);
    let logo = this.add.image(this.width/2, 230, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 400, 'logoTitle').setScale(1.3);
    let welcomeTitle = this.add.image(this.width/2, 700, 'welcomeTitle').setScale(1.3);
    let playButton = this.add.sprite(this.width/2, 1000, 'playButton').setScale(1.3).setInteractive();

    playButton.alpha = 0;

    this.tweens.add({ 
      targets: playButton,
      x: this.width/2,
      y: 620,
      duration: 3000,
      ease: 'Power2',
      repeat: -1,     // -1: infinity
      props:   { alpha: 1 }       
  });

    playButton.on("pointerup", () => {
      this.scene.start("PlayInstruction");
      // this.scene.start("Register");
    });


    let product = this.add.image(this.width/2, 1400, 'product');


    
  }

}