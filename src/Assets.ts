import Phaser from 'phaser';

export default {
    player: 'visual/player.png',
    playerAtlas: 'visual/playerAtlas.json',
    tiles: 'visual/tiles.png',
    levels: [
        [ 'levels/00.json' ],
    ],

    preload(scene: Phaser.Scene) {
        scene.load.atlas(this.player, this.player, this.playerAtlas);
        scene.load.image(this.tiles, this.tiles);
        for (const row of this.levels) {
            for (const level of row) {
                scene.load.tilemapTiledJSON(level, level);
            }
        }
    }

};