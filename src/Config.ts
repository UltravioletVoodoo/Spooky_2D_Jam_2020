import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
        tile: 80,
    },

    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
        },
    },

    debug: false, //true,
};
