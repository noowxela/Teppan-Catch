export default class PlayInstruction extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayInstruction' })
    this.doubleClick = 2;
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('playIntruction', 'assets/play-instruction.png');
  }

  create() {
    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3);
    let logo = this.add.image(this.width/2, 230, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 400, 'logoTitle').setScale(1.3);
    let playIntruction = this.add.image(this.width/2, 1100, 'playIntruction').setScale(1.3);

    // console.log(this.doubleClick);

    var pointer = this.input.activePointer;
    this.input.on('pointerdown',function(pointer){
        
        this.scene.doubleClick -= 1;

        if( this.scene.doubleClick == 0){
            console.log("taptap");
            this.scene.doubleClick = 2;
            this.scene.scene.start("Game");

        }
    });

  }

  update() {
    // something here
  }

}