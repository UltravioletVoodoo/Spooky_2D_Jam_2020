import Phaser from 'phaser';

export default {
    alette: 'visual/alette.png',
    aunt: 'visual/aunt.png',
    auntSprite: 'visual/auntSprite.png',
    auntSpriteAtlas: 'visual/auntSpriteAtlas.json',
    grandpa: 'visual/grandpa.png',
    grandpaSprite: 'visual/grandpaSprite.png',
    grandpaSpriteAtlas: 'visual/grandpaSpriteAtlas.json',
    sister: 'visual/sister.png',
    sisterSprite: 'visual/sisterSprite.png',
    sisterSpriteAtlas: 'visual/sisterSpriteAtlas.json',
    gloom: 'visual/gloom.png',
    gloomSprite: 'visual/gloomSprite.png',
    gloomSpriteAtlas: 'visual/gloomSpriteAtlas.json',
    dogtagsSprite: 'visual/dogTagsSprite.png',
    dogTagsAtlas: 'visual/dogTagsAtlas.json',
    dogTagsIcon: 'visual/dogTagsIcon.png',
    player: 'visual/player.png',
    playerAtlas: 'visual/playerAtlas.json',
    speechBubbles: 'visual/speechBubbles.png',
    speechBubblesAtlas: 'visual/speechBubblesAtlas.json',
    dialogue: 'visual/dialogue.png',
    mainMenu: 'visual/mainMenu.png',
    credits1: 'visual/credits1.png',
    credits2: 'visual/credits2.png',
    tiles: 'visual/tiles.png',
    levels: [
        [ 'levels/00.json' ],
        [ 'levels/01.json' ],
    ],
    shader: 'shader.glsl',

    preload(scene: Phaser.Scene) {
        scene.load.image(this.alette, this.alette);
        scene.load.image(this.aunt, this.aunt);
        scene.load.image(this.grandpa, this.grandpa);
        scene.load.image(this.sister, this.sister);
        scene.load.image(this.gloom, this.gloom);
        scene.load.image(this.dialogue, this.dialogue);
        scene.load.image(this.mainMenu, this.mainMenu);
        scene.load.image(this.credits1, this.credits1);
        scene.load.image(this.credits2, this.credits2);
        scene.load.atlas(this.auntSprite, this.auntSprite, this.auntSpriteAtlas);
        scene.load.atlas(this.grandpaSprite, this.grandpaSprite, this.grandpaSpriteAtlas);
        scene.load.atlas(this.sisterSprite, this.sisterSprite, this.sisterSpriteAtlas);
        scene.load.atlas(this.gloomSprite, this.gloomSprite, this.gloomSpriteAtlas);
        scene.load.atlas(this.dogtagsSprite, this.dogtagsSprite, this.dogTagsAtlas);
        scene.load.image(this.dogTagsIcon, this.dogTagsIcon);
        scene.load.atlas(this.player, this.player, this.playerAtlas);
        scene.load.atlas(this.speechBubbles, this.speechBubbles, this.speechBubblesAtlas);
        scene.load.image(this.tiles, this.tiles);
        for (const row of this.levels) {
            for (const level of row) {
                scene.load.tilemapTiledJSON(level, level);
            }
        }
    }

};