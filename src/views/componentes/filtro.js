/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { SEARCH, CANCEL, EQUIS } from "../../../assets/icons/svgs";
import { filtrar } from "../../redux/ui/actions";

export class FiltroControl extends connect(store)(LitElement) {
    constructor() {
        super();
        this.hidden = false;
        this.texto = "";
    }
    static get styles() {
        return css`
            ${button}
            ${input}
            ${gridLayout}
            :host[hidden] {
                display: none;
            }
            :host {
                display: grid;
                grid-auto-flow: column;
                place-content: start;
            }
        `;
    }
    render() {
        return html`
            <div class="input">
                <input @input="${this.filtrar}" class="grid center" id="texto" .value=${this.texto} />
            </div>
            <button flat @click="${this.filtrar}">${SEARCH}</button>
            <button flat @click="${this.limpiar}">${EQUIS}</button>
        `;
    }

    filtrar() {
        this.texto = this.shadowRoot.querySelector("#texto").value;
        store.dispatch(filtrar(this.texto));
    }

    limpiar() {
        this.texto = "";
        store.dispatch(filtrar(this.texto));
    }

    stateChanged(state, name) {}

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
            texto: {
                type: String,
            },
        };
    }
}
window.customElements.define("filtro-control", FiltroControl);
