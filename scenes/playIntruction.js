export default class PlayInstruction extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayInstruction' })
    this.doubleClick = 1;
    this.superScale = 1;
  }

  preload() {
    this.width = this.sys.game.canvas.getAttribute("width");
    this.height = this.sys.game.canvas.getAttribute("height");
  }

  create() {
    // Background
    this.add.image(this.width/2, this.height/2, 'background').setScale(this.superScale);
    
    // Sounds
    this.snd_play = this.sound.add('go');
    this.snd_button = this.sound.add('button');
    
    // Menu contents
    this.createContents();
  }

  createContents() {
    const originX = 2000;
    const originY = 2000;
    const snapPadding = 406;

    this.createTappenMenu(originX, originY);
  }

  createTappenMenu(originX, originY) {
    const centerX = originX + 406 / 2;
    const originYbt = originY + 300;

    
    this.add.image(this.width/2, 150, 'logo').setScale(this.superScale);
    this.add.image(this.width/2, 320, 'logoTitle').setScale(0.5);
    this.add.image(this.width/2, this.height/4+85, 'playIntruction').setScale(0.5).setOrigin(0.5,0);
  
  
    this.start_button = this.add.image(this.width/2, this.height-65, 'start_button').setScale(this.superScale).setOrigin(0.5,1).setInteractive();

    this.start_button.on("pointerdown", () => {
      this.snd_button.play();
      this.scene.start("Game");
    });
    
    var maxscale = this.superScale+0.09;
    var minscale = this.superScale;
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