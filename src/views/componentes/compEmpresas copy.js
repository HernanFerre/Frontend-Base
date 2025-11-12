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
import { showAlert, showError } from "../../redux/ui/actions";
import { CANCELAR, CHECK, MAS, DELETE, EQUIS } from "../../../assets/icons/svgs";
import { deleteEmpresa, getAllEmpresas, updateEmpresa, addEmpresa } from "../../redux/empresa/actions";

const EMPRESAS_ALL = "empresa.all.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class Empresas extends connect(store, SCREEN, MEDIA_CHANGE, EMPRESAS_ALL)(LitElement) {
    constructor() {
        super();
        this.empresaAddId = null;
        this.item = {};
        this.itemByDescription = {};
        this.empresasItems = [];
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
                --ancho-descripcion: 40rem;
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
                grid-template-columns: var(--ancho-descripcion) 0 0;
                grid-gap: 0;
            }
            .item[modificando] {
                grid-template-columns: calc(var(--ancho-descripcion) - 2 * (var(--ancho-boton) + 0.5rem)) var(--ancho-boton) var(--ancho-boton);
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
            <div class="inner-grid cabecera column">
                <div></div>
                <div class="grid center"><h2>Empresas</h2></div>
                <div class="grid end">
                    <button raised @click="${this.agregarOCancelar}" ?cancelar="${this.agregando == true || this.modificando == true}">${MAS}</button>
                </div>
            </div>

            <div class="contenedor inner-grid">
                <div class="grid item" id="ultimo" ?oculto="${!this.agregando}" ?modificando=${this.agregando}>
                    <div class="input">
                        <input class="grid center" ?oculto="${!this.agregando}" id="input-agregar" />
                    </div>
                    <button flat ?oculto="${this.agregando}" @click="${this.agregar}">${CHECK}</button>
                </div>
                <div class="grid item column">
                    <div class="input filtro">
                        <input placeholder="Escriba su busqueda aqui" @input="${""}" class="grid center" id="texto" .value=${""} />
                    </div>
                </div>
                <button class="button" flat @click="${""}">${EQUIS}</button>
                ${this.empresasItems?.map(
                    (empresa) =>
                        html` <div class="grid item" ultimoid="${empresa.id}" .empresa=${empresa} ?modificando=${empresa.modificando}>
                            <div class="input">
                                <input
                                    class="grid center input-descripcion"
                                    .value="${empresa.descripcion}"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <button
                                flat
                                ?oculto="${!empresa.modificando}"
                                @click="${(e) => {
                                    this.editar(e, empresa);
                                }}"
                            >
                                ${CHECK}
                            </button>
                            <button
                                class="eliminable"
                                flat
                                ?oculto="${!empresa.modificando}"
                                @click="${(e) => {
                                    this.eliminar(e, empresa);
                                }}"
                            >
                                ${DELETE}
                            </button>
                        </div>`
                )}
            </div>
        `;
    }

    agregarOCancelar() {
        if (this.agregando || this.modificando) {
            this.modificando = false;
            this.agregando = false;

            this.empresasItems.forEach((empresa) => {
                empresa.modificando = false;
            });

            const empresas = this.empresasItems;
            this.empresaItems = [];
            this.update();
            this.empresasItems = empresas;
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
        if (anterior) anterior.empresa.modificando = false;

        let padre = e.currentTarget.parentElement;
        while (padre) {
            if (padre.empresa) {
                padre.empresa.modificando = true;
                break;
            } else {
                padre = padre.parentElement;
            }
        }
        this.modificando = true;
        this.esEliminable = false;
        this.update();
    }

    eliminar(e) {
        let padre = e.currentTarget.parentElement;
        let id = padre.empresa.id;
        store.dispatch(deleteEmpresa(id));
        this.update();
    }

    agregar() {}

    editar(e, empresa) {}

    buscarTodos() {
        store.dispatch(getAllEmpresas());
    }

    firstUpdated() {
        this.buscarTodos();
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const isCurrentScreen = ["Empresas"].some((s) => s == state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == EMPRESAS_ALL) {
            this.empresasItems = state.empresa.entities;
            this.update();
            if (this.empresaAddId != null) {
                let div = this.shadowRoot.querySelector('*[ultimoid="' + this.empresaAddId + '"]');
                div?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "end",
                });
                div.toggleAttribute("nuevo");
                setTimeout(() => {
                    div.toggleAttribute("nuevo");
                }, 750);

                this.empresaAddId = null;
            }
        }
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
            esEliminable: {
                type: Boolean,
            },
            item: {
                type: Object,
            },
            itemByDescription: {
                type: Object,
            },
            empresas: {
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
window.customElements.define("comp-empresas", Empresas);
