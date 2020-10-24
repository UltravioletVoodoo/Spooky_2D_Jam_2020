import Phaser from 'phaser';
import Config from '../Config';
import Assets from '../Assets';
import State from '../State';
import Player from '../Player';

const TransitionTime = 800;

export default class LevelScene extends Phaser.Scene {

    private player!: Player;

    constructor() {
        super(LevelScene.name);
    }

    preload() {
        Assets.preload(this);
    }

    create() {
        const state = State.get();
        // const tilemap = this.make.tilemap({ key: Assets.levels[state.level.x][state.level.y] });
        const tilemap = this.make.tilemap({ key: Assets.levels[0][0] });
        const tileset = tilemap.addTilesetImage('graveyardTileset', Assets.tiles);
        const collisionLayer = tilemap.createStaticLayer('Tile Layer 1', tileset);
        console.log(collisionLayer);
        collisionLayer.setDisplaySize(Config.scale.width, Config.scale.height);
        collisionLayer.setCollisionByProperty({ collides: true });
        this.player = new Player(this);
        this.physics.add.collider(this.player.sprite, collisionLayer);

        state.inTransition = true;
        this.cameras.main.fadeIn(TransitionTime / 2);
        this.time.delayedCall(TransitionTime / 2, () => {
            state.inTransition = false;
        });
    }

    update() {
        this.player.update();
    }

    transition(stateUpdate: () => void) {
        const state = State.get();
        state.inTransition = true;
        this.cameras.main.fadeOut(TransitionTime / 2);
        this.time.delayedCall(TransitionTime / 2, () => {
            stateUpdate();
            this.scene.start(LevelScene.name);
        });
    }

}
