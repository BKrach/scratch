// Si l'objet SurvivalHorror n'existe pas on le crée
var SurvivalHorror = SurvivalHorror || {};

// Déclaration de l'état Gameover
SurvivalHorror.Gameover = function () {};

// Affichera notre écran de chargement
SurvivalHorror.Gameover.prototype = {

    // Initialisation de l'état Gameover
    create: function() {

        // On place un background bien sombre pour se mettre dans l'ambiance
        this.background = '#222222';

        // On récupère le dernier score dans le localStorage
        let scoreActuel = localStorage.getItem('scoreActuel');

        // On affiche un message annonçant la défaite attendue
        let message_ligne_1 = 'Game over';
        let message_ligne_2 = 'Tu as tenu ' + scoreActuel + ' secondes... Navrant.';
        let message_ligne_3 = 'En plus, t\'as perdu.';
        let message_ligne_4 = 'Revenir à l\'accueil';

        // On choisit un style basique
        let style_1 = { font: "28px Roboto", fill: "#fff", align: "center" };
        let style_2 = { font: "18px Roboto", fill: "#fff", align: "center" };

        // On ajoute le texte
        let ajout = this.game.add.text(this.game.width/2, this.game.height/2 - 100, message_ligne_1, style_1);
        ajout.anchor.set(0.5);

        ajout = this.game.add.text(this.game.width/2, this.game.height/2, message_ligne_2, style_2);
        ajout.anchor.set(0.5);

        ajout = this.game.add.text(this.game.width/2, this.game.height/2 + 30, message_ligne_3, style_2);
        ajout.anchor.set(0.5);

        ajout = this.game.add.text(this.game.width/2, this.game.height/2 + 100, message_ligne_4, style_1);
        ajout.anchor.set(0.5);
    },

    // Fonction controllant les interactions
    update: function() {

        // Si l'utilisateur clique quelquepart, on passe à l'étape Game, qui lance le jeu
        if(this.game.input.activePointer.justPressed()) {
            this.game.state.start('Welcome');
        }
    }

}
