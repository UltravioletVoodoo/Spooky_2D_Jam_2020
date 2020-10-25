import Phaser from 'phaser';

export default {
    alette: 'visual/alette.png',
    aunt: 'viaual/aunt.png',
    grandpa: 'visual/grandpa.png',
    sister: 'visual/siter.png',
    gloom: 'visual/gloom.png',
    dialogue: 'visual/dialogue.png',
    player: 'visual/player.png',
    playerAtlas: 'visual/playerAtlas.json',
    tiles: 'visual/tiles.png',
    levels: [
        [ 'levels/00.json' ],
    ],
    shader: 'shader.glsl',

    preload(scene: Phaser.Scene) {
        scene.load.image(this.alette, this.alette);
        scene.load.image(this.aunt, this.aunt);
        scene.load.image(this.grandpa, this.grandpa);
        scene.load.image(this.sister, this.sister);
        scene.load.image(this.gloom, this.gloom);
        scene.load.image(this.dialogue, this.dialogue);
        scene.load.atlas(this.player, this.player, this.playerAtlas);
        scene.load.image(this.tiles, this.tiles);
        for (const row of this.levels) {
            for (const level of row) {
                scene.load.tilemapTiledJSON(level, level);
            }
        }
    }

};