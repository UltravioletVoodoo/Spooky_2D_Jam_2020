import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false,
        }
    },
}

let game = new Phaser.Game(config)

// Load Scenes
game.scene.add('HelloWorldScene', HelloWorldScene)

// Start the first scene
game.scene.start('HelloWorldScene')
