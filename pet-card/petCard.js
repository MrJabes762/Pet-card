const template = document.createElement("template");

template.innerHTML = `
    <div class="pet-card">
        <div class="avatar">
            <img />
        </div>
        <div class="detalhes">
            <h2></h2>
            <div class="info">
                <p>Breed: <slot name="Beagle"></slot></p>
                <p>Idade: <slot name="idade"></slot></p>
            </div>
            <div class="actions">
                <button id="greet">Olá</button>
                <button id="toggle">Mostrar detalhes</button>
            </div>
        </div>
    </div>
`;

export default class PetCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneMode(true));
    }
}