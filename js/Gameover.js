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

        // On récupère le record également pour l'enregistrer si besoin
        let meilleurScore = localStorage.getItem('meilleurScore');

        let message_ligne_2 = '';

        // On met à jour le meilleurScore
        if (scoreActuel > meilleurScore) {
            localStorage.setItem('meilleurScore', scoreActuel);
            message_ligne_2 = 'Tu as tenu ' + scoreActuel + ' secondes... Record battu';
        } else {
            message_ligne_2 = 'Tu as tenu ' + scoreActuel + ' secondes... Navrant';
        }

        // On affiche un message annonçant la défaite prévue
        let message_ligne_1 = 'Game over';
        // let message_ligne_2 = 'Tu as tenu ' + scoreActuel + ' secondes... Pas mal';
        let message_ligne_3 = 'Revenir à l\'accueil';

        // On choisit un style basique
        let style_1 = { font: "28px Roboto", fill: "#fff", align: "center" };
        let style_2 = { font: "18px Roboto", fill: "#fff", align: "center" };

        // On ajoute le texte
        let ajout = this.game.add.text(this.game.width/2, this.game.height/2 - 100, message_ligne_1, style_1);
        ajout.anchor.set(0.5);

        ajout = this.game.add.text(this.game.width/2, this.game.height/2, message_ligne_2, style_2);
        ajout.anchor.set(0.5);

        ajout = this.game.add.text(this.game.width/2, this.game.height/2 + 100, message_ligne_3, style_1);
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
