const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#0632f5',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#1fa304',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};


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
            const article = document.createElement('article');
            article.innerHTML = `
                <figure>
                    <picture>
                        <img src="${pokemon.sprites.regular}" alt="Image ${pokemon.name.fr}" />
                    </picture>
                    <figcaption>
                        <span class="types">${pokemon.types[0].name}</span>
                        <h2>${pokemon.name.fr}</h2>
                        <ol>
                            <li>Points de vie : ${pokemon.stats.hp}</li>
                            <li>Attaque : ${pokemon.stats.atk}</li>
                            <li>Défense : ${pokemon.stats.def}</li>
                            <li>Attaque spéciale : ${pokemon.stats.spe_atk}</li>
                            <li>Vitesse : ${pokemon.stats.vit}</li>
                        </ol>
                    </figcaption>
                </figure>`;

            mainElement.appendChild(article);

            const type = pokemon.types[0].name;
            switch (type) {
                    case "Normal":
                        article.style.backgroundColor = colours.normal;
                        article.style.borderColor = colours.normal;
                        break;
                    case "Feu":
                        article.style.backgroundColor = colours.fire;
                        article.style.borderColor = colours.fire;
                        break;
                    case "Eau":
                        article.style.backgroundColor = colours.water;
                        article.style.borderColor = colours.water;
                        break;
                    case "Électrik":
                        article.style.backgroundColor = colours.electric;
                        article.style.borderColor = colours.electric;
                        break;
                    case "Glace":
                        article.style.backgroundColor = colours.ice;
                        article.style.borderColor = colours.ice;
                        break;
                    case "Combat":
                        article.style.backgroundColor = colours.fighting;
                        article.style.borderColor = colours.fighting;
                        break;
                    case "Poison":
                        article.style.backgroundColor = colours.poison;
                        article.style.borderColor = colours.poison;
                        break;
                    case "Plante":
                        article.style.backgroundColor = colours.grass;
                        article.style.borderColor = colours.grass;
                        break;
                    case "Sol":
                        article.style.backgroundColor = colours.ground;
                        article.style.borderColor = colours.ground;
                        break;
                    case "Vol":
                        article.style.backgroundColor = colours.flying;
                        article.style.borderColor = colours.flying;
                        break;
                    case "Psy":
                        article.style.backgroundColor = colours.psychic;
                        article.style.borderColor = colours.psychic;
                        break;
                    case "Insecte":
                        article.style.backgroundColor = colours.bug;
                        article.style.borderColor = colours.bug;
                        break;
                    case "Roche":
                        article.style.backgroundColor = colours.rock;
                        article.style.borderColor = colours.rock;
                        break;
                    case "Spectre":
                        article.style.backgroundColor = colours.ghost;
                        article.style.borderColor = colours.ghost;
                        break;
                    case "Dragon":
                        article.style.backgroundColor = colours.dragon;
                        article.style.borderColor = colours.dragon;
                        break;
                    case "Ténèbres":
                        article.style.backgroundColor = colours.dark;
                        article.style.borderColor = colours.dark;
                        break;
                    case "Acier":
                        article.style.backgroundColor = colours.steel;
                        article.style.borderColor = colours.steel;
                        break;
                    case "Fée":
                        article.style.backgroundColor = colours.fairy;
                        article.style.borderColor = colours.fairy;
                        break;
                    default :
                        article.style.backgroundColor = "gray";
                        article.style.borderColor = "gray";
                }
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

