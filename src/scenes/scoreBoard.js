export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'ScoreBoard' })

    this.captionStyle = {
        fill: '#000002',
        fontFamily: 'heavitas',
        fontSize: 80 ,
        lineSpacrring: 6
    };

    this.leaderBoard = (
        '%1\n' +
        '%2\n' +
        '%3\n' +
        '%4\n' 
        );
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
    this.load.image('scoreboard', 'assets/scoreboard.png');

  }
// 
  create() {
    
    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3,1.27);
    // let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3,1.3);
    let logo = this.add.image(this.width/2, 150, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 320, 'logoTitle').setScale(1.3);

    let welcomeTitle = this.add.image(this.width/2, 470, 'welcomeTitle').setScale(0.6);
    let scoreboard = this.add.sprite(0, 620, 'scoreboard').setScale(1.3);

    this.caption = this.add.text(this.width/2, 720, '', this.captionStyle).setOrigin(0.5,0);
    
    this.tweens.add({ 
        targets: scoreboard,
        x: this.width/2,
        y: 620,
        duration: 3000,
        ease: 'Power2',
        // repeat: -1,            // -1: infinity
    });

    // let playButton = this.add.sprite(this.width/2, 1000, 'playButton').setScale(1.3).setInteractive();
    // playButton.on("pointerup", () => {
    //   this.scene.start("PlayInstruction");
    // });

    let product = this.add.image(this.width/2, 1440, 'product').setScale(1);
    console.log(this.height);
    // console.log(this.scene.Game.score);
  }

  update() {
    this.caption.setText(Phaser.Utils.String.Format(this.leaderBoard, [
        '1. DAR      100 PTS',
        '2. POL       90 PTS',
        '3. MET       89 PTS',
        '4. DEE       72 PTS'

    ]));

    if(this.sys.input.activePointer.justUp){
        this.scene.start("Prize");
      }

  }


}