class EscenaJuego extends Phaser.Scene {

  constructor() {
    super({ key: 'escenaJuego' })
  }

  preload() {
    this.load.setBaseURL('http://localhost:3000');
    this.load.image('fondo', './assets/img/city.jpg');
    this.load.image('regalo', '/assets/img/regalo.png');
    this.load.spritesheet('santa', '/assets/img/spriteSanta.png', { frameWidth: 45.5, frameHeight: 77 });
    this.load.image('pipe0', '/assets/img/chimeneaCu.png');
    this.load.image('pipeEntrada0', '/assets/img/entradaChime.png');
    this.load.image('pipe1', '/assets/img/columnaCu.png');
    this.load.image('pipeEntrada1', '/assets/img/columnaTope.png');

  }

  create() {

    this.input.on('pointerdown', () => saltar());

    this.add.image(480, 320, 'fondo');

    this.player = this.physics.add.sprite(50, 100, 'santa');
    this.anims.create({
      key: 'volar',
      frames: this.anims.generateFrameNumbers('santa', { frames: [3, 4] }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.play('volar');

    this.anims.create({
      key: 'saltar',
      frames: this.anims.generateFrameNumbers('santa', { frames: [5, 6, 7, 8, 9, 10, 9] }),
      frameRate: 7,
      repeat: 0,
    });

    this.player.on('animationcomplete', this.animationComplete, this)

    /*
    var particles = this.add.particles('regalo');
    var emitter = particles.createEmitter({
        speed: 5,
      scale: {start: 0.05, end: 0.05 }
    });
      */

    this.player.setCollideWorldBounds(true);
    //emitter.startFollow(this.player, 0, 50, false);


    this.time.delayedCall(0, nuevaColumna, [], this);

  }

  updateScene() {
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode == 32) {
        this.saltar();
      }
    });
  }

  saltar() {
    this.player.setVelocityY(-200);
    this.player.play('saltar');
  }

  animationComplete(animation, frame, sprite) {
    if (animation.key === 'saltar') {
      this.player.play('volar');
    }
  }

  nuevaColumna() {
    const columna = this.physics.add.group();
    const hueco = Math.floor(Math.random() * 5) + 1;
    const aleatorio = Math.floor(Math.random() * 2)
    for (let i = 0; i < 8; i++) {
      if (i !== hueco && i !== hueco + 1 && i !== hueco - 1) {
        let cubo;
        if (i == hueco - 2) {
          cubo = columna.create(960, i * 100, 'pipeEntrada' + aleatorio);
        }
        else if (i == hueco + 2) {
          cubo = columna.create(960, i * 100, 'pipeEntrada' + aleatorio);
        }
        else {
          cubo = columna.create(960, i * 100, 'pipe' + aleatorio);
        }

        cubo.body.allowGravity = false;
      }
    }
    columna.setVelocityX(-200);
    columna.checkWorlBounds = true;
    columna.outOfBoundsKill = true;

    this.physics.add.overlap(this.player, columna, this.hitColumna, null, this);
    this.time.delayedCall(1250, this.nuevaColumna, [], this);

  }

  hitColumna() {
    this.scene.start('escenaPerder');
  }

}
