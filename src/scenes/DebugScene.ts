import Phaser from 'phaser';
import Config from '../Config';
import Assets from '../Assets';

interface Controls {
    [key: string]: Phaser.Input.Keyboard.Key,
}

export default class DebugScene extends Phaser.Scene {

    player!: Phaser.Physics.Arcade.Sprite;
    controls!: Controls;

    constructor() {
        super(DebugScene.name);
    }

    preload() {
        this.load.atlas(Assets.player, Assets.player, Assets.playerAtlas);
    }

    create() {
        const debugGrid = this.add.grid(
            0, 0, 
            Config.scale.width, Config.scale.height, 
            Config.scale.tile, Config.scale.tile,
            0x0070a0, 1, 0xa0a0a0,
        );
        debugGrid.setOrigin(0, 0);

        this.createControls();
        this.createPlayer();
    }

    createControls() {
        const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.controls = this.input.keyboard.addKeys({
            // wasd
            w: KeyCodes.W,
            a: KeyCodes.A,
            s: KeyCodes.S,
            d: KeyCodes.D,
            // arrow
            up: KeyCodes.UP,
            left: KeyCodes.LEFT,
            down: KeyCodes.DOWN,
            right: KeyCodes.RIGHT,
            // other controls
            enter: KeyCodes.ENTER,
            space: KeyCodes.SPACE,
            escape: KeyCodes.ESC,

        }) as Controls;
    }

    createPlayer() {
        const player = this.player 
                     = this.physics.add.sprite(
            Config.scale.width / 2, 
            Config.scale.height / 2, 
            Assets.player,
        );
        player.setDisplaySize(Config.scale.tile, Config.scale.tile);
        player.setDrag(Config.player.drag);
        player.setCollideWorldBounds(true);
        player.setDamping(true);

        // Load player animations
        const  createPlayerAnimation = (key) => {
            this.anims.create({
                key,
                frames: this.anims.generateFrameNames(Assets.player, {
                    prefix: key,
                    suffix: '.png',
                    start: 0,
                    end: 4,
                }),
                frameRate: Config.animations.framerate,
                repeat: -1,
            });
        };

        for (const animation of Object.keys(Config.player.animations)) {
            createPlayerAnimation(Config.player.animations[animation]);
        }
    }

    update() {
        this.updatePlayer();
    }

    updatePlayer() {
        const { player, controls } = this;
        const directionVector = new Phaser.Math.Vector2(
            // Get the x component as -1, 0, 1
            ((controls.d.isDown || controls.right.isDown) ? 1 : 0) -
            ((controls.a.isDown || controls.left.isDown) ? 1 : 0),
            // Get the y component as -1, 0, 1
            ((controls.s.isDown || controls.down.isDown) ? 1 : 0) -
            ((controls.w.isDown || controls.up.isDown) ? 1 : 0),
            // Normalize the resulting vector
        ).normalize();
        // Ensure we cannot exceed player velocity
        if (directionVector.length() > 0) {
            player.setMaxVelocity(
                Config.player.velocity * Math.abs(directionVector.x),
                Config.player.velocity * Math.abs(directionVector.y),
            );
        }
        // Accelerate in the correct directions
        player.setAcceleration(
            Config.player.acceleration * directionVector.x,
            Config.player.acceleration * directionVector.y,
        );
        // Animate player
        if (directionVector.x> 0) {
            player.play(Config.player.animations.runRight, true);
        } else if (directionVector.x < 0) {
            player.play(Config.player.animations.runLeft, true);
        } else if (directionVector.y > 0) {
            player.play(Config.player.animations.runDown, true);
        } else if (directionVector.y < 0) {
            player.play(Config.player.animations.runUp, true);
        } else {
            player.play(Config.player.animations.idle, true);
        }
    }

}
