import Phaser from 'phaser';
import Config from './Config';
import DebugScene from './scenes/DebugScene';
import LevelScene from './scenes/LevelScene';
import DialogueScene from './scenes/DialogueScene';
import ControllerScene from './scenes/ControllerScene';
import PostFxScene from './scenes/PostFxScene';
import ChoiceScene from './scenes/ChoiceScene';
import InventoryScene from './scenes/InventoryScene';
import MainMenuScene from './scenes/MainMenuScene';
import QuoteScene from './scenes/QuoteScene';
import CreditScene from './scenes/CreditScene';

const Game = new Phaser.Game(Config);

for (const scene of [
    ControllerScene,
    LevelScene,
    DebugScene,
    DialogueScene,
    PostFxScene,
    ChoiceScene,
    InventoryScene,
    MainMenuScene,
    QuoteScene,
    CreditScene,
]) {
    Game.scene.add(scene.name, scene);
}

Game.scene.start(ControllerScene.name);

export default Config;