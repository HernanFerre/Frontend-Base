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

export class MisRelevadores extends connect(store, FILTRO, RELEVADOR_GET_ALL, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.relevadorId = null;
        this.userId = null;
        this.item = {};
        this.itemByDescription = {};
        this.relevadores = [];
        this.relevadoresBk = [];
        this.mediaSize = null;
        this.area = "body";
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${select}
            ${check}
            ${button}

            :host {
                background-color: var(--formulario);
                grid-auto-flow: row;
                border-radius: 0.5rem 0.5rem 0 0;
                box-shadow: var(--shadow-elevation-3-box);
                grid-gap: 0 !important;
                grid-template-rows: auto 1fr;
                place-self: center;

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
                background: var(--formulario);
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
            .contenedor {
                color: var(--on-formulario);
                height: 65vh;
                overflow-y: auto;
                overflow-x: hidden;
                background-color: var(--aplicacion);
                padding: 0;
                gap: 0.1rem;
                align-content: start;
            }
            .contenedor::-webkit-scrollbar {
                width: 0.5rem;
                height: 0.5rem;
            }
            .contenedor::-webkit-scrollbar-thumb {
                background: var(--secundario10);
                border-radius: 4px;
            }
            .contenedor::-webkit-scrollbar-track {
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
                background-color: var(--formulario);
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
        `;
    }

    render() {
        return html`
            <div class="inner-grid fit-10 cabecera column">
                <div></div>
                <div class="grid center"><h2>Relevadores</h2></div>
                <div class="grid end">
                    <button
                        raised
                        @click="${(e) => {
                            this.addRelevador();
                        }}"
                    >
                        ${MAS}
                    </button>
                </div>
            </div>

            <div class="contenedor fit-10 grid">
                <div class="grid item" id="ultimo" ?oculto="${!this.agregando}" ?modificando=${this.agregando}>
                    <div class="input">
                        <input class="grid center" ?oculto="${!this.agregando}" id="input-agregar" />
                    </div>
                    <button flat ?oculto="${this.agrengado}" @click="${this.agregar}">${CHECK}</button>
                </div>
                ${this.relevadores.map(
                    (relevador) =>
                        html` <div class="grid item" ultimoid="${relevador.id}" .relevador=${relevador} ?modificando=${relevador.modificando}>
                            <div data-label="Email">${relevador.email}</div>
                            <div data-label="Nombre">${relevador.nombre}</div>
                            <div data-label="Apellido">${relevador.apellido}</div>
                            <div data-label="Departamento">${relevador.departamento}</div>
                            <div data-label="Usuario">${relevador.nombreDeUsuario}</div>
                            <button
                                flat
                                @click="${(e) => {
                                    this.editar(e, relevador);
                                }}"
                            >
                                ${MODIF}
                            </button>
                            <button
                                class="eliminable"
                                flat
                                ?oculto="${!relevador.modificando}"
                                @click="${(e) => {
                                    this.eliminar(e, relevador);
                                }}"
                            >
                                ${DELETE}
                            </button>
                        </div>`
                )}
            </div>
        `;
    }

    editar(e, relevador) {
        store.dispatch(editarRelevador(relevador));
    }
    addRelevador() {
        store.dispatch(agregarRelevador({ apellido: "", nombre: "", email: "" }));
    }

    firstUpdated() {
        this.buscarTodos();
    }

    buscarTodos() {
        store.dispatch(getRelevador());
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.orientation = state.ui.media.orientation;
            this.hidden = true;
            const isCurrentScreen = ["Relevadores"].some((s) => s == state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
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

        if (name == FILTRO) {
            if (!this.hidden) {
                if (state.ui.filtros.texto != "") {
                    this.relevadores = this.relevadoresBk.filter((a) => (a.apellido + " " + a.nombre + " " + a.email).toUpperCase().indexOf(state.ui.filtros.texto.toUpperCase()) != -1);
                } else {
                    this.relevadores = [...this.relevadoresBk];
                }
            }
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
window.customElements.define("mis-relevadores", MisRelevadores);
