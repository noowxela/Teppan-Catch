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
    console.log(this.sys.game.playerName )

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

    let product = this.add.image(this.width/2, 1440, 'product').setScale(1);
    this.getfromDB();
  }

  update() {
    this.caption.setText(Phaser.Utils.String.Format(this.leaderBoard, [
        '1. DARhhh   100 PTS',
        '2. POL       90 PTS',
        '3. MET       89 PTS',
        '4. DEE       72 PTS'

    ]));

    if(this.sys.input.activePointer.justUp){
        this.scene.start("Reward");
      }

  }
  getfromDB() {

    console.log(this.sys.game.playerName)
    console.log(this.sys.game.playerContact)
    console.log(this.sys.game.playerEmail)
    console.log("score Board start calulate")

    var http_request_2;
    http_request_2 = new XMLHttpRequest();
    http_request_2.onload = function () { 
      console.log(this.responseText);
      console.log(JSON.parse(this.responseText))
    };
    http_request_2.open("GET", "http://localhost/teppan/scoreboard.php");
    http_request_2.withCredentials = false;
    http_request_2.send();


    console.log("score Board data");
  }

}