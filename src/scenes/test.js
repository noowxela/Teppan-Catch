export default class Test extends Phaser.Scene {
    constructor() {

    super({ key: 'Test' })
      
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
        this.load.image('reward_1', 'assets/reward/series1-reward-1.png');
        this.load.image('reward_2', 'assets/reward/series1-reward-2.png');
        this.load.image('reward_3', 'assets/reward/series1-reward-3.png');
        // this.load.image('product', 'assets/product.png');
        
        this.load.image('playButton', 'assets/play-button.png');
        // this.load.spritesheet('playButton', 'assets/play-button.png',{frameWidth: 438,frameHeight: 76 } );

    }

    create() {

    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3);
    let logo = this.add.image(this.width/2, 150, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 320, 'logoTitle').setScale(1.3);

    let scoreLV = this.add.text(this.width/2, 420, 'expert levvel', this.captionStyle).setOrigin(0.5,0);
    let score = this.add.text(this.width/2, 500, '200 PTS', this.scoreStlye).setOrigin(0.5,0);

    let sprite = this.add.sprite(this.width/2, this.height/2, 'playButton').setInteractive();

        sprite.on('pointerdown', function (pointer) {
        console.log("pointerdown");
            // this.scene.resume();
            this.setTint(0xff0000);

        });
        sprite.on('pointerout', function (pointer) {
        console.log("pointerout");

            this.clearTint();

        });
        sprite.on('pointerOver', function (pointer) {
        console.log("pointerOver");

            this.clearTint();

        });

        sprite.on('pointerup', function (pointer) {
        console.log("pointerup");

            this.clearTint();


        });
        
        
        var pointer = this.input.activePointer;
        this.input.on('pointerdown',function(pointer){
            
            // console.log("this scene :"+this.scene.doubleClick);
            // console.log(doubleClick);
            this.scene.doubleClick -= 1;

            if( this.scene.doubleClick == 0){
                console.log("taptap");
                background.alpha = (background.alpha === 0.5) ? 1 : 0.5;
                this.scene.doubleClick = 2;
            }else{
                // console.log("tap");

                // this.scene.doubleClick -= 1;
            }
        
        });
    // this.input.
        // var myFancySprite = this.add.sprite(500, 1000, 'playButton');
        // myFancySprite.inputEnabled = true;
        // myFancySprite.events.onInputDown.add(tapHandler, this);

    }    
  
}