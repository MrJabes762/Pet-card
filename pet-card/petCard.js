const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="./css/style.css">
    <div class="pet-card">
        <div class="avatar">
            <img />
        </div>
        <div class="detalhes">
            <h2></h2>
            <div class="informacoes">
                <p>Raça: <slot name="Raça"></slot></p>
                <p>Idade: <slot name="idade"></slot></p>
            </div>
            <div class="acoes">
                <button id="greet">Olá</button>
                <button id="toggle">Mostrar detalhes</button>
            </div>
        </div>
    </div>
`;

export default class PetCard extends HTMLElement {
    constructor() {
        super();
        this.mostrarInformacoes = false;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Bind the toggleInformacoes function to the instance
        this.toggleInformacoes = this.toggleInformacoes.bind(this);
        this.greet = this.greet.bind(this);
    }

    static get observedAttributes() {
        return ["name", "avatar"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "name") {
            this.shadowRoot.querySelector(".detalhes h2").textContent = newValue;
            this.shadowRoot.querySelector(".avatar img").alt = newValue;
        }
        if (name === "avatar") {
            this.shadowRoot.querySelector(".avatar img").src = newValue;
        }
    }

    toggleInformacoes() {
        this.mostrarInformacoes = !this.mostrarInformacoes;
        const infoSection = this.shadowRoot.querySelector(".informacoes");
        infoSection.style.display = this.mostrarInformacoes ? "block" : "none";
        this.shadowRoot.querySelector("#toggle").textContent = this.mostrarInformacoes ? "Esconder Detalhes" : "Mostrar Detalhes";
    }

    greet() {
        alert("Olá amigo " + this.getAttribute("name"));
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#toggle").addEventListener("click", this.toggleInformacoes);
        this.shadowRoot.querySelector("#greet").addEventListener("click", this.greet);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("#toggle").removeEventListener("click", this.toggleInformacoes);
        this.shadowRoot.querySelector("#greet").removeEventListener("click", this.greet);
    }
}
