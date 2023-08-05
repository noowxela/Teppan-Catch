export default class Load extends Phaser.Scene {
    constructor() {
        super('load');
    }

    preload() {

        // let logo = this.add.image(centerX, centerY, 'atlas-menu', 'logowhite');
        let logo = this.add.image(centerX, centerY, 'atlas-menu-logo');
        this.text_loading = this.add.text(logo.x, logo.y + 150, 'Loading...', 30)
            .setOrigin(0.5);

        this.load.on('complete', function () {
            // this.scene.start('ScoreBoard');
            this.scene.start('Welcome');
            // this.scene.start('menu');
        }, this);

        // Images
        this.load.atlas('atlas', 'assets/imgs/tetris1080.png', 'assets/imgs/jtetris.json');
        this.load.image('mask', 'assets/imgs/mask.png');
        this.load.image('highscore', 'assets/imgs/highscore.png');

        // Music
        this.load.audio('ingame', 'assets/audio/music/ingame.mp3');
        this.load.audio('gameover', 'assets/audio/music/gameover.mp3');

        // Sound FX
        this.load.audio('button', 'assets/audio/fx/button.wav');
        this.load.audio('explosion', 'assets/audio/fx/explosion.mp3');
        this.load.audio('move', 'assets/audio/fx/move.wav');
        this.load.audio('spin', 'assets/audio/fx/spin.wav');
        this.load.audio('knock', 'assets/audio/fx/knock.mp3');
        this.load.audio('line', 'assets/audio/fx/explode1cc0.mp3');
        this.load.audio('go', 'assets/audio/fx/go.wav');
        this.load.audio('score4', 'assets/audio/fx/score4.wav');
        this.load.audio('levelup', 'assets/audio/fx/levelup.mp3');

        // tappen welcome asset
        this.load.image('background', 'assets/background.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('logoTitle', 'assets/logo-title.png');
        this.load.image('welcomeTitle', 'assets/welcome-title.png');
        this.load.image('playButton', 'assets/play-button.png');
        this.load.image('product', 'assets/product.png');

        
        // tappen instuction asset
        this.load.image('playIntruction', 'assets/play-instruction.png');
        this.load.image('start_button', 'assets/start_button.png');

        // tappen game asset
        this.load.image('heart', 'assets/heart.png');
        this.load.image('timeBase', 'assets/timeBase.png');
        this.load.image('timeBar', 'assets/100bar.png');
        this.load.image('smallbar', 'assets/smallbar.png');
        this.load.image('smallpot', 'assets/smallpot.png');
        this.load.image('gift', 'assets/gift.png');
        
        this.load.image('teppan', 'assets/teppan.png');
        this.load.image('crumpled_paper', 'assets/rubbish.png');
        this.load.image('spoon', 'assets/spoon.png');
    
        this.load.spritesheet('vegepack', 'assets/vegepack.png',
            { frameWidth: 237, frameHeight: 203 }    );
        this.load.spritesheet('meatpack', 'assets/steakv2.png',
            { frameWidth: 222, frameHeight: 127 }    );

        // tappen scoreBoard asset
        this.load.image('scoreboard', 'assets/scoreboard.png');
        this.load.image('redbar', 'assets/redbar.png');

        // tappen Sound FX
        this.load.audio('collectSuccess', ['assets/audios/bubble.wav','assets/audios/bubble.ogg']);
        this.load.audio('collectFailed', ['assets/audios/knockpot.wav','assets/audios/knockpot.ogg']);
        this.load.audio('gameBGM', ['assets/audios/BackgroundMusic01.wav','assets/audios/BackgroundMusic01.ogg']);




        this.load.on('progress', this.updateText, this);

    }

    updateText(progress) {
        this.text_loading.setText(`Loading ... ${Math.round(progress * 100)}%`);
    }
}