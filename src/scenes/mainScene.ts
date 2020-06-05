import "phaser";
import { TetrisScene } from "./TetrisScene";
import eventsCenter from './EventsCenter';

export class MainScene extends Phaser.Scene {

  // Define Game Objects
  phaserSprite; 
  wallGroup;
  // Define  keys
  upKey; downKey; leftKey; rightKey

  //Define Buttons
  AKey; BKey; SelectKey; StartKey;

  pause;

  ScreenWidth; ScreenHeight;

  virScreen; // Virtual screen
  
  constructor() {
    super({
      key: "MainScene",
      active: true,
      // visible: false,
    });
  }

  init(): void {
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(0x98d687);

    this.load.image("logo", "../assets/phaser.png");
    this.load.image("gameboy", "../assets/gameboy_white.png");
    console.log('123: ', this.sys.game.canvas.width, this.sys.game.canvas.height);
    this.ScreenWidth = this.sys.game.canvas.width;
    this.ScreenHeight = this.sys.game.canvas.height;
  }
  

  create(): void {
    // render background
    // this.add.image(0, 0, "gameboy").setOrigin(0,0);
    // create keys and buttons
    this.upKey = this.add.rectangle(this.ScreenWidth * 0.05 + 120, this.ScreenHeight*4/5, 120, 120, 0x1391ff).setOrigin(0, 0) as any;
    this.downKey = this.add.rectangle(this.ScreenWidth * 0.05 + 120, this.ScreenHeight*4/5 + 240, 120, 120, 0x1391ff).setOrigin(0, 0) as any;
    this.leftKey = this.add.rectangle(this.ScreenWidth * 0.05, this.ScreenHeight*4/5 + 120, 120, 120, 0x1391ff).setOrigin(0, 0) as any;
    this.rightKey = this.add.rectangle(this.ScreenWidth * 0.05 + 240, this.ScreenHeight*4/5 + 120, 120, 120, 0x1391ff).setOrigin(0,0) as any;
    this.AKey = this.add.circle(this.ScreenWidth * 0.7 + 180, this.ScreenHeight*4/5 + 120, 60, 0x1391ff);
    this.BKey = this.add.circle(this.ScreenWidth * 0.7 + 60, this.ScreenHeight*4/5 + 240, 60, 0x1391ff);
    this.SelectKey = this.add.rectangle(this.ScreenWidth/2 - 140, this.ScreenHeight - 60, 120, 30, 0x1391ff).setOrigin(0, 0);
    this.StartKey = this.add.rectangle(this.ScreenWidth/2 + 20, this.ScreenHeight - 60, 120, 30, 0x1391ff).setOrigin(0, 0);
    // config and bind keys and buttons
    this.upKey.setInteractive();
    this.downKey.setInteractive();
    this.leftKey.setInteractive();
    this.rightKey.setInteractive();
    this.SelectKey.setInteractive();
    this.StartKey.setInteractive();
    
    this.upKey.on('pointerover', () => { this.up()});
    this.downKey.on('pointerover', () => { this.down()});
    this.leftKey.on('pointerover', () => { this.left()});
    this.rightKey.on('pointerover', () => { this.right()});
    this.SelectKey.on('pointerover', () => { this.select()});
    this.StartKey.on('pointerover', () => { this.start()});

    // add keys and buttons
    this.add.existing(this.upKey);
    this.add.existing(this.downKey);
    this.add.existing(this.leftKey);
    this.add.existing(this.rightKey);

    // Add virtual screen
    this.virScreen = this.add.rectangle(this.ScreenWidth * 0.05, this.ScreenWidth * 0.05, 
                    (this.ScreenWidth - this.ScreenWidth * 0.05 * 2), this.ScreenHeight * 2 / 3, 0x1391ff).setOrigin(0,0);
    this.add.existing(this.virScreen);
  }

  public up(){
    console.log('up key press');
    eventsCenter.emit('up_key', 1);
  }
  public down(){
    console.log('down key press');
    eventsCenter.emit('down_key', 1);
  }
  public left(){
    console.log('left key press');
    eventsCenter.emit('left_key', 1);
  }
  public right(){
    console.log('right key press');
    eventsCenter.emit('right_key', 1);
  }
  public select(){
    console.log('select key press');
    eventsCenter.emit('select_key', 1);
  }
  public start(){
    console.log('start key press');
    eventsCenter.emit('start_key', 1);
    this.scene.add('TetrisScene', TetrisScene, true, 
                    {'up': this.up,
                    'down': this.down,
                    'left': this.left,
                    'right': this.right,
                    'select': this.select,
                    'start': this.start,
                    'virScreen': this.virScreen,});
  }


  update(): void {
    // test purpose
    // const cursorKeys = this.input.keyboard.createCursorKeys(); 
    // if (cursorKeys.up.isDown) {
    //   this.phaserSprite.body.setVelocityY(-500);
    // } else if (cursorKeys.down.isDown) {
    //   this.phaserSprite.body.setVelocityY(500);
    // } else {
    //   this.phaserSprite.body.setVelocityY(0);
    // }
    // if (cursorKeys.right.isDown) {
    //   this.phaserSprite.body.setVelocityX(500);
    // } else if (cursorKeys.left.isDown) {
    //   this.phaserSprite.body.setVelocityX(-500);
    // } else {
    //   this.phaserSprite.body.setVelocityX(0);
    // }
  }
}
