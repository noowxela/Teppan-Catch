export default class Register extends Phaser.Scene {
  constructor() {
    super({ key: 'Register' })
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('product', 'assets/product.png');

    this.load.html('nameform', 'assets/login.html');
  }

  create() {
    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3);
    let logo = this.add.image(this.width/2, 230, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 400, 'logoTitle').setScale(1.3);
    let product = this.add.image(this.width/2, 1400, 'product');

    let text = this.add.text(this.width/2, 500, 'User Registeration', {
        fontFamily: 'heavitas',
        fontSize: 36,
        color: "black"
    });
    text.setOrigin(0.5,0.5)

    var element = this.add.dom(400, 600).createFromCache('nameform');

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
  }

}