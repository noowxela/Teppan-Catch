export default class Register extends Phaser.Scene {
  constructor() {
    super({ key: 'Register' })
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('product', 'assets/product.png');


  }

  create() {
    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3);
    let logo = this.add.image(this.width/2, 230, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 400, 'logoTitle').setScale(1.3);
    let product = this.add.image(this.width/2, 1400, 'product');

    let text = this.add.text(this.width/2, 500, 'User Registeration', {
        fontFamily: 'heavitas',
        fontSize: 36,
        color: "black"
    });
    text.setOrigin(0.5,0.5)
  }

}