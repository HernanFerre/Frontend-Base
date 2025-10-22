/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { ATRAS, COPY, EQUIS } from "../../../../assets/icons/svgs";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { goHistoryPrev, goTo } from "../../../redux/routing/actions";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { DDJJ_CARGA_TRABAJADORES_SCREEN, DDJJ_DETALLE_SCREEN } from "../../../redux/routing/routs";
import { Validable } from "../../../libs/mixin/validable";
import { agregarTrabajador, getById, miEstado, misDDJJ } from "../../../redux/boletasDeposito/ddjj/actions";
import { showAlert } from "../../../redux/ui/actions";
import { editarTrabajador } from "../../../redux/boletasDeposito/ddjj/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const SEND_DDJJ = "cliente.enviado.ddjjTimeStamp";
const CONVENIOS = "boletasDeposito.convenio.querys.timeStamp";
const CATEGORIAS = "boletasDeposito.categoria.querys.timeStamp";
const AGREGAR_TRABAJADORES_SUCCESS = "boletasDeposito.ddjj.commands.agregarTrabajadorTimeStamp";
const EDITAR_TRABAJADORES_SUCCESS = "boletasDeposito.ddjj.commands.editarTrabajadorTimeStamp";
const SEND_CUIT = "cliente.enviado.cuitTimeStamp";
const SEND_TRABAJADOR = "cliente.enviado.trabajadorTimeStamp";
const BY_ID = "boletasDeposito.ddjj.querys.getByIdTimeStamp";

const CARGAR = "Cargar";
const MODIFICAR = "Modificar";

export class ddjjCargaTrabajadorComponent extends Validable(
    connect(store, MEDIA_CHANGE, SCREEN, BY_ID, CONVENIOS, CATEGORIAS, AGREGAR_TRABAJADORES_SUCCESS, EDITAR_TRABAJADORES_SUCCESS, SEND_CUIT, SEND_TRABAJADOR)(LitElement)
) {
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

                padding: 1rem;
            }

            :host[hidden] {
                display: none;
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
                width: fit-content;
                margin: 0 auto 1.5rem;
            }
            .items-fila {
                grid-template-columns: 1fr 1fr 1fr;
            }
            .items-fila2 {
                grid-template-columns: 1fr 1fr auto auto;
            }
            .btn-cabecera {
                display: grid;
                align-content: start;
                justify-content: start;
            }
            .btn-cabecera svg {
                fill: var(--primario);
            }
        `;
    }

    volver() {
        store.dispatch(goHistoryPrev());
    }

    render() {
        return html`
            <div class="inner-grid start"></div>
            <div class="main inner-grid">
                <div class="contenido inner-grid row">
                    <div class="grid cabecera">
                        <div></div>
                        <div class="inner-grid center">${this.modo} Empleado</div>
                        <div></div>
                    </div>

                    <div class="contenido-items grid row">
                        <div class="inner-grid column items-fila">
                            <div class="input grid" ?error=${this.item.validables.cuil?.invalid}>
                                <input type="number" id="cuil" @change="${this.setValue("cuil")}" .value=${this.item.cuil} /><label for="cuil">CUIL</label>
                                <label error>No puede ser vacio</label>
                            </div>
                            <div class="input grid" ?error=${this.item.validables.codigoPostal?.invalid}>
                                <input type="number" id="codigoPostal" @change="${this.setValue("codigoPostal")}" .value=${this.item.codigoPostal} /><label for="codigoPostal">Codigo Postal</label>
                                <label error>No puede ser vacio</label>
                            </div>
                            <div class="input grid" ?error=${this.item.validables.fechaIngreso?.invalid}>
                                <input type="date" id="fecha-ingreso" @change="${this.setValue("fechaIngreso")}" .value=${this.item.fechaIngreso} /><label for="fecha-ingreso">Fecha Ingreso</label>
                                <label error>No puede ser mayor a la fecha actual o vacio</label>
                            </div>
                        </div>
                        <div class="inner-grid column items-fila2">
                            <div class="input grid" ?error=${this.item.validables.remuneraCS?.invalid}>
                                <input type="number" id="remu-sindical" @change="${this.setValue("remuneraCS")}" .value=${this.item.remuneraCS} /><label for="remu-sindical"
                                    >Remu. Cuota Sindical</label
                                >
                                <label error>No puede ser vacio o negativo</label>
                            </div>

                            <div class="input grid" ?error=${this.item.validables.remuneraCL?.invalid}>
                                <input type="number" id="remu-laboral" @change="${this.setValue("remuneraCL")}" .value=${this.item.remuneraCL} /><label for="remu-laboral"
                                    >Remu. Fondo Cese Laboral</label
                                >
                                <label error>No puede ser vacio o negativo</label>
                            </div>

                            <div class="check">
                                <input type="checkbox" id="afiliado" @change="${this.setValue("afiliado")}" ?checked=${this.item.afiliado} /><label for="afiliado">Afiliado</label><label></label>
                            </div>
                        </div>

                        <div class="select grid" ?error=${this.item.validables.idConvenio?.invalid}>
                            <select id="convenio" @change="${this.setValue("idConvenio")}" .value="${this.item?.idConvenio}">
                                <option value="null" disabled>Selecciona una opción</option>
                                ${this.convenios?.map((convenio) => html`<option .value="${convenio.id}">${convenio.descripcion}</option>`)}
                            </select>

                            <label for="convenio">Convenio</label>
                            <label error>No puede ser vacio</label>
                        </div>
                        <div class="select grid" ?error=${this.item.validables.idCategoria?.invalid}>
                            <select id="categoria" @change="${this.setValue("idCategoria")}" .value="${this.item?.idCategoria}">
                                <option value="null" disabled>Selecciona una opción</option>
                                ${this.categorias?.map((categoria) => html`<option .value="${categoria.id}">${categoria.descripcion}</option>`)}</select
                            ><label for="categoria">Categoria</label>
                            <label error>No puede ser vacio</label>
                        </div>
                    </div>
                </div>
                <button class="grabar-button" @click="${this.guardar}" raised>Grabar</button>
            </div>
            <div>
                <button class="btn-cabecera" @click="${this.volver}" link>${EQUIS}</button>
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
            this.hidden = true;
            const isCurrentScreen = [DDJJ_CARGA_TRABAJADORES_SCREEN].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == BY_ID) {
            this.ddjj = state.boletasDeposito.ddjj.querys.entity;
            this.update();
        }
        if (name == CONVENIOS) {
            this.convenios = state.boletasDeposito.convenio.querys.entities;
            this.update();
        }
        if (name == CATEGORIAS) {
            this.categorias = state.boletasDeposito.categoria.querys.entities;
            this.update();
        }
        if (name == AGREGAR_TRABAJADORES_SUCCESS) {
            if (this.cuit != null) store.dispatch(misDDJJ(this.cuit));
            if (this.cuit != null) store.dispatch(miEstado(this.cuit));
            this.update();
            let recibido = state.boletasDeposito.ddjj.commands.agregarTrabajador;
            if (recibido.StatusCode != null) {
                store.dispatch(showAlert("ERROR DE CARGA", recibido.Message));
            } else {
                store.dispatch(getById(this.ddjj.id));
                store.dispatch(goHistoryPrev());
            }
            this.item.idCategoria = null;
            this.item.idConvenio = null;
        }
        if (name == EDITAR_TRABAJADORES_SUCCESS) {
            if (this.cuit != null) store.dispatch(misDDJJ(this.cuit));
            if (this.cuit != null) store.dispatch(miEstado(this.cuit));
            this.update();
            let recibido = state.boletasDeposito.ddjj.commands.editarTrabajador;
            if (recibido.StatusCode != null) {
                store.dispatch(showAlert("ERROR DE MODIFICACION", recibido.Message));
            } else {
                store.dispatch(getById(this.ddjj.id));
                store.dispatch(goHistoryPrev());
            }
        }
        if (name == SEND_CUIT) {
            this.cuit = state.cliente.enviado.cuit.cuit;
            this.update();
        }
        if (name == SEND_TRABAJADOR) {
            let recibido = state.cliente.enviado.trabajador;
            if (recibido == "") {
                this.item = {
                    afiliado: true,
                    cuil: "",
                    codigoPostal: "",
                    remuneraCS: "",
                    fechaIngreso: "",
                    remuneraCL: "",
                    idConvenio: null,
                    idCategoria: null,
                };
                this.modo = CARGAR;
            } else {
                this.item = { ...recibido };
                this.item.idConvenio = this.item.convenio.id;
                this.item.idCategoria = this.item.categoria.id;
                this.modo = MODIFICAR;
            }
            this.item.validables = {
                cuil: {
                    invalid: false,
                    isInvalid: (valor) => {
                        return valor === "";
                    },
                },
                remuneraCS: {
                    invalid: false,
                    isInvalid: (valor) => {
                        return valor === "" || valor < 0;
                    },
                },
                afiliado: {
                    invalid: false,
                    isInvalid: (valor) => {
                        return valor === "";
                    },
                },
                fechaIngreso: {
                    invalid: false,
                    isInvalid: (valor) => {
                        return valor === "" || new Date(valor) > new Date();
                    },
                },
                remuneraCL: {
                    invalid: false,
                    isInvalid: (valor) => {
                        return valor === "" || valor < 0;
                    },
                },
                codigoPostal: {
                    invalid: false,
                    isInvalid: (valor) => {
                        return valor === "";
                    },
                },
                idConvenio: {
                    invalid: false,
                    isInvalid: (valor) => {
                        return valor === null;
                    },
                },
                idCategoria: {
                    invalid: false,
                    isInvalid: (valor) => {
                        return valor === null;
                    },
                },
            };
            this.update();
        }
    }

    static get properties() {
        return {
            hidden: { type: Boolean, reflect: true },
            area: { type: String, reflect: true },
            modo: { type: String },
        };
    }
}
window.customElements.define("ddjj-carga-trabajador", ddjjCargaTrabajadorComponent);
