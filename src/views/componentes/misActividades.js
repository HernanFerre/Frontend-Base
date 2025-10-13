/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { getActividades, getByDescription, getById, updateActividad, addActividad } from "../../redux/actividad/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showAlert, showError } from "../../redux/ui/actions";
import { CANCELAR, CHECK, MAS } from "../../../assets/icons/svgs"


const ACTIVIDADES_ADD = "actividad.addActividad.timeStamp"
const ACTIVIDADES_ALL = "actividad.all.timeStamp"
const ACTIVIDADES_BY_DESCRIPTION = "actividad.byDescription.timeStamp"
const ACTIVIDADES_BY_ID = "actividad.byId.timeStamp"
const ACTIVIDADES_UPDATE = "actividad.updateActividad.timeStamp"
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";


export class MisActividades extends connect(store, ACTIVIDADES_ADD, SCREEN, MEDIA_CHANGE, ACTIVIDADES_ALL, ACTIVIDADES_BY_DESCRIPTION, ACTIVIDADES_BY_ID, ACTIVIDADES_UPDATE)(LitElement) {
    constructor() {
        super();
        // this.hidden = false;
        this.item = {};
        this.itemByDescription = {};
        this.actividades = [];
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
            display: grid;
            overflow: none;
            padding: 1rem;
            place-content: center;
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
            }
            .main {
                background-color: var(--formulario);
                width: 32vw;
                height: 70vh;
                overflow: none;
                border-radius: 0.5rem 0.5rem 0 0;
                box-shadow: var(--shadow-elevation-3-box);
                grid-gap: 0 !important;
                grid-template-rows: auto 1fr;
            }
            .cabecera {
                color: var(--on-formulario-bajada);
                grid-template-columns: 0.5fr 1fr 0.5fr;
                border-bottom: 1px solid var(--velo);
            }
            .contenedor {
                color: var(--on-formulario);
                height: 61vh;
                overflow-y: auto;
                overflow-x: hidden;
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
                width: 30vw;
                transition: 0.5s ease;
                overflow: none;
                grid-template-columns: 30vw 0;
            }
            .item[modificando] {
                grid-template-columns: 26.5vw 2.75rem;
            }
            .item button {
                width: 2.75rem;
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
            <!-- Buscar por ID -->
            <div>
                <h1>ACTIVIDADES</h1>
            </div>
            <div class="main inner-grid row">
                <div class="inner-grid cabecera column">
                    <div></div>
                    <div class="grid center">Descripcion</div>
                    <div class="grid end">
                        <button
                        raised
                        @click="${this.agregarOCancelar}"
                        ?cancelar="${this.agregando == true || this.modificando == true}"
                        >
                        ${MAS}
                        </button>
                    </div>                               
                </div>

                <div class="contenedor">
                <div
                    class="grid item"
                    id="ultimo"
                    ?oculto="${!this.agregando}"
                    ?modificando=${this.agregando}
                >
                    <div class="input">
                    <input
                        class="grid center"
                        ?oculto="${!this.agregando}"
                        id="input-agregar"
                    />
                    </div>
                    <button flat ?oculto="${this.agrengado}" @click="${this.agregar}">
                    ${CHECK}
                    </button>
                </div>
                ${this.actividades.map(
                    (actividad) =>
                    html` <div
                        class="grid item"
                        ultimoid="${actividad.id}"
                        .actividad=${actividad}
                        ?modificando=${actividad.modificando}
                    >
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
                    </div>`
                )}
                </div>
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
        this.update();
    }
    
    agregar() {
        let body = {
        descripcion: this.shadowRoot.querySelector("#input-agregar").value,
        modo: "",
        };
        store.dispatch(add(body));
    }

    editar(e, convenio) {
        let padre = e.currentTarget.parentElement;
        let body = {
        convenioId: convenio.id,
        descripcion: padre.querySelector(".input-descripcion").value,
        };
        store.dispatch(UpdateDescripcion(body));
    }




    agregar() {
        let descripcion = this.shadowRoot.querySelector("#agregar").value;
        
        let body = {
            descripcion: descripcion,
            esParaDenunciaUrgente: true
        }
        store.dispatch(addActividad(body));
    }

    modificar() {
        let id = this.shadowRoot.querySelector("#buscarId").value;
        let descripcion = this.shadowRoot.querySelector("#descripcion").value;
        let body = {
            id: id,
            descripcion: descripcion
        }
        store.dispatch(updateActividad(body))

    }

    buscar() {
        let descripcion = this.shadowRoot.querySelector("#descripcion").value;
        store.dispatch(getByDescription(descripcion))
    }

    buscarTodos() {
        store.dispatch(getActividades())
    }

    buscarPorId() {
        let id = this.shadowRoot.querySelector("#buscarId").value;
        store.dispatch(getById(id))
    }

    firstUpdated() {
        this.buscarTodos()
     }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const isCurrentScreen = ["Actividades"].some(s => s == state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == ACTIVIDADES_ALL) {
            this.actividades = state.actividad.entities;
            this.update();
        }
        if (name == ACTIVIDADES_BY_DESCRIPTION) {
            this.itemByDescription = state.actividad.byDescription.entityByDescription[0];
        }
        if (name == ACTIVIDADES_BY_ID) {
            this.item = state.actividad.entity;
        }
        if (name == ACTIVIDADES_UPDATE) {
            this.buscarTodos()
        }

        if (name == ACTIVIDADES_ADD) {
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
            actividades: {
                type: Array,
            },
            mediaSize: {
                type: String,
            },
            area: {
                type: String,
            }

        };
    }
}
window.customElements.define("mis-actividades", MisActividades);
