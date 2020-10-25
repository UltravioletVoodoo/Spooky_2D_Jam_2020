import Phaser from 'phaser';
import Config from '../Config';
import Assets from '../Assets';
import State from '../State';
import Player from '../Player';
import Npc from '../Npc';
import Levels from '~/Levels';
import Item from '~/Item';
import levels from '~/Levels';

const TransitionTime = 800;

export default class LevelScene extends Phaser.Scene {

    private player!: Player;
    public npcs!: Npc[];
    public items!: Item[];

    private dogTags!: Phaser.GameObjects.Image;
    private pocketWatch!: Phaser.GameObjects.Image;
    private mothersCharm!: Phaser.GameObjects.Image;
    private key!: Phaser.GameObjects.Image;

    constructor() {
        super(LevelScene.name);
    }

    preload() {
        Assets.preload(this);
    }

    create() {
        // Load tileset
        const state = State.get();
        const tilemap = this.make.tilemap({ key: Assets.levels[state.level.y][state.level.x] as any });
        const tileset = tilemap.addTilesetImage('graveyard-tileset', Assets.tiles);
        const collisionLayer = tilemap.createStaticLayer('Tile Layer 1', tileset);

        const levelData = Levels[state.level.y][state.level.x];
        this.npcs = [];
        for (const npcData of levelData.npcs) {
            this.npcs.push(new Npc(
                this, 
                npcData.x,
                npcData.y, 
                npcData.name, 
                npcData.scriptKey,
            ));
        }

        this.items = [];
        for (const itemData of levelData.items) {
            this.items.push(new Item(
                this,
                itemData.x,
                itemData.y,
                itemData.itemKey
            ));
        }

        // Load player and collission
        this.player = new Player(this);
        collisionLayer.setDisplaySize(Config.scale.width, Config.scale.height);
        collisionLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player.sprite, collisionLayer);

        for (const npc of this.npcs) {
            this.physics.add.collider(this.player.sprite, npc.sprite);
        }

        for (const item of this.items) {
            this.physics.add.collider(this.player.sprite, item.sprite, (a, b) => {
                state.items[item.itemKey] = true;
                item.sprite.destroy();
            });
        }

        // Initial camera fade in
        state.inTransition = true;
        this.cameras.main.setBackgroundColor(0xa0a0a0);
        this.cameras.main.fadeIn(TransitionTime / 2);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            state.inTransition = false;
        });

        // Start main audio
        let menuSound = this.sound.get(Assets.menuAudio);
        if (menuSound.isPlaying) {
            this.sound.stopAll();
            this.sound.play(Assets.themeAudio, {
                volume: 0.5,
                loop: true,
            });
        }

        this.pocketWatch = this.add.image(0, 60, Assets.pocketwatchIcon);
        this.dogTags = this.add.image(0, 60, Assets.dogTagsIcon);
        this.mothersCharm = this.add.image(0, 60, Assets.mothersCharmIcon);
        this.key = this.add.image(0, 60, Assets.keyIcon);

        this.dogTags.setVisible(false);
        this.pocketWatch.setVisible(false);
        this.mothersCharm.setVisible(false);
        this.key.setVisible(false);
    }

    update() {
        this.player.update();

        const state = State.get();

        const items: Phaser.GameObjects.Image[] = [];

        this.dogTags.setVisible(false);
        this.pocketWatch.setVisible(false);
        this.mothersCharm.setVisible(false);
        this.key.setVisible(false);

        if (state.items.dogtags) {
            items.push(this.dogTags);
            this.dogTags.setVisible(true); 
        }
        if (state.items.key) {
            items.push(this.key);
            this.key.setVisible(true);
        }
        if (state.items.mothersCharm) {
            items.push(this.mothersCharm);
            this.mothersCharm.setVisible(true);
        }
        if (state.items.pocketwatch) {
            items.push(this.pocketWatch);
            this.pocketWatch.setVisible(true);
        }

        items.forEach((item, i) => {
            item.setX(Config.scale.width / 2 - (items.length * 120 / 2) + (i * 120) + 40);
        });
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
