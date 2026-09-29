const colours = {
    Normal: '#A8A77A',
    Feu: '#EE8130',
    Eau: '#0632f5',
    Électrik: '#F7D02C',
    Plante: '#7AC74C',
    Glace: '#96D9D6',
    Combat: '#C22E28',
    Poison: '#A33EA1',
    Sol: '#1fa304',
    Vol: '#A98FF3',
    Psy: '#F95587',
    Insecte: '#A6B91A',
    Roche: '#B6A136',
    Spectre: '#735797',
    Dragon: '#6F35FC',
    Ténèbres: '#705746',
    Acier: '#B7B7CE',
    Fée: '#D685AD',
};

export class Type {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.color = this.getColorHexa();
    }

    getColorHexa() {
        return colours[this.name] || 'gray';
    }
}