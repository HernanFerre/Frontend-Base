/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { getArt, getByDescription, getById, updateArt } from "../../redux/art/actions";

const ART_BY_ID = "art.byId.timeStamp";
const ART_BY_DESCRIPTION = "art.byDescription.timeStamp";
const ART_ALL = "art.all.timeStamp";
const ART_UPDATE = "art.updateArt.timeStamp"

export class MiComponente extends connect(store, ART_BY_ID, ART_BY_DESCRIPTION, ART_ALL, ART_UPDATE)(LitElement) {
    constructor() {
        super();
        this.hidden = false;
        this.item = {};
        this.itemByDescription = {};
        this.items = []
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
            <button @click="${this.buscarPorId}">Buscar por ID</button>
            <input id="buscarId"/>
            <div>${this.item.descripcion}</div>
            <div>${this.item.id}</div>

            <div>
                <label>Buscar por Descripcion</label>
                <input id="descripcion"/>
                <button @click ="${this.buscar}">Buscar Por Descripcion</button>
                <div>${this.itemByDescription.descripcion}</div>
                <div>${this.itemByDescription.id}</div>
            </div>

            <div>
                <button @click = "${this.modificar}">Modificar</button>
            </div>

            <div>
                <label>ART Buscar TODOS</label>                
                <button @click ="${this.buscarTodos}">Buscar  Todos</button>

            </div>

            ${this.items?.map(
            (art) => html`
                <div>${art.descripcion}</div>
                <div>${art.id}</div>
              `
        )}
            
        `;
    }

    modificar() {
        let id = this.shadowRoot.querySelector("#buscarId").value;
        let descripcion = this.shadowRoot.querySelector("#descripcion").value;
        let body = {
            id: id,
            descripcion: descripcion
        }
        store.dispatch(updateArt(body))

    }

    buscar() {
        let descripcion = this.shadowRoot.querySelector("#descripcion").value;
        store.dispatch(getByDescription(descripcion))
    }

    buscarTodos() {
        store.dispatch(getArt())
    }

    buscarPorId() {
        let id = this.shadowRoot.querySelector("#buscarId").value;
        store.dispatch(getById(id))

    }

    stateChanged(state, name) {
        if (name == ART_BY_ID) {
            this.item = state.art.entity;
        }
        if (name == ART_BY_DESCRIPTION) {
            this.itemByDescription = state.art.byDescription.entityByDescription[0];
        }
        if (name == ART_ALL) {
            this.items = state.art.entities;
        }
        if (name == ART_UPDATE) {
            this.buscarTodos()
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
            },
            items: {
                type: Array,
            }

        };
    }
}
window.customElements.define("mi-componente", MiComponente);
