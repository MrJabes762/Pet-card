const template = document.createElement("template");

template.innerHTML = `
    <div class="pet-card">
        <div class="avatar">
            <img> </img>
        </div>
        <div class="detalhes">
            <h2></h2>
            <div class="informocoes">
                <p>Raça: <slot name="Beagle"></slot></p>
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
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    static get observeAtributes (){
        return ("name", "avatar");
    }
    attributeChangedCallback (name, oldValue, newValue){
        this.shadowRoot.querySelector(".detallhes h2").innerHTML = 
            this.getAttribute("name");
        this.shadowRoot.querySelector(".avatar img").src = 
            this.getAttribute("avatar");
        this.shadowRoot.querySelector(".avatar img").alt = 
            this.getAttribute("name");
    }
}