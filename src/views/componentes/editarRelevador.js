/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { ATRAS, COPY, EQUIS } from "../../../assets/icons/svgs";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { goHistoryPrev, goTo } from "../../redux/routing/actions";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { Validable } from "../../libs/mixin/validable";
import { showAlert } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const SEND_TRABAJADOR = "cliente.enviado.trabajadorTimeStamp";
const EDITAR_RELEVADOR = "ui.editarRelevador.timestamp";
const AGREGAR_RELEVADOR = "ui.agregarRelevador.timestamp";

const CARGAR = "Cargar";
const MODIFICAR = "Modificar";

export class editarRelevador extends Validable(connect(store, AGREGAR_RELEVADOR, EDITAR_RELEVADOR, MEDIA_CHANGE, SCREEN, SEND_TRABAJADOR)(LitElement)) {
    constructor() {
        super();
        this.modo = null;
        this.cuit = null;
        this.ddjj = {};
        this.convenios = [];
        this.categorias = [];
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${button}
            ${select}
            ${check}
            :host {
                display: grid;
                grid-template-columns: 4rem 1fr 4rem;
                overflow: none;
                z-index: 1000;
                padding: 1rem;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }

            :host[hidden] {
                display: none;
            }
            :host([media-size="small"]) {
                font-size: 1.5rem;
            }

            :host([media-size="small"]) .items-valores {
                grid-auto-flow: row;
            }

            :host([media-size="small"]) .items-fila {
                grid-auto-flow: row;
            }

            .main {
                color: var(--on-formulario);
                background-color: var(--formulario);
                grid-gap: 0;
                border-radius: 0.5rem;
                box-shadow: var(--shadow-elevation-8-box);
                height: fit-content;
                width: 50vw;
                justify-self: center;
                align-self: center;
            }

            .botones {
                grid-template-columns: 1fr 1fr;
            }
            .grabar {
                place-self: flex-end;
            }
            .cerrar {
                place-self: flex-start;
            }
            .check {
                margin: 1.5rem 0.5rem;
            }
            .items-valores {
                grid-template-columns: 1fr 1fr;
            }
            .contenido-items {
                grid-gap: 0;
            }
            .cabecera {
                font-size: var(--font-header-h1-size);
                font-weight: var(--font-header-h1-weight);
                color: var(--on-primario);
                background-color: var(--primario10);
                border-radius: 0.5rem 0.5rem 0 0;
                grid-template-columns: 1fr 1fr 1fr;
                justify-content: space-between;
            }
            .grabar-button {
                place-self: center;

                margin: 0 auto 1.5rem;
            }
            .items-fila {
                grid-template-columns: auto;
            }
            .items-fila2 {
                grid-template-columns: 1fr 1fr auto auto;
            }
            .btn-cancelar {
                place-self: center;

                margin: 0 auto 1.5rem;
            }
            .btn-cancelar svg {
                fill: var(--primario);
            }
        `;
    }

    volver() {
        this.hidden = true;
    }

    render() {
        return html`
            <div class="inner-grid start"></div>
            <div class="main inner-grid">
                <div class="contenido inner-grid row">
                    <div class="grid cabecera">
                        <div></div>
                        <div class="inner-grid center">${this.modo} Relevador</div>
                        <div></div>
                    </div>

                    <div class="contenido-items grid row">
                        <div class="inner-grid column items-fila">
                            <div class="input grid" ?error=${this.item.validables.apellido?.invalid}>
                                <input type="text" id="apellido" @change="${this.setValue("apellido")}" .value=${this.item.apellido} /><label for="apellido">APELLIDO</label>
                                <label error>No puede ser vacio</label>
                            </div>
                            <div class="input grid" ?error=${this.item.validables.nombre?.invalid}>
                                <input type="text" id="nombre" @change="${this.setValue("nombre")}" .value=${this.item.nombre} /><label for="nombre">NOMBRE</label>
                                <label error>No puede ser vacio</label>
                            </div>
                            <div class="input grid" ?error=${this.item.validables.email?.invalid}>
                                <input type="email" id="email" @change="${this.setValue("email")}" .value=${this.item.email} /><label for="email">EMAIL</label>
                                <label error>Debe ser un Email Valido y No puede ser vacio</label>
                            </div>
                        </div>
                        <div class="inner-grid column items-fila2"></div>
                    </div>
                </div>
                <div class="inner-grid botones">
                    <div class="inner-grid grabar">
                        <button class="grabar-button" @click="${this.guardar}" raised>Grabar</button>
                    </div>
                    <div class="inner-grid cerrar">
                        <button class="btn-cancelar" @click="${this.volver}" link>CERRAR</button>
                    </div>
                </div>
            </div>
        `;
    }

    firstUpdated() {}

    guardar() {
        if (this.item.afiliado != null) {
            if (this.item.afiliado == true) {
                this.item.afiliado = "s";
            }
            if (this.item.afiliado == false) {
                this.item.afiliado = "n";
            }
        }
        if (this.modo == CARGAR) {
            let body = {
                idDdjj: this.ddjj.id,
                cuil: this.item.cuil,
                fechaIngreso: this.item.fechaIngreso,
                codigoPostal: this.item.codigoPostal,
                afiliado: this.item.afiliado,
                remuneraCS: this.item.remuneraCS,
                remuneraCL: this.item.remuneraCL,
                idCategoria: this.item.idCategoria,
                idConvenio: this.item.idConvenio,
            };
            if (this.isValidItem([this.item])) {
                store.dispatch(agregarTrabajador(body));
            }
        }

        if (this.modo == MODIFICAR) {
            if (this.item.idCategoria == null) {
                this.item.idCategoria = this.item.categoria.id;
            }
            if (this.item.idConvenio == null) {
                this.item.idConvenio = this.item.convenio.id;
            }
            let body = {
                idDdjj: this.ddjj.id,
                idTrabajador: this.item.id,
                cuil: this.item.cuil,
                fechaIngreso: this.item.fechaIngreso,
                codigoPostal: this.item.codigoPostal,
                afiliado: this.item.afiliado,
                remuneraCS: this.item.remuneraCS,
                remuneraCL: this.item.remuneraCL,
                idCategoria: this.item.idCategoria,
                idConvenio: this.item.idConvenio,
            };
            if (this.isValidItem([this.item])) {
                store.dispatch(editarTrabajador(body));
            }
        }

        this.isValidItem([this.item]);
        this.update();
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.orientation = state.ui.media.orientation;
        }

        if (name === AGREGAR_RELEVADOR) {
            this.modo = CARGAR;
            this.hidden = false;
            this.item = state.ui.agregarRelevador.resultado;
            this.setValidables();
            this.update();
        }

        if (name == EDITAR_RELEVADOR) {
            this.modo = MODIFICAR;
            this.hidden = false;
            this.item = state.ui.editarRelevador.resultado;
            this.setValidables();
            this.update();
        }
    }
    setValidables() {
        this.item.validables = {
            apellido: {
                invalid: false,
                isInvalid: (valor) => {
                    return valor === "";
                },
            },
            nombre: {
                invalid: false,
                isInvalid: (valor) => {
                    return valor === "";
                },
            },
            email: {
                invalid: false,
                isInvalid: (valor) => {
                    if (valor.indexOf("@") == -1) return true;
                    return false;
                },
            },
        };
    }

    static get properties() {
        return {
            hidden: { type: Boolean, reflect: true },
            area: { type: String, reflect: true },
            modo: { type: String },
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            orientation: {
                type: String,
                reflect: true,
            },
        };
    }
}
window.customElements.define("editar-relevador", editarRelevador);
