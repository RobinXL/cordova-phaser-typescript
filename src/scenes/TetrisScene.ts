import "phaser";

import eventsCenter from './EventsCenter';

export class TetrisScene extends Phaser.Scene {

    square;
    timedEvent;
    // virScreen;
    left; right; top; bottom; center;
    ColNum; RowNum;
    blockWidth;
    BlockMatrix;

    constructor() {
        super({
            key: "TetrisScene",
            active: true,
            //   visible: false,
        });
    }

    init(data): void {
        console.log('TetrisScene started', data);
        eventsCenter.on('up_key', this.upPressed, this);
        eventsCenter.on('down_key', this.upPressed, this);
        eventsCenter.on('left_key', this.upPressed, this);
        eventsCenter.on('right_key', this.upPressed, this);
        eventsCenter.on('select_key', this.upPressed, this);
        eventsCenter.on('start_key', this.upPressed, this);

        this.left = data['virScreen'].getTopLeft()['x']
        this.top = data['virScreen'].getTopLeft()['y']
        this.right = data['virScreen'].getBottomRight()['x']
        this.bottom = data['virScreen'].getBottomRight()['y']
        this.center = data['virScreen'].getCenter();

        this.ColNum = 10;
        this.RowNum = 18;
        this.blockWidth = 32

        // Initialize BlockMatrix
        this.BlockMatrix = []
        for (var i=0; i < this.RowNum; i++){
            let row = [];
            for (var j=0; j < this.ColNum; j++){
                row.push(0)
            }
            this.BlockMatrix.push(row)
        }
    }

    preload(): void {
        this.load.spritesheet('blocks', '../assets/blocks.png', {
            frameWidth: 32, frameHeight: 32, endFrame: 8
        });
    }

    create(): void {
        this.square = this.add.rectangle(10, 19, 60, 60, 0x16d690) as any;
        this.physics.add.existing(this.square);
        this.timedEvent = this.time.addEvent({delay: 1000, callback: this.onEvent, callbackScope: this, loop: true});
        
        let centerX = (this.left + this.right)/2;
        let centerY = (this.top + this.bottom)/2;
        let fitWidth = Math.floor((this.right - this.left)/this.ColNum);
        let fitHeight = Math.floor((this.bottom - this.top)/this.RowNum);
        let virTile = this.add.tileSprite(centerX, centerY, fitWidth * this.ColNum, fitHeight * this.RowNum, 'blocks', 2);
        let scaleRatioX = fitWidth / this.blockWidth;
        let scaleRatioY = fitHeight / this.blockWidth;
        virTile.tileScaleX = scaleRatioX;
        virTile.tileScaleY = scaleRatioY;

        let spawn_BM = this.Spawn();
        console.log('spawn_BM: ', spawn_BM);
        
        let {x, y} = virTile.getTopLeft();
        console.log('x, y: ',x,y);
        
        
        for (var i=0; i < this.BlockMatrix.length; i++){
            for (var j=0; j < this.BlockMatrix[i].length; j++){
                if (this.BlockMatrix[i][j] === 1){
                    this.add.sprite(x+j*fitWidth, y+i*fitHeight,'blocks', 3).setOrigin(0,0).setScale(scaleRatioX, scaleRatioY);
                }
            }
        }
    }

    public Spawn (){
        // test with T shape
        let T_shape0 = [1,1,1]
        let T_shape1 = [0,1,0]

        this.BlockMatrix[0].splice(4, T_shape0.length, ...T_shape0)
        this.BlockMatrix[1].splice(4, T_shape1.length, ...T_shape1)
        console.log('BlockMatrix: ', this.BlockMatrix );
        

        return this.BlockMatrix




    }

    public onEvent(){
        // test purpose
        let oldY = this.square.getBottomCenter(); 
        this.square.y = oldY['y'];

        // move BlockMatrix
        let BM_copy = [...this.BlockMatrix];
        for (var i=0; i < this.BlockMatrix.length; i++){
            for (var j=0; j < this.BlockMatrix[i].length; j++){
                if (this.BlockMatrix[i][j] === 0){
                    BM_copy[i+1][j] = 1
                }
            }
        }
    }

    update(): void {

    }

    public upPressed(){
        console.log('up pressed');
        
    }
    public downPressed(){
        console.log('up pressed');
        
    }
    public leftPressed(){
        console.log('up pressed');
        
    }
    public rightPressed(){
        console.log('up pressed');
        
    }
}
