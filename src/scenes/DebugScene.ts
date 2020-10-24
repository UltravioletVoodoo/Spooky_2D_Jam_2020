import Phaser from 'phaser';
import Config from '../Config';
import Assets from '../Assets';
import State from '../State';

interface Controls {
    [key: string]: Phaser.Input.Keyboard.Key,
}

export default class DebugScene extends Phaser.Scene {

    player!: Phaser.Physics.Arcade.Sprite;
    debugText!: Phaser.GameObjects.Text;
    controls!: Controls;
    inTransition: boolean = false;

    constructor() {
        super(DebugScene.name);
    }

    preload() {
        this.load.atlas(Assets.player, Assets.player, Assets.playerAtlas);
        this.load.image(Assets.tiles, Assets.tiles);
        for (const row of Assets.levels) {
            for (const level of row) {
                this.load.tilemapTiledJSON(level, level);
            }
        }
    }

    create() {
        /*
        const debugGrid = this.add.grid(
            0, 0, 
            Config.scale.width, Config.scale.height, 
            Config.scale.tile, Config.scale.tile,
            new Phaser.Display.Color().random().color,
        );
        debugGrid.setOrigin(0, 0);*/
        const map = this.make.tilemap({ key: Assets.levels[0][0] });
        const tileset = map.addTilesetImage('testTileset', Assets.tiles);
        const collisionLayer = map.createStaticLayer('Tile Layer 1', tileset);
        collisionLayer.setDisplaySize(Config.scale.width, Config.scale.height);
        collisionLayer.setCollisionByProperty({ collision: true });

        this.createControls();
        this.createPlayer();

        this.physics.add.collider(this.player, collisionLayer);


        if (Config.debug) {
            this.debugText = this.add.text(10, 10, "");
        }
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
        const state = State.get();
        const player = this.player 
                     = this.physics.add.sprite(
            Config.scale.width / 2,
            Config.scale.height / 2,
            Assets.player,
        );
        player.setDisplaySize(Config.scale.tile, Config.scale.tile);
        player.setDrag(Config.player.drag);
        player.setDamping(true);
        player.body.setSize(Config.scale.tile * 0.75, Config.scale.tile * 0.75);
        // Debug
        player.debugShowVelocity = true;

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

        const { debugText: debug, player } = this;
        const state = State.get();
        if (Config.debug) {
            debug.setText([
                `FPS: ${this.game.loop.actualFps.toFixed(2)}`,
                `Player (${player.x.toFixed(2)}, ${player.y.toFixed(2)})`,
                `Level: (${state.level.x}, ${state.level.y})`,
            ]);
        }
    }

    updatePlayer() {
        const { debugText: debug, player, controls, inTransition } = this;
        const state = State.get();

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

        if (!inTransition) {
            // Check for level bounds
            if (player.y < 0) {
                // Top of screen
                state.level.y -= 1;
                this.levelTransition(player.x, Config.scale.height);
            } else if (player.y > Config.scale.height) {
                // Bottom of screen
                state.level.y += 1;
                this.levelTransition(player.x, 0);
            } else if (player.x < 0) {
                // Left of screen
                state.level.x -= 1;
                this.levelTransition(Config.scale.width, player.y);
            } else if (player.x > Config.scale.width) {
                // Right of screen
                state.level.x += 1;
                this.levelTransition(0, player.y);
            }

        }

    }

    levelTransition(x: number, y: number) {
        const FadeTime = 250;
        this.inTransition = true;
        this.cameras.main.fadeOut(FadeTime);
        this.time.delayedCall(FadeTime, () => {
            this.player.setPosition(x, y);
            this.cameras.main.fadeIn(FadeTime);
            this.time.delayedCall(FadeTime, () => {
                this.inTransition = false;
            });
        });
    }

}
