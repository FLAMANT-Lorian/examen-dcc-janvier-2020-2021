export class Player { // les classes servent à générer des objets, c'est une usine à objet
    name;
    score;
    constructor(name) { // méthode qui est appelé quand on fait "new" suivi du nom de la classe
        this.name = name;
        this.score = 0;
    }
}