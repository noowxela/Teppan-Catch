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
    // <<<<<<< HEAD
    // var element = this.add.dom(400, 600).createFromCache('nameform');

    // element.setPerspective(800);

    // element.addListener('click');

    // element.on('click', function (event) {

    //     if (event.target.name === 'loginButton')
    //     {
    //         var inputUsername = this.getChildByName('username');
    //         var inputPassword = this.getChildByName('password');

    //         //  Have they entered anything?
    //         if (inputUsername.value !== '' && inputPassword.value !== '')
    //         {
    //             //  Turn off the click events
    //             this.removeListener('click');

    //             //  Tween the login form out
    //             this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

    //             this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
    //                 onComplete: function ()
    //                 {
    //                     element.setVisible(false);
    //                 }
    //             });

    //             //  Populate the text with whatever they typed in as the username!
    //             text.setText('Welcome ' + inputUsername.value);
    //         }
    //         else
    //         {
    //             //  Flash the prompt
    //             this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
    //         }
    //     }

    // });

    // this.tweens.add({
    //     targets: element,
    //     y: 300,
    //     duration: 3000,
    //     ease: 'Power3'
    // });
    // >>>>>>> bc415ca08141310e3ef870917df03e0c8ff77645

}