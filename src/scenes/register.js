import FormUtil from "../util/formUtil.js"

export default class Register extends Phaser.Scene {
  constructor() {
    super({ key: 'Register' })
    this.name = ""
    this.contact = ""
    this.email = ""
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('product', 'assets/product.png');
    this.load.image('playButton', 'assets/play-button.png');

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

    let playButton = this.add.image(this.width/2, 1100, 'playButton').setInteractive();

    playButton.on("pointerup", () => {
      this.saveIntoDB();
      // Save into db
      // this.scene.start("PlayInstruction");
    });


    this.formUtil = new FormUtil({
        scene: this,
        rows: 15,
        cols: 15,
        width: this.sys.game.canvas.getAttribute("width"),
        height: this.sys.game.canvas.getAttribute("height"),
    });
    this.formUtil.scaleToGameW("name", .5);
    this.formUtil.scaleToGameH("name", .03);
    this.formUtil.placeElementAt(82, "name", true, true);
    // this.formUtil.addChangeCallback("name", this.nameInputChanged, this);

    this.formUtil.scaleToGameW("contact", .5);
    this.formUtil.scaleToGameH("contact", .03);
    this.formUtil.placeElementAt(97, "contact", true, true);
    // this.formUtil.addChangeCallback("contact", this.contactInputChanged, this);

    this.formUtil.scaleToGameW("email", .5);
    this.formUtil.scaleToGameH("email", .03);
    this.formUtil.placeElementAt(112, "email", true, true);
    // this.formUtil.addChangeCallback("email", this.emailInputChanged, this);



  }
  nameInputChanged() {
    this.name=this.formUtil.getTextAreaValue("name");
  }
  contactInputChanged() {
    this.contact=this.formUtil.getTextAreaValue("contact");
  }
  emailInputChanged() {
    this.email=this.formUtil.getTextAreaValue("email");
  }

  saveIntoDB() {
    this.contact=this.formUtil.getTextAreaValue("contact");
    this.name=this.formUtil.getTextAreaValue("name");
    this.email=this.formUtil.getTextAreaValue("email");


    console.log(this.name)
    console.log(this.contact)
    console.log(this.email)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    xhttp.open("POST", "http://localhost/teppan/player.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xhttp.setRequestHeader("Access-Control-Request-Method", "POST");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send("name=" + this.name + "&contact=" + this.contact + "&email=" + this.email);
  }
}