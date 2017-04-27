// Si l'objet SurvivalHorror n'existe pas on le crée
var SurvivalHorror = SurvivalHorror || {};

// Création de l'objet Game
SurvivalHorror.game = new Phaser.Game(400, 400, Phaser.CANVAS, '');

// Ajout des différents états (State) que nous avons créés
SurvivalHorror.game.state.add('Boot', SurvivalHorror.Boot);
SurvivalHorror.game.state.add('Preload', SurvivalHorror.Preload);
SurvivalHorror.game.state.add('Welcome', SurvivalHorror.Welcome);
SurvivalHorror.game.state.add('Gameover', SurvivalHorror.Gameover);
SurvivalHorror.game.state.add('Victoire', SurvivalHorror.Victoire);
SurvivalHorror.game.state.add('Game', SurvivalHorror.Game);

// On démarre l'état Boot
SurvivalHorror.game.state.start('Boot');
