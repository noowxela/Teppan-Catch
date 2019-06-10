export default class Prize extends Phaser.Scene {
  constructor() {
    super({ key: 'Reward' })

    this.doubleClick = 2;

    this.captionStyle = {
        fill: '#000002',
        fontFamily: 'heavitas',
        fontSize: 80 ,
        lineSpacrring: 6
    };

    this.scoreStlye = {
        fill: '#ee3627',
        fontFamily: 'heavitas',
        fontSize: 133 ,
        lineSpacrring: 6
    };


  }
  

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');

    this.load.image('set1_normalProduct', 'assets/reward/set1_normalProduct.png');
    this.load.image('set1_expertProduct', 'assets/reward/set1_expertProduct.png');
    this.load.image('reward_1', 'assets/reward/set1_reward1.png');
    this.load.image('reward_2', 'assets/reward/set1_reward2.png');
    this.load.image('reward_3', 'assets/reward/set1_reward3.png');

  }

  create() {
    // var s = time ;

    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3);
    let logo = this.add.image(this.width/2, 150, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 300, 'logoTitle').setScale(1.3);
    
    // this.sys.game.playerScore = 100;

    // let product = this.add.image(this.width/2, this.height, 'reward_1').setScale(0.5).setOrigin(0.5,1);
    console.log(this.sys.game.playerScore);

    if (this.sys.game.playerScore <150){
      console.log("reward one");
      this.scoreLV = this.add.text(this.width/2, 420, 'rookie level', this.captionStyle).setOrigin(0.5,0);
      this.score = this.add.text(this.width/2, 500, this.sys.game.playerScore+' PTS', this.scoreStlye).setOrigin(0.5,0);
      
      this.product = this.add.image(this.width/2, this.height, 'set1_normalProduct').setScale(1.3).setOrigin(0.5,1);
      this.reward = this.add.image(this.width/2, this.height/2, 'reward_1').setScale(1.3).setOrigin(0.5,0.5);
    }else if(this.sys.game.playerScore <200){
      console.log("reward 2");
      this.scoreLV = this.add.text(this.width/2, 350, 'intermediate \n       level', this.captionStyle).setOrigin(0.5,0);
      this.score = this.add.text(this.width/2, 500, this.sys.game.playerScore+' PTS', this.scoreStlye).setOrigin(0.5,0);
      
      this.product = this.add.image(this.width/2, this.height, 'set1_normalProduct').setScale(1.3).setOrigin(0.5,1);
      this.reward = this.add.image(this.width/2, this.height/2, 'reward_2').setScale(1.3).setOrigin(0.5,0.5);

    }else{
      console.log("reward 3");
      this.scoreLV = this.add.text(this.width/2, 420, 'expert level', this.captionStyle).setOrigin(0.5,0);
      this.score = this.add.text(this.width/2, 500, this.sys.game.playerScore+' PTS', this.scoreStlye).setOrigin(0.5,0);
      
      this.product = this.add.image(this.width/2, this.height, 'set1_expertProduct').setScale(1.3).setOrigin(0.5,1);
      this.reward = this.add.image(this.width/2, this.height/2, 'reward_3').setScale(1.3).setOrigin(0.5,0.5);

    }
    var scale = 1.3;
    var larOrSma = 0;
    this.time.addEvent({
      delay: 200,
      // repeat: 30,
      callback: () => {
        if(larOrSma ==0 ){
          this.reward.setScale(scale);
          scale += 0.005;
          // console.log(scale);
          if(scale >1.39){
            larOrSma =1 ;
          }
        }else if(larOrSma==1){
          this.reward.setScale(scale);
          scale -= 0.005;
          if(scale <1.3){
            larOrSma =0 ;
          }

        }
      },
      callbackScope: this,
      loop: -1
    }) 


    let pointer = this.input.activePointer;
    this.input.on('pointerup',function(pointer){
        
        this.scene.doubleClick -= 1;

        if( this.scene.doubleClick == 0){
            console.log("taptap");
            this.scene.doubleClick = 2;
            this.scene.scene.start("Welcome");

        }else{
        }
    
    });
}

  update(){
    var d = new Date;
    // var t = d.getTime();
    var s = d.getSeconds();
    // console.log(s);
    // console.log(Math.sin(t));
    // console.log(Math.sin(s));

    // this.product.scaleX *= (1);
    // this.product.scaleY *= (1);
    // image.scaleY *= ;
    // image.rotation += 0.04
  }
}