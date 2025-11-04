/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { getArt, getByDescription, getById, updateArt, addArt, deleteArt } from "../../redux/art/actions";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showAlert, showError } from "../../redux/ui/actions";
import { CANCELAR, CHECK, MAS, DELETE } from "../../../assets/icons/svgs";

const ART_DELETE = "art.deleteArt.timeStamp";
const ART_BY_ID = "art.byId.timeStamp";
const ART_ADD = "art.addArt.timeStamp";
const ART_BY_DESCRIPTION = "art.byDescription.timeStamp";
const ART_ALL = "art.all.timeStamp";
const ART_UPDATE = "art.updateArt.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class MiComponente extends connect(store, ART_DELETE, MEDIA_CHANGE, SCREEN, ART_BY_ID, ART_BY_DESCRIPTION, ART_ALL, ART_UPDATE, ART_ADD)(LitElement) {
    constructor() {
        super();
        this.artAddId = null;
        this.hidden = false;
        this.item = {};
        this.itemByDescription = {};
        this.artItems = [];
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
            :host([media-size="small"]) {
                --ancho-descripcion: 22rem;
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
                <div class="grid center"><h2>ART</h2></div>
                <div class="grid end">
                    <button raised @click="${this.agregarOCancelar}" ?cancelar="${this.agregando == true || this.modificando == true}">${MAS}</button>
                </div>
            </div>

            <div class="contenedor inner-grid">
                <div class="grid item" id="ultimo" ?oculto="${!this.agregando}" ?modificando=${this.agregando}>
                    <div class="input">
                        <input class="grid center" ?oculto="${!this.agregando}" id="input-agregar" />
                    </div>
                    <button flat ?oculto="${this.agrengado}" @click="${this.agregar}">${CHECK}</button>
                </div>
                ${this.artItems.map(
                    (art) =>
                        html` <div class="grid item" ultimoid="${art.id}" .art=${art} ?modificando=${art.modificando}>
                            <div class="input">
                                <input
                                    class="grid center input-descripcion"
                                    .value="${art.descripcion}"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <button
                                flat
                                ?oculto="${!art.modificando}"
                                @click="${(e) => {
                                    this.guardar(e, art);
                                }}"
                            >
                                ${CHECK}
                            </button>
                            <button
                                class="eliminable"
                                flat
                                ?oculto="${!art.modificando}"
                                @click="${(e) => {
                                    this.eliminar(e, art);
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

            this.artItems.forEach((art) => {
                art.modificando = false;
            });

            const art = this.artItems;
            this.artItems = [];
            this.update();
            this.artItems = art;
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
        if (anterior) anterior.art.modificando = false;

        let padre = e.currentTarget.parentElement;
        while (padre) {
            if (padre.art) {
                padre.art.modificando = true;
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
        let id = padre.art.id;
        store.dispatch(deleteArt(id));
        this.update();
    }

    agregar() {
        let descripcion = this.shadowRoot.querySelector("#input-agregar").value;
        let body = {
            descripcion: descripcion,
        };
        store.dispatch(addArt(body));
    }

    guardar(e, art) {
        let padre = e.currentTarget.parentElement;
        let body = {
            id: art.id,
            descripcion: padre.querySelector(".input-descripcion").value,
        };
        store.dispatch(updateArt(body));
    }

    buscar() {
        let descripcion = this.shadowRoot.querySelector("#descripcion").value;
        store.dispatch(getByDescription(descripcion));
    }

    buscarTodos() {
        store.dispatch(getArt());
    }

    buscarPorId() {
        let id = this.shadowRoot.querySelector("#buscarId").value;
        store.dispatch(getById(id));
    }

    firstUpdated() {
        this.buscarTodos();
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const isCurrentScreen = ["ART"].some((s) => s == state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == ART_ADD) {
            this.artAddId = state.art.addArt.addId;
            this.agregarOCancelar();
            this.buscarTodos();
        }

        if (name == ART_BY_ID) {
            this.item = state.art.entity;
        }
        if (name == ART_BY_DESCRIPTION) {
            this.itemByDescription = state.art.byDescription.entityByDescription[0];
        }
        if (name == ART_ALL) {
            this.artItems = state.art.entities;
            this.update();
            if (this.artAddId != null) {
                let div = this.shadowRoot.querySelector('*[ultimoid="' + this.artAddId + '"]');
                div?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "end",
                });
                div.toggleAttribute("nuevo");
                setTimeout(() => {
                    div.toggleAttribute("nuevo");
                }, 750);

                this.artAddId = null;
            }
        }
        if (name == ART_UPDATE) {
            let retorno = state.art.updateArt.resultado;
            if (retorno.StatusCode) {
                store.dispatch(showAlert("Error ", retorno.Message));
            } else {
                this.buscarTodos();
                this.agregarOCancelar();
            }
        }

        if (name == ART_DELETE) {
            this.agregarOCancelar();
            this.buscarTodos();
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
            items: {
                type: Array,
            },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            area: {
                type: String,
            },
        };
    }
}
window.customElements.define("mi-componente", MiComponente);
