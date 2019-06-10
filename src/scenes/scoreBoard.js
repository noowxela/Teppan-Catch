
export default class ScoreBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'ScoreBoard' })

    this.captionStyle = {
        fill: '#000002',
        fontFamily: 'heavitas',
        fontSize: 60 ,
        lineSpacing: 20
    };
    this.caption = null;

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
    this.load.image('scoreboard', 'assets/scoreboard.png');
    this.load.image('redbar', 'assets/redbar.png');
    this.load.image('product', 'assets/product.png');
  }
// 
  create() {
    
    this.pressed = false;
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

		let vm = this;
    var http_request_2;
    http_request_2 = new XMLHttpRequest();
    http_request_2.onload = function () { 
      // console.log(this.responseText);
      // console.log(JSON.parse(this.responseText));
      // console.log(vm.sys.game.playerName);
      vm.rank = JSON.parse(this.responseText) ;
      // console.log(vm.rank);
      // console.log(vm.rank.scoreBoard[0]);
      vm.updateText();
    };
    http_request_2.open("POST", "http://localhost/teppan/scoreboard.php");
    http_request_2.withCredentials = false;
    http_request_2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request_2.send("name=" + this.sys.game.playerName );

    // console.log("score Board data");
  }

  updateText(){

    var column_1 =Array(4);
    var column_2 =Array(4);
    var column_3 =Array(4);

    var pRank = Array(4);
    var pName = Array(4);
    var pPoints = Array(4);

    // this.sys.game.playerName ="D99";
    // this.sys.game.playerEmail ="noowxela@yahoo.com";
    // this.sys.game.playerContact ="6585256895";

    var height = 720;
    console.log(this.sys.game.playerName);
    console.log(this.sys.game.playerEmail);
    console.log(this.sys.game.playerContact);

    for (var i = 0; i < 4; i++) {
      
      column_1[i] = this.rank.scoreBoard[i].rank+'. ';
      column_2[i] = this.rank.scoreBoard[i].name;
      column_3[i] = this.rank.scoreBoard[i].point+' PTS';

      pRank[i] = this.add.text(this.width/5+20, height, column_1[i], this.captionStyle).setOrigin(1,0).setDepth(99);
      pName[i] = this.add.text(this.width/4-20, height, column_2[i], this.captionStyle).setOrigin(0,0).setDepth(99);
      pPoints[i] = this.add.text(this.width-100, height, column_3[i], this.captionStyle).setOrigin(1,0).setDepth(99);

      console.log("player"+i +" : "+this.rank.scoreBoard[i].name+", "+this.rank.scoreBoard[i].email+", "+(this.sys.game.playerContact));
      // console.log();
      // console.log();
      // console.log();

      if((this.rank.scoreBoard[i].name == this.sys.game.playerName )
        &&(this.rank.scoreBoard[i].email == this.sys.game.playerEmail)
        &&(this.rank.scoreBoard[i].contact == (this.sys.game.playerContact)))
      {
        console.log("Too gotsay nice");
          this.redbar = this.add.image(this.width/2, height+45, 'redbar').setScale(1.3).setDepth(0);
          pRank[i].setFill('#FFF200');
          pName[i].setFill('#FFF200');
          pPoints[i].setFill('#FFF200');
      }
      height +=100;
    }   
  }
}