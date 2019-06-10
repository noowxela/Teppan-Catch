export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'ScoreBoard' })

    this.captionStyle = {
        fill: '#000002',
        fontFamily: 'heavitas',
        fontSize: 80 ,
        lineSpacing: 20
    };
    this.caption = null;
    this.pressed = false;

    this.rank ={
      "scoreBoard": [
        {
          "rank": null,
          "name": null,
          "point": null,
          "player_id": null,
          "email": null,
          "contact": null
        },
        {
          "rank": null,
          "name": null,
          "point": null,
          "player_id": null,
          "email": null,
          "contact": null

        },
        {
          "rank": null,
          "name": null,
          "point": null,
          "player_id": null,
          "email": null,
          "contact": null

        },
        {
          "rank": null,
          "name": null,
          "point": null,
          "player_id": null,
          "email": null,
          "contact": null

        },
        {
          "rank": null,
          "name": null,
          "point": null,
          "player_id": null,
          "email": null,
          "contact": null

        }
      ]
    };

  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('welcomeTitle', 'assets/welcome-title.png');
    // this.load.image('playButton', 'assets/play-button.png');
    this.load.image('scoreboard', 'assets/scoreboard.png');
    this.load.image('redbar', 'assets/redbar.png');
    this.load.image('product', 'assets/product.png');

  }
// 
  create() {

    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3,1.27);
    let logo = this.add.image(this.width/2, 150, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 320, 'logoTitle').setScale(1.3);

    let welcomeTitle = this.add.image(this.width/2, 470, 'welcomeTitle').setScale(0.6);
    let scoreboard = this.add.sprite(0, 620, 'scoreboard').setScale(1.3);
    
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

    if(this.sys.input.activePointer.justDown){
        this.pressed = true;
      }

    if(this.sys.input.activePointer.justUp && this.pressed){
        this.scene.start("Reward");
      }

  }
  getfromDB() {

    // console.log("score Board start calulate")
		let vm = this;
    var http_request_2;
    http_request_2 = new XMLHttpRequest();
    http_request_2.onload = function () { 
      // console.log(this.responseText);
      // console.log(JSON.parse(this.responseText));
      // console.log(vm.sys.game.playerName);
      vm.rank = JSON.parse(this.responseText) ;
      console.log(vm.rank);
      // console.log(vm.rank.scoreBoard[0]);
      vm.updateText();
    };
    http_request_2.open("POST", "http://localhost/teppan/scoreboard.php");
    http_request_2.withCredentials = false;
    http_request_2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request_2.send("name=" + this.sys.game.playerName );

    console.log("score Board data");
    // console.log(this.rank);
  }

  updateText(){
    var top =Array(4);
    var playerRank = Array(4);
    var height = 720;
    console.log(this.sys.game.playerName);
    console.log(this.sys.game.playerEmail);
    console.log(this.sys.game.playerContact);
    console.log(this.sys.game.playerScore);
    // consoloe.log(this.sys.game.playerContact);
    // consoloe.log(this.sys.game.playerContact);
    // consoloe.log(this.sys.game.playerContact);
    for (var i = 0; i < 4; i++) {
      
      top[i] = this.rank.scoreBoard[i].rank+'. '+ this.rank.scoreBoard[i].name+' \t'+this.rank.scoreBoard[i].point+'  PTS';
      playerRank[i] = this.add.text(this.width/2, height, top[i], this.captionStyle).setOrigin(0.5,0).setDepth(99);

      if((this.rank.scoreBoard[i].name == this.sys.game.playerName )
        &&(this.rank.scoreBoard[i].email == this.sys.game.playerEmail)
        &&(this.rank.scoreBoard[i].contact == this.sys.game.playerContact))
      {
          this.redbar = this.add.image(this.width/2, height+45, 'redbar').setScale(1.3).setDepth(0);
          playerRank[i].setFill('#FFF200');
      }
      height +=100;
    }    
  }
}