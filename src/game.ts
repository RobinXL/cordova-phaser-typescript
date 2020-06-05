import "phaser";
import { MainScene } from "./scenes/mainScene";

let game: Game;
const config: Phaser.Types.Core.GameConfig = {
  title: 'Robin Game Sample',
  // width: 414,
  // height: 736,
  width: document.getElementById("game").offsetWidth * window.devicePixelRatio,
  height: document.getElementById("game").offsetHeight * window.devicePixelRatio,
  scale: {
    mode: Phaser.Scale.FIT,
    // width: 414,
    // height: 736,
  },
  type: Phaser.AUTO,
  parent: "game",
  scene: [MainScene],
  backgroundColor: '#18216D',
  render: { pixelArt: false, antialias: true },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
};

// game class
export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    game = new Game(config);
});

window.addEventListener('resize', () => {  
    game.scale.resize(document.getElementById("game").offsetWidth + window.devicePixelRatio, document.getElementById("game").offsetHeight + window.devicePixelRatio);
});
