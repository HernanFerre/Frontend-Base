/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { getActividades, getByDescription, getById, updateActividad } from "../../redux/actividad/actions";

const ACTIVIDADES_ALL = "actividad.all.timeStamp"
const ACTIVIDADES_BY_DESCRIPTION = "actividad.byDescription.timeStamp"
const ACTIVIDADES_BY_ID = "actividad.byId.timeStamp"
const ACTIVIDADES_UPDATE = "actividad.updateActividad.timeStamp"


export class MisActividades extends connect(store, ACTIVIDADES_ALL, ACTIVIDADES_BY_DESCRIPTION, ACTIVIDADES_BY_ID, ACTIVIDADES_UPDATE)(LitElement) {
    constructor() {
        super();
        this.hidden = false;
        this.item = {};
        this.itemByDescription = {};
        this.items = []
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
            grid-auto-flow: row;
            background-color: var(--formulario);
            padding: 2rem;
            grid-gap: 1rem;
            overflow-y: scroll;
        }
        .inner-grid.fit18 {
            display: grid;
            grid-template-columns: repeat(18, minmax(0, 1fr));
            gap: 1rem;                /* separa columnas/filas */
            align-items: end;         /* botones e inputs al mismo “renglón” */
            margin-bottom: 1.25rem;   /* separa bloques entre sí */
            }

            /* Altura consistente entre inputs y botones */
            input,
            select,
            textarea {
            height: 40px;
            padding: 0 .75rem;
            line-height: 40px;
            border-radius: 10px;
            }
            button {
            height: 40px;
            padding: 0 1rem;
            align-self: end; /* se alinea con el borde inferior del input */
            }

            /* Labels y subtext más legibles y compactos */
            .input > label:not([subtext]) {
            font-weight: 600;
            color: var(--on-formulario, #eaeaea);
            margin-bottom: .35rem;
            display: inline-block;
            }
            .input > label[subtext] {
            font-size: .75rem;
            opacity: .75;
            margin-top: .35rem;
            display: block;
            }

            /* Título y bloques generales */
            h1 {
            margin: 0 0 1rem 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--on-formulario, #eaeaea);
            }

            /* Texto (como tus resultados individuales) más nítido */
            div {
            color: var(--on-formulario, #e6e6e6);
            }
            .results-grid .header:nth-child(1),
            .results-grid .header:nth-child(2) {
                margin-bottom: 0.5rem; /* separa visualmente header de filas */
                border-bottom: 2px solid var(--primary-color, #2196f3);
                padding-bottom: 0.4rem;
            }

            .results-grid{
                display: grid;
                grid-template-columns: 400px 1fr;
                column-gap: .75rem;
                row-gap: 0;
                align-items: center;
                margin-top: 1rem;
            }

            .results-grid .header {
                font-weight: 600;
                background-color: rgba(255, 255, 255, 0.1);
                padding: 0.5rem;
                border-bottom: 2px solid var(--primary-color,#2196f3 );
                
            }

            .results-grid > div:not(.headere) {
                padding: 0.4rem 0.5rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .results-grid > div:not(.header):nth-child(4n + 3),
            .results-grid > div:not(.header):nth-child(4n + 4) {
            background-color: rgba(255, 255, 255, 0.04);
            }
            
        `;
    }

    render() {
        return html`
            <!-- Buscar por ID -->
             <div>
                <h1>ACTIVIDADES</h1>
             </div>
            <div class="inner-grid fit18">
                <div class="input" style="grid-column: 1 / 9">
                    <input id="buscarId"/>
                        <label for="buscarId">ID</label>
                        <label subtext>Ingresá un ID para buscar</label>
                    <div>${this.item.descripcion}</div>
                    <div>${this.item.id}</div>
                </div>
                <button raised action
                style="grid-column: 2 / 8; align-self: center"
                @click="${this.buscarPorId}">Buscar por ID</button>
            </div>

            <!-- Buscar por Descripcion -->
            <div class="inner-grid fit18">
                <label style="grid-column: 1 / 4; align-self: center">Buscar por Descripcion</label>

                    <div class="input" style="grid-column: 1 / 9">
                        <input id="descripcion"/>
                        <label for="descripcion">Descripción</label>
                        <label subtext>Texto parcial o completo</label>
                        <div>${this.itemByDescription.descripcion}</div>
                        <div>${this.itemByDescription.id}</div>
                    </div>

                <button raised
                style="grid-column: 2 / 8; align-self: end"
                @click ="${this.buscar}">Buscar Por Descripcion</button>
            </div> 

            <div class="inner-grid fit18"> 
              <button flat @click = "${this.modificar}" style="grid-column: 2 / 8">Modificar</button>
                <!-- Buscar Todos -->
                <div style="grid-column: 4 / 7; align-self: center">Buscar Todas Las Actividades </div>                                
                <button link action @click ="${this.buscarTodos}" style="grid-column: 3 / 7">Buscar Todos</button>                
            </div>
            <div class = "results-grid">
                <div class="header">ID</div>
                <div class="header">Descripción</div>
                ${this.items?.map(
                    (actividad) => html`
                    <div>${actividad.id}</div>
                    <div>${actividad.descripcion}</div>
                ` )}
            </div>

        `;
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

    stateChanged(state, name) {
        if (name == ACTIVIDADES_ALL) {
            this.items = state.actividad.entities;
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
window.customElements.define("mis-actividades", MisActividades);
