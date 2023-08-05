
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
          "rank": 1,
          "name": "alee",
          "point": 2568,
          "player_id": 1,
          "email": "em1",
          "contact": "0149101991"
        },
        {
          "rank": 2,
          "name": "dustinpor",
          "point": 888,
          "player_id": 2,
          "email": "em2",
          "contact": "0149101992"

        },
        {
          "rank": 3,
          "name": "jonwee",
          "point": 666,
          "player_id": 3,
          "email": "em3",
          "contact": "0149101993"

        },
        {
          "rank": 4,
          "name": "olivera",
          "point": 456,
          "player_id": 4,
          "email": "em4",
          "contact": "0149101994"

        },
        {
          "rank": 5,
          "name": "theRock",
          "point": 123,
          "player_id": 5,
          "email": "em5",
          "contact": "0149101999"

        }
      ]
    };

    // this.rank ={
    //   "scoreBoard": [
    //     {
    //       "rank": null,
    //       "name": null,
    //       "point": null,
    //       "player_id": null,
    //       "email": null,
    //       "contact": null
    //     },
    //     {
    //       "rank": null,
    //       "name": null,
    //       "point": null,
    //       "player_id": null,
    //       "email": null,
    //       "contact": null

    //     },
    //     {
    //       "rank": null,
    //       "name": null,
    //       "point": null,
    //       "player_id": null,
    //       "email": null,
    //       "contact": null

    //     },
    //     {
    //       "rank": null,
    //       "name": null,
    //       "point": null,
    //       "player_id": null,
    //       "email": null,
    //       "contact": null

    //     },
    //     {
    //       "rank": null,
    //       "name": null,
    //       "point": null,
    //       "player_id": null,
    //       "email": null,
    //       "contact": null

    //     }
    //   ]
    // };

  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    // this.load.html('fbShare', 'src/scenes/fbShare.html');
  }

  create() {
    
    this.pressed = false;
    this.add.image(this.width/2, this.height/2, 'background').setScale(1.3,1.27);
    this.add.image(this.width/2, 150, 'logo').setScale(1);
    this.add.image(this.width/2, 320, 'logoTitle').setScale(0.5);
    this.add.image(this.width/2, 470, 'welcomeTitle').setScale(0.6);

    let scoreboard = this.add.sprite(0, 620, 'scoreboard').setScale(1);
    
    this.tweens.add({ 
        targets: scoreboard,
        x: this.width/2,
        y: 620,
        duration: 3000,
        ease: 'Power2',
        // repeat: -1,            // -1: infinity
    });

    // this.getfromDB();
    this.updateText();
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

    // console.log(this.sys.game.playerName);
    // console.log(this.sys.game.playerContact);
    // console.log(this.sys.game.playerEmail);
    // console.log(this.sys.game.playerScore);

    var oneForAllArray = [this.sys.game.playerName,this.sys.game.playerContact,this.sys.game.playerEmail];
		var playerData = JSON.stringify(oneForAllArray); 
		var encrypted = window.btoa(playerData);

    
		let vm = this;
    var http_request_2;
    http_request_2 = new XMLHttpRequest();
    http_request_2.onload = function () { 
      // console.log(this.responseText);
      // console.log(JSON.parse(this.responseText));
      // console.log(vm.sys.game.playerName);
      // console.log(vm.sys.game.playerName);
      vm.rank = JSON.parse(this.responseText) ;
      console.log(vm.rank);
      vm.updateText();
    };

    // http_request_2.open("POST", "http://localhost/teppan/scoreboard.php");
    
    http_request_2.open("POST", window.location.protocol + "//pepperlunchgame.com/scoreBoard.php");
    http_request_2.withCredentials = false;
    http_request_2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // http_request_2.send("name=" + this.sys.game.playerName + "&contact=" + this.sys.game.playerContact + "&email=" + this.sys.game.playerEmail );
		http_request_2.send("encrypted=" + encrypted );


    // console.log("score Board data");
  }

  updateText(){

    var column_1 =Array(4);
    var column_2 =Array(4);
    var column_3 =Array(4);

    var pRank = Array(4);
    var pName = Array(4);
    var pPoints = Array(4);

    var height = 720;

    for (var i = 0; i < 4; i++) {
      
      column_1[i] = (this.rank.scoreBoard[i].rank) +'. ';
      column_2[i] = this.rank.scoreBoard[i].name;
      column_3[i] = (this.rank.scoreBoard[i].point)+' PTS';

      pRank[i] = this.add.text(this.width/5, height, column_1[i], this.captionStyle).setOrigin(1,0).setDepth(99);
      pName[i] = this.add.text(this.width/4-60, height, column_2[i], this.captionStyle).setOrigin(0,0).setDepth(99);
      pPoints[i] = this.add.text(this.width-100, height, column_3[i], this.captionStyle).setOrigin(1,0).setDepth(99);

      if((this.rank.scoreBoard[i].name == this.sys.game.playerName )
        &&(this.rank.scoreBoard[i].email == this.sys.game.playerEmail)
        &&(this.rank.scoreBoard[i].contact == this.sys.game.playerContact))
      {
          this.redbar = this.add.image(this.width/2, height+45, 'redbar').setScale(1.3).setDepth(0);
          pRank[i].setFill('#FFF200');
          pName[i].setFill('#FFF200');
          pPoints[i].setFill('#FFF200');
      }
      height +=100;
    }   
  }
}