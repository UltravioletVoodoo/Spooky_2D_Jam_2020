import Phaser from 'phaser';
import Config from './Config';
import DebugScene from './scenes/DebugScene';
import LevelScene from './scenes/LevelScene';
import DialogueScene from './scenes/DialogueScene';
import MainMenuScene from './scenes/MainMenuScene';
import PauseMenuScene from './scenes/PauseMenuScene';
import CreditsScene from './scenes/CreditsScene';
import ControllerScene from './scenes/ControllerScene';
import PostFxScene from './scenes/PostFxScene';

const Game = new Phaser.Game(Config);

for (const scene of [
    ControllerScene,
    LevelScene,
    DebugScene,
    DialogueScene,
    MainMenuScene,
    PauseMenuScene,
    CreditsScene,
    PostFxScene,
]) {
    Game.scene.add(scene.name, scene);
}

// Start the first scene
Game.scene.start(ControllerScene.name);

export default Config;