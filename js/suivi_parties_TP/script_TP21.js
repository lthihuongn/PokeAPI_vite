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

class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.image = data.image;
        this.name = data.name;
        this.arrTypes = data.types.map(type =>
            type instanceof Type ? type : new Type(type.name, type.image)
        );
        this.attack = data.attack;
        this.defense = data.defense;
        this.hp = data.hp;
        this.specialAttack = data.specialAttack;
        this.speed = data.speed;
    }

    displayCard() {
        const article = document.createElement('article');
        const type = this.arrTypes[0];

        article.style.backgroundColor = type?.color || 'gray';
        article.style.borderColor = type?.color || 'gray';
        article.innerHTML = `
            <figure>
                <picture>
                    <img src="${this.image}" alt="Image ${this.name}" />
                </picture>
                <figcaption>
                    <span class="types">${this.arrTypes[0].name}</span>
                    <h2>${this.name}</h2>
                    <ol>
                        <li>Points de vie : ${this.hp}</li>
                        <li>Attaque : ${this.attack}</li>
                        <li>Défense : ${this.defense}</li>
                        <li>Attaque spéciale : ${this.specialAttack}</li>
                        <li>Vitesse : ${this.speed}</li>
                    </ol>
                </figcaption>
            </figure>`;

        return article;
    }
}

class Type {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.color = this.getColorHexa();
    }

    getColorHexa() {
        return colours[this.name] || 'gray';
    }
}


async function loadData(nbGeneration, selectedType, selectedCritere) {
    const reponse = await fetch(`https://tyradex.app/api/v1/gen/${nbGeneration}`);
    let data = await reponse.json();

    //buttons
    if (selectedType) {
            data = data.filter(pokemon => pokemon.types.some(type => type.name === selectedType));
    }

    //critères
    if(selectedCritere) {
        data = data.sort((a, b) => {
            switch(selectedCritere) {
                case "1":
                    return a.name.fr.localeCompare(b.name.fr);
                case "2":
                    return b.stats.hp - a.stats.hp;
                case "3":
                    return b.stats.atk - a.stats.atk;
                case "4":
                    return a.types[0].name.localeCompare(b.types[0].name);
                case "5":
                    return b.stats.def - a.stats.def;
                case "6":
                    return b.stats.spe_atk - a.stats.spe_atk;
                case "7":
                    return b.stats.vit - a.stats.vit;
                default:
                    return 0;
            }
        })
    }


    const mainElement = document.querySelector('main');
    mainElement.replaceChildren();

        data.forEach((pokemon) => {
            const pokemonCard = new Pokemon({
                id: pokemon.pokedex_id,
                image: pokemon.sprites.regular,
                name: pokemon.name.fr,
                types: pokemon.types,
                hp: pokemon.stats.hp,
                attack: pokemon.stats.atk,
                defense: pokemon.stats.def,
                specialAttack: pokemon.stats.spe_atk,
                speed: pokemon.stats.vit,
            });
            const article = pokemonCard.displayCard();

            mainElement.appendChild(article);
        });
        
}

document.addEventListener('DOMContentLoaded', () => {
    const generationSelect = document.querySelector('#filtre select');
    const critereSelect = document.querySelector('#tri select');
    let selectedGeneration = generationSelect.value;
    let selectedType = null;
    let selectedCritere = critereSelect.value;

    generationSelect.addEventListener('change', (event) => {
        selectedGeneration = event.target.value;
        loadData(selectedGeneration, selectedType, selectedCritere);
    });

    // critères select

    critereSelect.addEventListener('change', (event) => {
        selectedCritere = event.target.value;
        loadData(selectedGeneration, selectedType, selectedCritere);
    });

    //types buttons

    const typeButtons = document.querySelectorAll('.type-button');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedType = button.querySelector('p').textContent;

            // Correction du nom du type "Électrique" en "Électrik", les autres nom de types correspondent à ceux de l'API
            if (selectedType === 'Électrique') {
                selectedType = 'Électrik';
            }
            loadData(selectedGeneration, selectedType, selectedCritere);
        });
    });

});

loadData(1, null, '1');

