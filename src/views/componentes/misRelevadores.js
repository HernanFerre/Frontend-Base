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
import { showAlert, showError } from "../../redux/ui/actions";
import { CANCELAR, CHECK, MAS, DELETE } from "../../../assets/icons/svgs";

const RELEVADOR_GET_ALL = "relevador.all.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class MisRelevadores extends connect(store, RELEVADOR_GET_ALL, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.relevadorId = null;
        this.userId = null;
        this.item = {};
        this.itemByDescription = {};
        this.relevadores = [];
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
                --ancho-id: 12rem;
                --ancho-email: 12rem;
                --ancho-nombre: 8rem;
                --ancho-apellido: 8rem;
                --ancho-usuarioid: 12rem;
                --ancho-departamento: 6rem;
                --ancho-nombreusuario: 6rem;
                --ancho-boton: 3rem;
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
                gap: 0;
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
                grid-template-columns: var(--ancho-id) var(--ancho-email) var(--ancho-nombre) var(--ancho-apellido) var(--ancho-usuarioid) var(--ancho-departamento) var(--ancho-nombreusuario) 0 0;
                grid-gap: 0.5rem;
            }
            .item[modificando] {
                grid-template-columns:
                    var(--ancho-id) var(--ancho-email) var(--ancho-nombre) var(--ancho-apellido) var(--ancho-usuarioid) var(--ancho-departamento) var(--ancho-nombreusuario) var(--ancho-boton)
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
                    <button raised @click="${this.agregarOCancelar}" ?cancelar="${this.agregando == true || this.modificando == true}">${MAS}</button>
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
                            <div class="input">
                                <input
                                    .value="${relevador.id}"
                                    class="grid item"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <div class="input">
                                <input
                                    .value="${relevador.email}"
                                    class="grid item"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <div class="input">
                                <input
                                    .value="${relevador.nombre}"
                                    class="grid item"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <div class="input">
                                <input
                                    class="grid item"
                                    .value="${relevador.apellido}"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <div class="input">
                                <input
                                    class="grid item"
                                    .value="${relevador.usuarioId}"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <div class="input">
                                <input
                                    class="grid item"
                                    .value="${relevador.departamento}"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <div class="input">
                                <input
                                    class="grid item"
                                    .value="${relevador.nombreDeUsuario}"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <button
                                flat
                                ?oculto="${!relevador.modificando}"
                                @click="${(e) => {
                                    this.guardar(e, relevador);
                                }}"
                            >
                                ${CHECK}
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

        // return html`

        //     <div>
        //         <h1>RELEVADORES</h1>
        //     </div>

        //     <div class="inner-grid fit18">
        //         <div class="input" style="grid-column: 1 / 9">
        //             <input id="buscarId" />
        //             <label for="buscarId">ID</label>
        //             <label subtext>Ingresá un ID para buscar</label>
        //             <div>${this.item.nombre}</div>
        //             <div>${this.item.apellido}</div>
        //             <div>${this.item.id}</div>
        //         </div>
        //         <button raised action style="grid-column: 2 / 8; align-self: center" @click="${this.buscarPorId}">Buscar por ID</button>
        //     </div>

        //     <div class="inner-grid fit18">
        //         <div class="input" style="grid-column: 1 / 9">
        //             <input id="buscarUserId" />
        //             <label for="buscarUserId">USER ID</label>
        //             <label subtext>Ingresá un ID de Usuario para buscar</label>
        //             <div>${this.item.nombre}</div>
        //             <div>${this.item.apellido}</div>
        //             <div>${this.item.id}</div>
        //         </div>
        //         <button raised action style="grid-column: 2 / 8; align-self: center" @click="${this.buscarPorUserId}">Buscar por User ID</button>
        //     </div>

        //     <div class="inner-grid fit18">
        //         <div style="grid-column: 3 / 7; align-self: center">
        //             Buscar Todos los Relevadores
        //             <button link action @click="${this.buscarTodos}" style="grid-column: 5 / 8">Buscar Todos</button>
        //         </div>
        //         <div style="grid-column: 1 / 18">
        //             <div class="results-grid">
        //                 <div class="header">ID</div>
        //                 <div class="header">email</div>
        //                 <div class="header">Nombre</div>
        //                 <div class="header">ID Usuario</div>
        //                 <div class="header">Apellido</div>
        //                 <div class="header">Departamento</div>
        //                 <div class="header">Nombre De Usuario</div>
        //                 ${this.items?.map(
        //                     (relevador) => html`
        //                         <div>${relevador.id}</div>
        //                         <div>${relevador.email}</div>
        //                         <div>${relevador.nombre}</div>
        //                         <div>${relevador.usuarioId}</div>
        //                         <div>${relevador.apellido}</div>
        //                         <div>${relevador.departamento}</div>
        //                         <div>${relevador.nombreDeUsuario}</div>
        //                     `
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // `;
    }

    agregarOCancelar() {
        if (this.agregando || this.modificando) {
            this.modificando = false;
            this.agregando = false;

            this.relevadores.forEach((relevador) => {
                relevador.modificando = false;
            });

            const relevador = this.relevadores;
            this.relevadores = [];
            this.update();
            this.relevadores = relevador;
            this.update();
            return;
        }

        this.agregando = true;
        this.shadowRoot.querySelector("#ultimo")?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end",
        });
        this.shadowRoot.querySelector("#input-agregar").value = "";
        this.update();
    }

    editando(e) {
        let anterior = this.shadowRoot.querySelector("[modificando]");
        if (anterior) anterior.relevador.modificando = false;

        let padre = e.currentTarget.parentElement;
        while (padre) {
            if (padre.relevador) {
                padre.relevador.modificando = true;
                break;
            } else {
                padre = padre.parentElement;
            }
        }
        this.modificando = true;
        this.esEliminable = false;
        this.update();
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
            this.hidden = true;
            const isCurrentScreen = ["Relevadores"].some((s) => s == state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == RELEVADOR_GET_ALL) {
            this.relevadores = state.relevador.entities;
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
            mediaSize: {
                type: String,
            },
            area: {
                type: String,
            },
        };
    }
}
window.customElements.define("mis-relevadores", MisRelevadores);
