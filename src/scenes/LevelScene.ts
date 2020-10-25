import Phaser from 'phaser';
import Config from '../Config';
import Assets from '../Assets';
import State from '../State';
import Player from '../Player';
import DialogueScene from './DialogueScene';

const TransitionTime = 2000;

export default class LevelScene extends Phaser.Scene {

    private player!: Player;

    constructor() {
        super(LevelScene.name);
    }

    preload() {
        Assets.preload(this);
    }

    create() {
        // Load tileset
        const state = State.get();
        const tilemap = this.make.tilemap({ key: Assets.levels[state.level.y][0] });
        const tileset = tilemap.addTilesetImage('graveyardTileset', Assets.tiles);
        const collisionLayer = tilemap.createStaticLayer('Tile Layer 1', tileset);

        // Load player and collission
        this.player = new Player(this);
        collisionLayer.setDisplaySize(Config.scale.width, Config.scale.height);
        collisionLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player.sprite, collisionLayer);

        // Initial camera fade in
        state.inTransition = true;
        this.cameras.main.setBackgroundColor(0xa0a0a0);
        this.cameras.main.fadeIn(TransitionTime / 2);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            state.inTransition = false;
        });

        // tmp
        this.scene.launch(DialogueScene.name);
    }

    update() {
        this.player.update();
    }

    transition(stateUpdate: () => void) {
        const state = State.get();
        state.inTransition = true;
        this.cameras.main.fadeOut(TransitionTime / 2);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            stateUpdate();
            this.scene.start(LevelScene.name);
        });
    }

}
