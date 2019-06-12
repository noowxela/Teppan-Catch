export default class PlayInstruction extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayInstruction' })
    this.doubleClick = 1;
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
    this.load.image('background', 'assets/background.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('logoTitle', 'assets/logo-title.png');
    this.load.image('playIntruction', 'assets/play-instruction.png');
		this.load.image('start_button', 'assets/start_button.png');
  }

  create() {
    var superScale = 1.2;

    let background = this.add.image(this.width/2, this.height/2, 'background').setScale(superScale);
    let logo = this.add.image(this.width/2, 150, 'logo').setScale(superScale);
    let logoTitle = this.add.image(this.width/2, 320, 'logoTitle').setScale(superScale);
    let playIntruction = this.add.image(this.width/2, this.height/4+85, 'playIntruction').setScale(0.9).setOrigin(0.5,0);
    
    
    this.start_button = this.add.image(this.width/2, this.height-65, 'start_button').setScale(superScale).setOrigin(0.5,1).setInteractive();

		this.start_button.on("pointerup", () => {
      this.scene.start("Game");
    });
    
    var maxscale = superScale+0.09;
		var minscale = superScale;
		var scale = minscale;
		var larOrSma = 0;
		// this.playButton.setScale(scale);
		this.time.addEvent({
		  delay: 200,
		  // repeat: 30,
		  callback: () => {
			if(larOrSma ==0 ){
			  this.start_button.setScale(scale);
			  scale += 0.005;
			  // console.log(scale);
			  if(scale >maxscale){
				larOrSma =1 ;
			  }
			}else if(larOrSma==1){
			  this.start_button.setScale(scale);
			  scale -= 0.005;
			  if(scale <minscale){
				larOrSma =0 ;
			  }
	  
			}
		  },
		  callbackScope: this,
		  loop: -1
		}) 
    // var pointer = this.input.activePointer;
    // this.input.on('pointerdown',function(pointer){
        
    //     this.scene.doubleClick -= 1;

    //     if( this.scene.doubleClick == 0){
    //         // console.log("taptap");
    //         this.scene.doubleClick = 1;

    //     }
    // });

  }

  update() {
    // something here
  }

}