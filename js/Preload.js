// Si l'objet SurvivalHorror n'existe pas on le crée
var SurvivalHorror = SurvivalHorror || {};

// Déclaration de l'état Preload
SurvivalHorror.Preload = function () {};

// Affichera notre écran de chargement
SurvivalHorror.Preload.prototype = {

    // Cette fonction sert dans Phaser à charger les 'assets'
    preload: function() {
        // On affiche le logo
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        // On affiche la barre de chargement
        this.barreChargement = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'barreChargement');
        this.barreChargement.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.barreChargement);

        // Chargement de la carte
        this.load.tilemap('carte', '../assets/carte.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tilesetHouse', '../assets/images/tilesetHouse.png');
        this.load.image('breakout_spritesheet', '../assets/images/breakout_spritesheet.png');
        // this.load.image('personnage', '../assets/images/car.png');
        this.load.spritesheet('personnage', '../assets/images/personnage.png', 32, 32);
    },


    // Cette fonction sert à créer l'état de Preload
    create: function() {
        // On appelle simplement l'état Game qui fera tout le boulot
        this.state.start('Welcome');
    }



}
