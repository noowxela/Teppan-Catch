import FormUtil from "../util/formUtil.js"

export default class Register extends Phaser.Scene {
  constructor() {
    super({ key: 'Register' })
    this.name = ""
    this.contact = ""
    this.email = ""
    this.agree = 0;
    this.notice = 0;
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('balck_bg', 'assets/balck_bg.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('checkBox', 'assets/checkBox.png');
    this.load.image('test1', 'assets/test1.png');
    this.load.image('text2', 'assets/text2.png');
    this.load.image('text3', 'assets/text3.png');
    this.load.image('product', 'assets/product.png');
    this.load.image('playButton', 'assets/play-button.png');

  }

  create() {
    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(1.3);
    let balck_bg = this.add.image(this.width/2, this.height/2-110, 'balck_bg').setScale(0.21,0.12);
    let logo = this.add.image(this.width/2, 230, 'logo').setScale(1.3);
    let logoTitle = this.add.image(this.width/2, 400, 'logoTitle').setScale(1.3);
    let checkBox1 = this.add.image(300, 990, 'checkBox').setScale(1).setOrigin(0,0).setInteractive();
    let test1 = this.add.image(350, 990, 'test1').setScale(1).setOrigin(0,0);
    let text2 = this.add.image(492, 1006, 'text2').setScale(1).setOrigin(0,0);
    let text3 = this.add.image(350, 1050, 'text3').setScale(1).setOrigin(0,0);
    let checkBox2 = this.add.image(300, 1050, 'checkBox').setScale(1).setOrigin(0,0).setInteractive();
    let product = this.add.image(this.width/2, 1400, 'product');

    let text = this.add.text(this.width/2, 500, 'User Registeration', {
        fontFamily: 'heavitas',
        fontSize: 36,
        color: "black"
    });
    text.setOrigin(0.5,0.5)


    checkBox1.on('pointerdown', function (pointer) {
      if(this.scene.agree == 0){
        this.setTint(0xff0000);
        this.scene.agree = 1;
      }
      else {
        this.clearTint();
        this.scene.agree = 0;
      }
    });
    checkBox2.on('pointerdown', function (pointer) {

      if(this.scene.notice == 0){
        this.setTint(0xff0000);
        this.scene.notice = 1;
      }
      else {
        this.clearTint();
        this.scene.notice = 0;
      }
    });

    this.formUtil = new FormUtil({
        scene: this,
        rows: 15,
        cols: 15,
        width: this.sys.game.canvas.getAttribute("width"),
        height: this.sys.game.canvas.getAttribute("height"),
    });
    // this.formUtil.showNumbers();

    this.formUtil.scaleToGameW("name", .5);
    this.formUtil.scaleToGameH("name", .03);
    this.formUtil.placeElementAt(82, "name", true, true);
    this.formUtil.addChangeCallback("name", this.nameInputChanged, this);

    this.formUtil.scaleToGameW("contact", .5);
    this.formUtil.scaleToGameH("contact", .03);
    this.formUtil.placeElementAt(97, "contact", true, true);
    this.formUtil.addChangeCallback("contact", this.contactInputChanged, this);

    this.formUtil.scaleToGameW("email", .5);
    this.formUtil.scaleToGameH("email", .03);
    this.formUtil.placeElementAt(112, "email", true, true);
    this.formUtil.addChangeCallback("email", this.emailInputChanged, this);
    

    let playButton = this.add.image(this.width/2, 1150, 'playButton').setInteractive();
    playButton.on("pointerup", () => {
      // Save into db
      this.saveIntoDB();
    });
    
  }
  nameInputChanged() {
    this.name=this.formUtil.getTextAreaValue("name");
    // return null;
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
    
    if(this.contact=="" || this.name == ""|| this.email == "" ){
      alert('Please complete the user detail')
      return;
    }
    if(this.agree == 0 ){
      alert('Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy')
      return;
    }
    console.log(this.name)
    console.log(this.contact)
    console.log(this.email)
    console.log("saving");


    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //     document.getElementById("demo").innerHTML = this.responseText;
    //   }
    // };
    // xhttp.open("POST", "http://localhost/teppan/player.php", true);
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // // xhttp.setRequestHeader("Access-Control-Request-Method", "POST");
    // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhttp.send("name=" + this.name + "&contact=" + this.contact + "&email=" + this.email);

    var http_request;
    http_request = new XMLHttpRequest();
    // http_request.onload = function () { console.log(this.responseText); };
    http_request.open("POST", "http://localhost/teppan/player.php");
    // http_request.open("POST", "X");
    http_request.withCredentials = false;
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.send("name=" + this.name + "&contact=" + this.contact + "&email=" + this.email + "&score=" + 0);
    // http_request.send("name=" + this.name + "&contact=" + this.contact + "&email=" + this.email );

    // var http_request_2;
    // http_request_2 = new XMLHttpRequest();
    // // http_request_2.onload = function () { console.log(this.responseText);console.log(JSON.parse(this.responseText))};
    // http_request_2.open("GET", "http://localhost/teppan/scoreboard.php");
    // // http_request_2.open("GET", "http://localhost/Teppan-Catch/src/scenes/scoreboard.php");
    // http_request_2.withCredentials = false;
    // http_request_2.send();

    console.log("sucessful");
    this.scene.start("PlayInstruction");

  }
}