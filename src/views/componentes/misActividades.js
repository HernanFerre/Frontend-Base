/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { getActividades, getByDescription, getById, updateActividad, addActividad, deleteActividad } from "../../redux/actividad/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showAlert, showError } from "../../redux/ui/actions";
import { CANCELAR, CHECK, MAS, DELETE } from "../../../assets/icons/svgs";

const ACTIVIDADES_DELETE = "actividad.deleteActividad.timeStamp";
const ACTIVIDADES_ADD = "actividad.addActividad.timeStamp";
const ACTIVIDADES_ALL = "actividad.all.timeStamp";
const ACTIVIDADES_BY_DESCRIPTION = "actividad.byDescription.timeStamp";
const ACTIVIDADES_BY_ID = "actividad.byId.timeStamp";
const ACTIVIDADES_UPDATE = "actividad.updateActividad.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const FILTRO = "ui.filtros.timeStamp";

export class MisActividades extends connect(
    store,
    FILTRO,
    ACTIVIDADES_DELETE,
    ACTIVIDADES_ADD,
    SCREEN,
    MEDIA_CHANGE,
    ACTIVIDADES_ALL,
    ACTIVIDADES_BY_DESCRIPTION,
    ACTIVIDADES_BY_ID,
    ACTIVIDADES_UPDATE
)(LitElement) {
    constructor() {
        super();
        this.actividadAddId = null;
        this.item = {};
        this.itemByDescription = {};
        this.actividades = [];
        this.actividadesBk = [];
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
                place-content: start;
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
                <div class="grid center"><h2>Actividades</h2></div>
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
                ${this.actividades.map(
                    (actividad) =>
                        html` <div class="grid item" ultimoid="${actividad.id}" .actividad=${actividad} ?modificando=${actividad.modificando}>
                            <div class="input">
                                <input
                                    class="grid center input-descripcion"
                                    .value="${actividad.descripcion}"
                                    @input="${(e) => {
                                        this.editando(e);
                                    }}"
                                />
                            </div>
                            <button
                                flat
                                ?oculto="${!actividad.modificando}"
                                @click="${(e) => {
                                    this.editar(e, actividad);
                                }}"
                            >
                                ${CHECK}
                            </button>
                            <button
                                class="eliminable"
                                flat
                                ?oculto="${!actividad.modificando}"
                                @click="${(e) => {
                                    this.eliminar(e, actividad);
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

            this.actividades.forEach((actividad) => {
                actividad.modificando = false;
            });

            const actividades = this.actividades;
            this.actividades = [];
            this.update();
            this.actividades = actividades;
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
        if (anterior) anterior.actividad.modificando = false;

        let padre = e.currentTarget.parentElement;
        while (padre) {
            if (padre.actividad) {
                padre.actividad.modificando = true;
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
        let id = padre.actividad.id;
        store.dispatch(deleteActividad(id));
        this.update();
    }

    agregar() {
        let body = {
            descripcion: this.shadowRoot.querySelector("#input-agregar").value,
            esParaDenunciaUrgente: true,
        };
        store.dispatch(addActividad(body));
    }

    editar(e, actividad) {
        this.actividadAddId = actividad.id;
        let padre = e.currentTarget.parentElement;
        let body = {
            id: actividad.id,
            descripcion: padre.querySelector(".input-descripcion").value,
        };
        store.dispatch(updateActividad(body));
    }

    buscar() {
        let descripcion = this.shadowRoot.querySelector("#descripcion").value;
        store.dispatch(getByDescription(descripcion));
    }

    buscarPorId() {
        let id = this.shadowRoot.querySelector("#buscarId").value;
        store.dispatch(getById(id));
    }

    buscarTodos() {
        store.dispatch(getActividades());
    }

    firstUpdated() {
        this.buscarTodos();
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const isCurrentScreen = ["Actividades"].some((s) => s == state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == ACTIVIDADES_ALL) {
            this.actividades = state.actividad.entities;
            this.actividadesBk = [...this.actividades];
            this.update();
            if (this.actividadAddId != null) {
                let div = this.shadowRoot.querySelector('*[ultimoid="' + this.actividadAddId + '"]');
                div?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "end",
                });
                div.toggleAttribute("nuevo");
                setTimeout(() => {
                    div.toggleAttribute("nuevo");
                }, 750);

                this.actividadAddId = null;
            }
        }
        if (name == FILTRO) {
            if (state.ui.filtros.texto != "") {
                this.actividades = this.actividades.filter((a) => a.descripcion.toUpperCase().indexOf(state.ui.filtros.texto.toUpperCase()) != -1);
            } else {
                this.actividades = [...this.actividadesBk];
            }
        }
        if (name == ACTIVIDADES_BY_DESCRIPTION) {
            this.itemByDescription = state.actividad.byDescription.entityByDescription[0];
        }
        if (name == ACTIVIDADES_BY_ID) {
            this.item = state.actividad.entity;
        }
        if (name == ACTIVIDADES_UPDATE) {
            let retorno = state.actividad.updateActividad.resultado;
            if (retorno.StatusCode) {
                store.dispatch(showAlert("Error ", retorno.Message));
            } else {
                this.buscarTodos();
                this.agregarOCancelar();
            }
        }

        if (name == ACTIVIDADES_ADD) {
            this.actividadAddId = state.actividad.addActividad.addId;
            this.agregarOCancelar();
            this.buscarTodos();
        }

        if (name == ACTIVIDADES_DELETE) {
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
            actividades: {
                type: Array,
            },
            actividadesBk: {
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
window.customElements.define("mis-actividades", MisActividades);
