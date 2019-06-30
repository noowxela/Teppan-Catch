export default class Prize extends Phaser.Scene {
  constructor() {
    super({ key: 'Reward' })

    this.doubleClick = 2;

    this.captionStyle = {
        fill: '#FFFFFF',
        fontFamily: 'heavitas',
        fontSize: 50 ,
        lineSpacrring: 6
    };

    this.scoreStlye = {
        fill: '#ee3627',
        fontFamily: 'heavitas',
        fontSize: 90 ,
        lineSpacrring: 6
    };


  }
  

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('reward_background', 'assets/reward_background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('shareButton', 'assets/share_button.png');
    this.load.image('play_again', 'assets/play_again.png');

    this.load.image('set1_normalProduct', 'assets/reward/set1_normalProduct.png');
    this.load.image('set1_expertProduct', 'assets/reward/set1_expertProduct.png');
    this.load.image('reward_1', 'assets/reward/set1_reward1.png');
    this.load.image('reward_2', 'assets/reward/set1_reward2.png');
    this.load.image('reward_3', 'assets/reward/set1_reward3.png');
    this.load.image('shareButton', 'srr/scenes/shareButton.png');

  }

  create() {
    // document.getElementById('fb-share-button').style.pointerEvents = "all";
    // document.getElementById('fb-share-button').style.opacity = "1";
    var rewardScale = 0.85;

    let background = this.add.image(this.width/2, this.height/2, 'reward_background').setScale(1.3);
    let logo = this.add.image(this.width/2, 150, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 300, 'logoTitle').setScale(1.2);


    if (this.sys.game.playerScore <=50){
      // console.log("reward one");
      this.scoreLV = this.add.text(this.width/2, 420, 'rookie level', this.captionStyle).setOrigin(0.5,0);
      this.score = this.add.text(this.width/2, 490, this.sys.game.playerScore+' PTS', this.scoreStlye).setOrigin(0.5,0);
      
      this.product = this.add.image(this.width/2, this.height, 'set1_normalProduct').setScale(0.85).setOrigin(0.5,1);
      this.reward = this.add.image(this.width/2, this.height/2+50, 'reward_1').setScale(rewardScale).setOrigin(0.5,0.5);

      this.sendEmail(this.sys.game.playerEmail,this.sys.game.playerName,"Gift 1")
    }else if(this.sys.game.playerScore <=100){
      // console.log("reward 2");
      this.scoreLV = this.add.text(this.width/2, 350, 'intermediate \n       level', this.captionStyle).setOrigin(0.5,0);
      this.score = this.add.text(this.width/2, 490, this.sys.game.playerScore+' PTS', this.scoreStlye).setOrigin(0.5,0);
      
      this.product = this.add.image(this.width/2, this.height, 'set1_normalProduct').setScale(0.85).setOrigin(0.5,1);
      this.reward = this.add.image(this.width/2, this.height/2+50, 'reward_2').setScale(rewardScale).setOrigin(0.5,0.5);
      this.sendEmail(this.sys.game.playerEmail,this.sys.game.playerName,"Gift 2")
    }else{
      // console.log("reward 3");
      this.scoreLV = this.add.text(this.width/2, 420, 'expert level', this.captionStyle).setOrigin(0.5,0);
      this.score = this.add.text(this.width/2, 490, this.sys.game.playerScore+' PTS', this.scoreStlye).setOrigin(0.5,0);
      
      this.product = this.add.image(this.width/2, this.height, 'set1_expertProduct').setScale(0.85).setOrigin(0.5,1);
      this.reward = this.add.image(this.width/2, this.height/2+50, 'reward_3').setScale(rewardScale).setOrigin(0.5,0.5);
      this.sendEmail(this.sys.game.playerEmail,this.sys.game.playerName,"Gift 3")
    }

    var maxscale = rewardScale+0.06;
		var minscale = rewardScale;
    var scale = minscale;
    var larOrSma = 0;
    this.time.addEvent({
      delay: 200,
      // repeat: 30,
      callback: () => {
        if(larOrSma ==0 ){
          this.reward.setScale(scale);
          scale += 0.005;
          // console.log(scale);
          if(scale >1.06){
            larOrSma =1 ;
          }
        }else if(larOrSma==1){
          this.reward.setScale(scale);
          scale -= 0.005;
          if(scale <1){
            larOrSma =0 ;
          }

        }
      },
      callbackScope: this,
      loop: -1
    }) 


    // let pointer = this.input.activePointer;
    // this.input.on('pointerup',function(pointer){
        
    //     this.scene.doubleClick -= 1;

    //     if( this.scene.doubleClick == 0){
    //         // console.log("taptap");
    //         this.scene.doubleClick = 2;
    //         window.location = window.location;

    //     }else{
    //     }
    
    // });

    console.log(this.height);

    this.shareButton = this.add.image(this.width-this.width/2/2/2-40, this.height-300, 'shareButton').setScale(0.6).setInteractive();
    this.play_again = this.add.image(this.width/2/2+60, this.height-300, 'play_again').setScale(1.3).setOrigin(1,0.5).setInteractive();

    var maxscale_shareButton = 0.69;
    var minscale_shareButton = 0.6;
    var scale_shareButton = minscale_shareButton ;
    var larOrSma_shareButton = 0;

    var maxscale_play_again = 1.39;
    var minscale_play_again = 1.3;
    var scale_play_again = minscale_play_again ;
    var larOrSma_play_again = 0;
    this.time.addEvent({
      delay: 200,
      // repeat: 30,
      callback: () => {
        if(larOrSma_shareButton ==0 ){
          this.shareButton.setScale(scale_shareButton);
          scale_shareButton += 0.005;
          if(scale_shareButton >maxscale_shareButton){
            larOrSma_shareButton =1 ;
          }
        }else if(larOrSma_shareButton==1){
          this.shareButton.setScale(scale_shareButton);
          scale_shareButton -= 0.005;
          if(scale_shareButton <minscale_shareButton){
            larOrSma_shareButton =0 ;
          }
        }
        if(larOrSma_play_again ==0 ){
          this.play_again.setScale(scale_play_again);
          scale_play_again += 0.005;
          if(scale_play_again >maxscale_play_again){
            larOrSma_play_again =1 ;
          }
        }else if(larOrSma_play_again==1){
          this.play_again.setScale(scale_play_again);
          scale_play_again -= 0.005;
          if(scale_play_again <minscale_play_again){
            larOrSma_play_again =0 ;
          }
        }
      },
      callbackScope: this,
      loop: -1
    }) 




    this.shareButton.on("pointerup", () => {
      // window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fpepperlunchgame.com%2F&amp;src=sdkpreparse","_blank")
      window.open("https://www.pepperlunchgame.com/share.html","_blank")
    });
    this.play_again.on("pointerup", () => {
      window.location = window.location;
    });

    
  }

  update(){
    // var d = new Date;
    // // var t = d.getTime();
    // var s = d.getSeconds();
    // // console.log(s);
    // // console.log(Math.sin(t));
    // // console.log(Math.sin(s));

    // // this.product.scaleX *= (1);
    // // this.product.scaleY *= (1);
    // // image.scaleY *= ;
    // // image.rotation += 0.04
  }

  sendEmail(email,name,gift){
    let http_request = new XMLHttpRequest();
    http_request.onload = function () { console.log(this.responseText) };
    http_request.open("POST", window.location.protocol + "//pepperlunchgame.com/game.php");
    // http_request.open("POST", "http://localhost/teppan/sendEmail.php");
    http_request.withCredentials = false;
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.send("email=" + email + "&name=" + name + "&gift=" + gift );
  }
}