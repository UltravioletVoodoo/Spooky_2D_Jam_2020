import Phaser from 'phaser';
import Config from './Config';
import DebugScene from './scenes/DebugScene';
import LevelScene from './scenes/LevelScene';
import DialogueScene from './scenes/DialogueScene';
import ControllerScene from './scenes/ControllerScene';
import PostFxScene from './scenes/PostFxScene';
import ChoiceScene from './scenes/ChoiceScene';

const Game = new Phaser.Game(Config);

for (const scene of [
    ControllerScene,
    LevelScene,
    DebugScene,
    DialogueScene,
    PostFxScene,
    ChoiceScene,
]) {
    Game.scene.add(scene.name, scene);
}

// Start the first scene
Game.scene.start(ControllerScene.name);

export default Config;