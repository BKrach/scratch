// Si l'objet SurvivalHorror n'existe pas on le crée
var SurvivalHorror = SurvivalHorror || {};

// Déclaration de l'état Boot
SurvivalHorror.Boot = function () {};

// On prépare la configuration du jeu et on charge les éléments de l'écran de chargement
SurvivalHorror.Boot.prototype = {

    // Cette fonction sert dans Phaser à charger les 'assets'
    preload: function() {
        this.load.image('logo', '../assets/images/logo.png');
        this.load.image('barreChargement', '../assets/images/barreChargement.png');
    },

    // Cette fonction sert à créer la page de Boot
    create: function() {
        // On met un background bien dark pour le look SurvivalHorror ;)
        this.game.stage.backgroundColor = '#000000';

        // Utilisation du mode SHOW_ALL du ScaleManager pour prendre toute la place dans le navigateur
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 600;
        this.scale.minHeight = 600;
        this.scale.maxWidth = 600;
        this.scale.maxHeight = 600;

        // On centre le jeu horizontalement
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = false;

        // On utilise le système de physics Arcade de Phaser
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Et on start l'étape Preload
        this.state.start('Preload');
    }
}
