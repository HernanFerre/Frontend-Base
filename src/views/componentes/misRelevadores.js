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
import { getRelevador } from "../../redux/relevador/actions";

const RELEVADOR_GET_ALL = "relevador.all.timeStamp"
const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";


export class MisRelevadores extends connect(store, RELEVADOR_GET_ALL, SCREEN, MEDIA_CHANGE)(LitElement) {
    constructor() {
        super();
        this.hidden = false;
        this.item = {};
        this.itemByDescription = {};
        this.items = [];
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
            .results-grid .header:nth-child(2),
            .results-grid .header:nth-child(3),
            .results-grid .header:nth-child(4),
            .results-grid .header:nth-child(5),
            .results-grid .header:nth-child(6),
            .results-grid .header:nth-child(7) {
                margin-bottom: 0.5rem; /* separa visualmente header de filas */
                border-bottom: 2px solid var(--primary-color, #2196f3);
                padding-bottom: 0.4rem;
            }

            .results-grid{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

            .results-grid > div:not(.header):nth-child(14n + 8),
            .results-grid > div:not(.header):nth-child(14n + 9),
            .results-grid > div:not(.header):nth-child(14n + 10),
            .results-grid > div:not(.header):nth-child(14n + 11),
            .results-grid > div:not(.header):nth-child(14n + 12),
            .results-grid > div:not(.header):nth-child(14n + 13),
            .results-grid > div:not(.header):nth-child(14n + 14) {
            background-color: rgba(255, 255, 255, 0.04);
            }
            
        `;
    }

    render() {
        return html`
            <!-- Buscar por ID -->
             <div>
                <h1>RELEVADORES</h1>
             </div>

                             <!-- Buscar Todos -->
            <div style="grid-column: 4 / 7; align-self: center">Buscar Todos los Relevadores                                
                <button link action @click ="${this.buscarTodos}" style="grid-column: 3 / 7">Buscar Todos</button>                
            </div>
            <div style="grid-column: 1 / 18">   
                <div class = "results-grid">
                    <div class="header">ID</div>
                    <div class="header">email</div>
                    <div class="header">Nombre</div>
                    <div class="header">ID Usuario</div>
                    <div class="header">Apellido</div>
                    <div class="header">Departamento</div>
                    <div class="header">Nombre De Usuario</div>
                    ${this.items?.map(
                        (relevador) => html`
                        <div>${relevador.id}</div>
                        <div>${relevador.email}</div>
                        <div>${relevador.nombre}</div>
                        <div>${relevador.usuarioId}</div>
                        <div>${relevador.apellido}</div>
                        <div>${relevador.departamento}</div>
                        <div>${relevador.nombreDeUsuario}</div>
                    ` )}
                </div>
            </div>
            

        `;
    }

    buscarTodos() {
        store.dispatch(getRelevador())
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const isCurrentScreen = ["Relevadores"].some(s => s == state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == RELEVADOR_GET_ALL) {
            this.items = state.relevador.entities;
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
window.customElements.define("mis-relevadores", MisRelevadores);
