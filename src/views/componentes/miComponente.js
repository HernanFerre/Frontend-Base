/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { getByDescription, getById } from "../../redux/art/actions";

const ART_BY_ID = "art.byId.timeStamp";
const ART_BY_DESCRIPTION = "art.byDescription.timeStamp";

export class MiComponente extends connect(store, ART_BY_ID, ART_BY_DESCRIPTION)(LitElement) {
    constructor() {
        super();
        this.hidden = false;
        this.item = {};
        this.itemByDescription = {};
    }
    static get styles() {
        return css`
            div {
                color: white;
            }
        `;
    }
    render() { // TAREA - ARMAR UNA GRID QUE MUESTRE LOS RESULTADOS
        return html`            
            <div>Mi Componente</div> 
            <button @click="${() => store.dispatch(getById("fb630bcd-0c63-4938-8541-e646961bf4ed"))}">Buscar por ID</button>
            <div>${this.item.descripcion}</div>
            <div>${this.item.id}</div>

            <div>
                <label>Buscar por Descripcion</label>
                <input id="descripcion"/>
                <button @click ="${this.buscar}">Buscar Por Descripcion</button>
                <div>${this.itemByDescription.descripcion}</div>
                <div>${this.itemByDescription.id}</div>
            </div>
            
        `;
    }

    buscar() {
        let descripcion = this.shadowRoot.querySelector("#descripcion").value;
        store.dispatch(getByDescription(descripcion))
    }

    stateChanged(state, name) {
        if (name == ART_BY_ID) {
            this.item = state.art.entity;
        }
        if (name == ART_BY_DESCRIPTION) { 
            this.itemByDescription = state.art.byDescription.entityByDescription[0];
        }
           
    }
    
    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
            item: {
                type: Object,
            },
            itemByDescription: {
                type: Object,
            }
    
        };
    }
}
window.customElements.define("mi-componente", MiComponente);
