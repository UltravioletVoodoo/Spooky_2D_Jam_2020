import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,

    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
        tile: 80,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },

    animations: {
        framerate: 4,
    },

    player: {
        velocity: 250,
        acceleration: Infinity, // Set to Infinity for maximum snappiness
        drag: 0.8,              // THe higher the floatier
        animations: {
            idle: 'player-idle000',
            runUp: 'player-run-up000',
            runDown: 'player-run-down000',
            runLeft: 'player-run-left000',
            runRight: 'player-run-right000',
        },
    },

    debug: true,
};
