/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { getRelevador, getRelevadorById, getRelevadorByUserId } from "../../redux/relevador/actions";
import { agregarRelevador, editarRelevador, showAlert, showError } from "../../redux/ui/actions";
import { CANCELAR, CHECK, MAS, DELETE, MODIF } from "../../../assets/icons/svgs";

const RELEVADOR_GET_ALL = "relevador.all.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const EDITAR_RELEVADOR = "relevador.byId.timeStamp";
const FILTRO = "ui.filtros.timeStamp";
const MOSTRAR_COMBO = "ui.mostrarCombo.timeStamp";
const OCULTAR_COMBO = "ui.ocultarCombo.timeStamp";

export class ComboRelevadores extends connect(store, MOSTRAR_COMBO, OCULTAR_COMBO, RELEVADOR_GET_ALL, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.relevadorId = null;
        this.userId = null;
        this.item = {};
        this.itemByDescription = {};
        this.relevadores = [];
        this.relevadoresBk = [];
        this.mediaSize = null;
        this.hidden = true;
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${select}
            ${check}
            ${button}

            :host {
                color: var(--on-formulario);
                height: 65vh;
                overflow-y: auto;
                overflow-x: hidden;
               
                padding: 0;
                gap: 0.1rem;
                align-content: start;
               z-index:100;


                --ancho-email: 12rem;
                --ancho-nombre: 8rem;
                --ancho-apellido: 8rem;
                --ancho-departamento: 6rem;
                --ancho-nombreusuario: 6rem;
                --ancho-boton: 3rem;
            }
            /* --- Layout responsive para móviles --- */
            :host([media-size="small"]) .item {
                display: grid;
                grid-template-columns: 1fr;
                justify-content: stretch;
                padding: 0.6rem 0.8rem;
                gap: 0.25rem;
                border-radius: 0.4rem;
                border: 1px solid var(--borde);
                background: var(--aplicacion);
                box-shadow: var(--shadow-elevation-1-box);
                height: auto;
                margin: 0;
            }

            :host([media-size="small"]) .item > div {
                font-size: 1.2rem;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid var(--borde-claro);
                width: 100%;!Important;
            }
            :host([media-size="small"]) .item > div:last-child {
                border: none;
            }

            :host([media-size="small"]) .item > div::before {
                content: attr(data-label) ": ";
                font-weight: 600;
                color: var(--primario);
            }

            :host([media-size="small"]) .item button {
                justify-self: center;
                width: 3rem;
                height: 3rem;
                padding: 0.25rem;
            }

            :host([media-size="small"]) .contenedor {
                display: grid;
                justify-self: stretch;
            }

            :host([hidden]) {
                display: none;
            }
            *[hidden] {
                display: none;
            }
            *[oculto] {
                height: 0 !important;
                width: 0 !important;
                padding: 0 !important;
                opacity: 0;
                z-index: -10;
            }

            .cabecera {
                color: var(--on-formulario-bajada);
                grid-template-columns: 0.5fr 1fr 0.5fr;
                border-bottom: 1px solid var(--velo);
            }

            .host::-webkit-scrollbar {
                width: 0.5rem;
                height: 0.5rem;
            }
            .host::-webkit-scrollbar-thumb {
                background: var(--secundario10);
                border-radius: 4px;
            }
            .host::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 4px;
            }
            .cabecera div button {
                padding: 0.25rem;
                width: 2.75rem;
            }
            .item {
                height: 3rem;
                transition: 0.5s ease;
                overflow: none;
                grid-template-columns: var(--ancho-email) var(--ancho-nombre) var(--ancho-apellido) var(--ancho-departamento) var(--ancho-nombreusuario) var(--ancho-boton);
                grid-gap: 0.5rem;
                background: var(--aplicacion);
            }
            .item[modificando] {
                grid-template-columns:
                    var(--ancho-email) var(--ancho-nombre) var(--ancho-apellido) var(--ancho-departamento) var(--ancho-nombreusuario) var(--ancho-boton)
                    var(--ancho-boton);
                grid-gap: 0.5rem;
            }
            .item button {
                width: var(--ancho-boton);
                padding: 0.25rem;
            }
            button[flat] svg {
                fill: var(--primario);
            }
            button[flat]:hover svg {
                fill: var(--on-primario);
            }
            button[flat]:focus svg {
                fill: var(--on-primario);
            }

            select[disabled] {
                opacity: 1 !important;
                cursor: inherit;
                background-image: none !important;
            }
            .cabecera button svg {
                transition: 0.3s;
            }
            button[cancelar] {
                background-color: var(--error) !important;
            }
            button[cancelar] svg {
                transform: rotate(45deg);
            }
            .item[nuevo] {
                opacity: 0.3;
            }
            .item:hover{
                background-color:var(--primario);
            }
        `;
    }

    render() {
        return html`
            ${this.relevadores.map(
                (relevador) =>
                    html` <div tabindex="0" class="grid item" ultimoid="${relevador.id}" .relevador=${relevador} ?modificando=${relevador.modificando}>
                        <div data-label="Email">${relevador.email}</div>
                        <div data-label="Nombre">${relevador.nombre}</div>
                        <div data-label="Apellido">${relevador.apellido}</div>
                        <div data-label="Departamento">${relevador.departamento}</div>
                        <div data-label="Usuario">${relevador.nombreDeUsuario}</div>
                    </div>`
            )}
        `;
    }

    firstUpdated() {
        this.buscarTodos();
    }

    buscarTodos() {
        store.dispatch(getRelevador());
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.orientation = state.ui.media.orientation;
            //this.hidden = true;
        }

        if (name == RELEVADOR_GET_ALL) {
            this.relevadores = state.relevador.entities;
            this.relevadoresBk = [...this.relevadores];
            this.update();
            if (this.relevadorId != null) {
                let div = this.shadowRoot.querySelector('*[ultimoid="' + this.relevadorId + '"]');
                div?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "end",
                });
                div.toggleAttribute("nuevo");
                setTimeout(() => {
                    div.toggleAttribute("nuevo");
                }, 750);

                this.relevadorId = null;
            }
        }

        if (name == MOSTRAR_COMBO) {
            if (this.id == state.ui.mostrarCombo.dato) {
                this.hidden = false;
            }
        }
        if (name == OCULTAR_COMBO) {
            if (this.id == state.ui.ocultarCombo.dato) {
                console.log(this.shadowRoot.activeElement);
                if (this.shadowRoot.activeElement == null) {
                    this.hidden = true;
                } else {
                    console.log(this.shadowRoot.activeElement.relevador);
                }
            }
        }

        /* if (name == FILTRO) {
            if (!this.hidden) {
                if (state.ui.filtros.texto != "") {
                    this.relevadores = this.relevadoresBk.filter((a) => (a.apellido + " " + a.nombre + " " + a.email).toUpperCase().indexOf(state.ui.filtros.texto.toUpperCase()) != -1);
                } else {
                    this.relevadores = [...this.relevadoresBk];
                }
            }
        } */
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
            relevadores: {
                type: Array,
            },
            relevadoresBk: {
                type: Array,
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            orientation: {
                type: String,
                reflect: true,
            },
            area: {
                type: String,
            },
        };
    }
}
window.customElements.define("combo-relevadores", ComboRelevadores);
