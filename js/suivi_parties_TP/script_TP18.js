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


const mainElement = document.querySelector('main');

fetch('./data/data.json')
    .then((response) => response.json())
    .then((data) => {

        data.forEach((pokemon) => {
            const article = document.createElement('article');
            article.innerHTML = `
                <figure>
                    <picture>
                        <img src="${pokemon.image}" alt="Image ${pokemon.name}" />
                    </picture>
                    <figcaption>
                        <span class="types">${pokemon.apiTypes[0].name}</span>
                        <h2>${pokemon.name}</h2>
                        <ol>
                            <li>Points de vie : ${pokemon.stats.HP}</li>
                            <li>Attaque : ${pokemon.stats.attack}</li>
                            <li>Défense : ${pokemon.stats.defense}</li>
                            <li>Attaque spéciale : ${pokemon.stats.special_attack}</li>
                            <li>Vitesse : ${pokemon.stats.speed}</li>
                        </ol>
                    </figcaption>
                </figure>`;

            mainElement.appendChild(article);

            const type = pokemon.apiTypes[0].name;
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
                    case "Herbe":
                        article.style.backgroundColor = colours.grass;
                        article.style.borderColor = colours.grass;
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
                    case "Nuit":
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
    })
    .catch (error => alert('Erreur lors du chargement des données : ' + error.message));
