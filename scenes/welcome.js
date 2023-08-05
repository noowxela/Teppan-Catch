export default class Welcome extends Phaser.Scene {
  constructor() {
    super({ key: 'Welcome' })
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
  }

  create() {
    this.add.image(this.width/2, this.height/2, 'background').setScale(1);
    // Sounds
    this.snd_play = this.sound.add('go');

    this.createContents();
  }

  
  createContents() {
    const originX = 2000;
    const originY = 2000;
    const snapPadding = 406;

    this.createTappenMenu(originX, originY);
  }

  createTappenMenu(originX, originY) {
    const centerX = originX + 406 / 2;
    const originYbt = originY + 300;

    this.add.image(this.width/2, 230, 'logo').setScale(1);
    this.add.image(this.width/2, 400, 'logoTitle').setScale(0.5);
    this.add.image(this.width/2, 700, 'welcomeTitle').setScale(1);
    this.playButton = this.add.image(this.width/2, 1000, 'playButton').setScale(1).setInteractive();

    // Button play
    this.playButton.on("pointerdown", () => {
      this.snd_play.play();
      this.scene.start("PlayInstruction");
    });
  }

}