var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: [EscenaJuego, EscenaPerder]
};

var game = new Phaser.Game(config);

//Variables
var santa;