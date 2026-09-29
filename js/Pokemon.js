import { Type } from './Types.js';

export class Pokemon {
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