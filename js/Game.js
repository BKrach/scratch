// Si l'objet SurvivalHorror n'existe pas on le crée
var SurvivalHorror = SurvivalHorror || {};

// Déclaration de l'état Preload
SurvivalHorror.Game = function () {};

SurvivalHorror.Game.prototype = {

    // Cette fonction sert à créer l'état de Game
    create: function() {
        // Déclaration de la carte
        this.creationCarte();

        // Déclaration du personnage
        this.creationPersonnage();

        // Déclaration des fantomes
        this.creationFantomes();

        // On initialise le score du joueur à 0
        this.score = 0;

        // On déclare la couche "Premier plan" en dernier pour qu'elle soit au premier plan
        this.premierPlan = this.map.createLayer('Premier plan');
        this.premierPlan.visible = true;
        this.premierPlan.bringToTop();

        // Cette technique nous permet de lancer toutes les secondes la fonction deplacementsFantome
        this.time.events.repeat(Phaser.Timer.SECOND * 1, 100, this.deplacementsFantome, this);

        // Annulation de la méthode du timer, ne fonctionne pas.
        // On lance un compteur pour connaître le temps que le joueur a tenu
        // this.creationTimer();
        // this.compteur = this.game.time.events.loop(Phaser.Timer.SECOND, 100, this.updateTimer, this);
    },

    deplacementsFantome: function() {
        // Petit bricolage pour le timer, je me sers de ma fonction de déplacement (appelée chaque seconde) et j'incrémente le compteur score
        this.score++;

        // On prend un nombre aléatoire entre 1 et 4
        this.fantomes.forEach(function(fantome) {
            let aleatoire = SurvivalHorror.game.rnd.integerInRange(1,4);
            switch (aleatoire) {
                // Déplacement vers le haut
                case 1:
                    fantome.animations.play('up');
                    fantome.body.velocity.y = -150;
                    fantome.body.velocity.x = 0;
                    break;
                // Déplacement vers le bas
                case 2:
                    fantome.animations.play('down');
                    fantome.body.velocity.y = 150;
                    fantome.body.velocity.x = 0;
                    break;
                // Déplacement vers la gauche
                case 3:
                    fantome.animations.play('left');
                    fantome.body.velocity.y = 0;
                    fantome.body.velocity.x = -150;
                    break;
                // Déplacement vers la droite
                case 4:
                    fantome.animations.play('right');
                    fantome.body.velocity.y = 0;
                    fantome.body.velocity.x = 150;
                    break;
                default:
                    break;
            }
        });

    },

    // Cette fonction permet de régulièrement contrôler ce qui se passe
    update: function() {
        // On gère la collision entre le personnage et le terrain impassible, idem pour nos p'tits fantômes
        this.game.physics.arcade.collide(this.personnage, this.terrain);
        this.game.physics.arcade.collide(this.fantomes, this.terrain);

        // Sauvegarde du score
        var scoreActuel = this.score;
        // Ici je vais mettre mon code pour dire "PAF ! T'as perdu..""
        this.game.physics.arcade.collide(this.fantomes, this.personnage, function(){
            localStorage.setItem('scoreActuel', scoreActuel);
            SurvivalHorror.game.state.start('Gameover');
        });

        // Par défaut la vitesse à 0 pour que quand on appuye une fois, çe ne reste pas dans cet état
        // Si on omet cette ligne, le personnage continue de se déplacer, c'est triste.. (mais pourquoi pas, c'est plus dur de survivre du coup :D)
        this.personnage.body.velocity.y = 0;
        this.personnage.body.velocity.x = 0;

        // Flèche haut
        if(this.cursors.up.isDown) {
            // On incrémente la vitesse de déplacement du personnage en fonction
            this.personnage.body.velocity.y = -100;

            // On anime le déplacement du personnage
            this.personnage.animations.play('up');

            // On ne veut pas de déplacement en diagonal
            this.personnage.body.velocity.x = 0;
        }
        // Flèche bas
        else if(this.cursors.down.isDown) {
            // On incrémente la vitesse de déplacement du personnage en fonction
            this.personnage.body.velocity.y = 100;

            // On anime le déplacement du personnage
            this.personnage.animations.play('down');

            // On ne veut pas de déplacement en diagonal
            this.personnage.body.velocity.x = 0;
        }
        // Flèche gauche
        if(this.cursors.left.isDown) {
            // On incrémente la vitesse de déplacement du personnage en fonction
            this.personnage.body.velocity.x = -100;

            // On anime le déplacement du personnage
            this.personnage.animations.play('left');

            // On ne veut pas de déplacement en diagonal
            this.personnage.body.velocity.y = 0;
        }
        // Flèche droite
        else if(this.cursors.right.isDown) {
            // On incrémente la vitesse de déplacement du personnage en fonction
            this.personnage.body.velocity.x = 100;

            // On anime le déplacement du personnage
            this.personnage.animations.play('right');

            // On ne veut pas de déplacement en diagonal
            this.personnage.body.velocity.y = 0;
        }

        // this.updateTimer();
    },

    // Fonction utile pour charger nos objets (celle-ci est récupérée d'un tuto)
    chargerObjet: function(type, map, layer) {
        var result = new Array();

        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });

        return result;
    },

    // Instanciation du monde dans lequel on va jouer
    creationCarte: function() {
        // On appelle la carte
        this.map = this.game.add.tilemap('carte');

        // On déclare les tileSets utilisés tels quels définis dans le logiciel Tiled
        this.map.addTilesetImage('tilesetHouse', 'tilesetHouse');
        this.map.addTilesetImage('breakout_spritesheet', 'breakout_spritesheet');
        this.map.addTilesetImage('personnage', 'personnage');

        // Il y a des limites à tout...
        this.game.world.setBounds(0, 0, 800, 800);

        // On créé maintenant les couches à partir des noms choisis dans le logiciel Tiled lors de leur création
        this.base = this.map.createLayer('Base');

        this.terrain = this.map.createLayer('Terrain');
        this.terrain.visible = false;

        // On active les collisions avec la couche Terrain (le nombre max ici est en fait 156 cf. carteOK.json, on prend 200 pour être serein)
        this.map.setCollisionBetween(1, 200, true, this.terrain, true);

        // On redimensionne notre application pour correspondre aux dimensions de Base
        this.base.resizeWorld();
    },

    // Dans cette fonction on instancie nos petits fantômes qui font très très peur
    creationFantomes: function() {
        // On crée le groupe de fantômes
        this.fantomes = this.game.add.group();
        this.fantomes.enableBody = true;
        this.fantomes.physicsBodyType = Phaser.Physics.ARCADE;

        // Ensuite on charge les fantômes
        let positionFantomes = this.chargerObjet('ennemi', this.map, 'Objets');
        for (var i = 0; i < positionFantomes.length; i++) {
            fantome = this.fantomes.create(positionFantomes[i].x, positionFantomes[i].y, 'ghost');
            fantome.body.collideWorldBounds = true;
            fantome.body.width = 20;
            fantome.body.height = 40;
            fantome.anchor.setTo(0.5);
            fantome.enableBody = true;
        }

        // On ajoute l'animation de déplacements à tous nos fantômes
        this.fantomes.callAll('animations.add', 'animations', 'up', [9, 10, 11], 10, true);
        this.fantomes.callAll('animations.add', 'animations', 'down', [0, 1, 2], 10, true);
        this.fantomes.callAll('animations.add', 'animations', 'left', [3, 4, 5], 10, true);
        this.fantomes.callAll('animations.add', 'animations', 'right', [6, 7, 8], 10, true);
        this.fantomes.callAll('play', null, 'down');
    },

    // Dans cette fonction on instancie notre personnage principal
    creationPersonnage: function() {
        // On récupère la position de départ du personnage sur la carte dans le layer Objets
        let positionJoueur = this.chargerObjet('entreeJoueur', this.map, 'Objets');

        // On crée le personnage
        this.personnage = this.game.add.sprite(positionJoueur[0].x, positionJoueur[0].y, 'personnage');

        // On anime le personnage
        this.personnage.animations.add('up', [9, 10, 11], 10, true);
        this.personnage.animations.add('down', [0, 1, 2], 10, true);
        this.personnage.animations.add('left', [3, 4, 5], 10, true);
        this.personnage.animations.add('right', [6, 7, 8], 10, true);

        // On ajoute le personnage créé dans le moteur physique du jeu
        this.game.physics.arcade.enable(this.personnage);

        // On souhaite que la caméra suive les déplacements du personnage
        this.game.camera.follow(this.personnage);

        // Détection des touches directionnelles
        this.cursors = this.game.input.keyboard.createCursorKeys();

        // On gère la collision entre le personnage et le terrain impassible
        this.game.physics.arcade.collide(this.personnage, this.terrain);

        // Le joueur entre en collision avec les bornes de la carte
        this.personnage.body.collideWorldBounds = true;

        // On amincit un peu le personnage
        this.personnage.body.width = 20;
        this.personnage.body.height = 50;
        this.personnage.anchor.setTo(0.5);
        this.personnage.enableBody = true;
    },

    // Annulation de la méthode du timer non fonctionnelle

    // // Dans cette fonction on instancie notre timer
    // creationTimer: function(){
    //     // Démarrage
    //     this.depart = new Date();
    //
    //     // On affiche un message en haut au centre
    //     this.temoinTempsEcoule = this.game.add.text(this.game.world.centerX, 100, "00s", {font: "100px Arial", fill: "#fff"});
    //     this.temoinTempsEcoule.anchor.setTo(0.5, 0);
    //     this.temoinTempsEcoule.align = 'center';
    // },
    //
    // updateTimer: function(){
    //     // On prend la date de maintenant et on calcul la différence
    //     let maintenant = new Date();
    //
    //     let difference = this.depart.getTime() - maintenant.getTime();
    //
    //     // En secondes (sinon on a des ms, c'est pas cool)
    //     let tempsEcoule = Math.floor(Math.abs(difference / 1000));
    //
    //     // Pour faire plus propre on ajoute un 0
    //     let texte = (tempsEcoule < 10) ? '0' + tempsEcoule : tempsEcoule;
    //
    //     // On met à jour le message
    //     this.temoinTempsEcoule.text = texte + 's';
    // }
}
