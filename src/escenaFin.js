class EscenaPerder extends Phaser.Scene() {

    constructor() {
        super({ key: 'escenaPerder' });
    }
    preload() {
        this.load.image('pantallaOver', '/assets/img/pantallaOver.jpg');
    }
    create() {
        this.add.image(480, 320, 'pantallaOver');
        this.input.keyboard.on('keydown', () => { this.scene.start('escenaJuego') })
        this.input.on('pointerdown', () => { this.scene.start('escenaJuego') })
    }
}