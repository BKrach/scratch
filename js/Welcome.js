// Si l'objet SurvivalHorror n'existe pas on le crée
var SurvivalHorror = SurvivalHorror || {};

// Déclaration de l'état Preload
SurvivalHorror.Welcome = function () {};

// Affichera notre écran de chargement
SurvivalHorror.Welcome.prototype = {

    // Initialisation de l'état Welcome
    create: function() {

        // On place un background bien sombre pour se mettre dans l'ambiance
        this.background = '#222222';

        // On récupère le meilleurScore pour l'afficher'
        let meilleurScore = parseInt(localStorage.getItem('meilleurScore'));

        // On affiche un message de malvenue à l'utilisateur
        let message_ligne_1 = 'Clique pour démarrer';
        let message_ligne_2 = '';
        let message_ligne_3 = '';

        // En fonction du meilleurScore on affiche un message différent
        if (Number.isInteger(meilleurScore)) {
            message_ligne_2 = 'Record : ' + meilleurScore + ' secondes...';
        } else {
            message_ligne_2 = 'Oh, un bleu !';
            message_ligne_3 = 'Sors de là, ça vaut mieux.';

            // On set quand même une valeur au localStorage
            localStorage.setItem('meilleurScore', 0);
        }

        // On choisit un style basique
        let style_1 = { font: "28px Roboto", fill: "#fff", align: "center" };
        let style_2 = { font: "18px Roboto", fill: "#fff", align: "center" };

        // On ajoute le texte
        let ajout = this.game.add.text(this.game.width/2, this.game.height/2 - 100, message_ligne_1, style_1);
        ajout.anchor.set(0.5);

        ajout = this.game.add.text(this.game.width/2, this.game.height/2 + 100, message_ligne_2, style_2);
        ajout.anchor.set(0.5);

        ajout = this.game.add.text(this.game.width/2, this.game.height/2 + 130, message_ligne_3, style_2);
        ajout.anchor.set(0.5);

    },

    // Fonction controllant les interactions
    update: function() {

        // Si l'utilisateur clique quelquepart, on passe à l'étape Game, qui lance le jeu
        if(this.game.input.activePointer.justPressed()) {
            this.game.state.start('Game');
        }
    }

}
