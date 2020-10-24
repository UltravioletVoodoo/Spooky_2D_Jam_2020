import Phaser from 'phaser';
import Config from './Config';
import DebugScene from './scenes/DebugScene';

const Game = new Phaser.Game(Config);

// Load Scenes
Game.scene.add(DebugScene.name, DebugScene);

// Start the first scene
Game.scene.start(DebugScene.name);

export default Config;