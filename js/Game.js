// Si l'objet SurvivalHorror n'existe pas on le crée
var SurvivalHorror = SurvivalHorror || {};

// Déclaration de l'état Preload
SurvivalHorror.Game = function () {};

SurvivalHorror.Game.prototype = {

    // Cette fonction sert à créer l'état de Game
    create: function() {
        // On appelle la carte
        this.map = this.game.add.tilemap('carte');

        // On déclare les tileSets utilisés tels quels définis dans le logiciel Tiled
        this.map.addTilesetImage('tilesetHouse', 'tilesetHouse');
        this.map.addTilesetImage('breakout_spritesheet', 'breakout_spritesheet');
        this.map.addTilesetImage('car', 'car');

        // Il y a des limites à tout...
        this.game.world.setBounds(0, 0, 800, 800);

        // On créé maintenant les couches à partir des noms choisis dans le logiciel Tiled lors de leur création
        this.base = this.map.createLayer('Base');
        this.terrain = this.map.createLayer('Terrain');
        this.terrain.visible = false;

        // On active les collisions avec la couche Terrain (le nombre max ici est en fait 156 cf. carteOK.json, on prend 200 pour être serein)
        this.map.setCollisionBetween(1, 2000, true, 'Terrain');

        // On redimensionne notre application pour correspondre aux dimensions de Base
        this.base.resizeWorld();

        // On récupère la position de départ du personnage sur la carte dans le layer Objets
        var positionJoueur = this.findObjectsByType('entreeJoueur', this.map, 'Objets');

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

        // On initialise le score du joueur à 0
        this.score = 0;
    },

    // Cette fonction permet de régulièrement contrôler ce qui se passe
    update: function() {

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
            // this.personnage.frame = 11;

            // On ne veut pas de déplacement en diagonal
            this.personnage.body.velocity.x = 0;
        }
        // Flèche bas
        else if(this.cursors.down.isDown) {
            // On incrémente la vitesse de déplacement du personnage en fonction
            this.personnage.body.velocity.y = 100;

            // On anime le déplacement du personnage
            this.personnage.animations.play('down');
            // this.personnage.frame = 2;

            // On ne veut pas de déplacement en diagonal
            this.personnage.body.velocity.x = 0;
        }
        // Flèche gauche
        if(this.cursors.left.isDown) {
            // On incrémente la vitesse de déplacement du personnage en fonction
            this.personnage.body.velocity.x = -100;

            // On anime le déplacement du personnage
            this.personnage.animations.play('left');
            // this.personnage.frame = 5;

            // On ne veut pas de déplacement en diagonal
            this.personnage.body.velocity.y = 0;
        }
        // Flèche droite
        else if(this.cursors.right.isDown) {
            // On incrémente la vitesse de déplacement du personnage en fonction
            this.personnage.body.velocity.x = 100;

            // On anime le déplacement du personnage
            this.personnage.animations.play('right');
            // this.personnage.frame = 8;

            // On ne veut pas de déplacement en diagonal
            this.personnage.body.velocity.y = 0;
        }
    },

    findObjectsByType: function(type, map, layer) {
        var result = new Array();

        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });

        return result;
    },

    createFromTiledObject: function(element, group) {
        // On crée un sprite depuis l'objet passé en paramètre
        var sprite = group.create(element.x, element.y, element.properties.sprite);

        // On copie toutes les propriétés dans le sprite
        Object.keys(element.properties).forEach(function(key){
            sprite[key] = element.properties[key];
        });
    },



}
