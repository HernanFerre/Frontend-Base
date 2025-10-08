/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { goHistoryPrev, goTo } from "../../redux/routing/actions";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { CONVENIO_SUELDO_SERENO_SCREEN } from "../../redux/routing/routs";
import { CANCELAR, CHECK, MAS } from "../../../assets/icons/svgs";
import {
  add,
  getAll,
  update,
} from "../../redux/boletasDeposito/convenioSueldoSereno/actions";
import { showAlert } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const CONVENIOS = "boletasDeposito.convenio.querys.timeStamp";
const CONVENIO_SUELDO_SERENO =
  "boletasDeposito.convenioSueldoSereno.querys.timeStamp";
const CONVENIO_SUELDO_SERENO_ADD =
  "boletasDeposito.convenioSueldoSereno.commands.addTimeStamp";
const CONVENIO_SUELDO_SERENO_UPDATE =
  "boletasDeposito.convenioSueldoSereno.commands.updateTimeStamp";

export class sueldoSerenoComponent extends connect(
  store,
  MEDIA_CHANGE,
  CONVENIOS,
  CONVENIO_SUELDO_SERENO,
  CONVENIO_SUELDO_SERENO_ADD,
  CONVENIO_SUELDO_SERENO_UPDATE,
  SCREEN
)(LitElement) {
  constructor() {
    super();
    this.convenios = [];
    this.sueldosSereno = [];
    this.sueldoSerenoAddId = null;
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
        min-width: 60vw;
        height: 75vh;
        overflow: none;
        border-radius: 0.5rem 0.5rem 0 0;
        box-shadow: var(--shadow-elevation-3-box);
        grid-gap: 0 !important;
        grid-template-rows: auto 1fr;
      }
      .cabecera {
        color: var(--on-formulario-bajada);
        grid-template-columns: 1fr 4rem 0.5rem;
        border-bottom: 1px solid var(--velo);
        grid-gap: 0 !important;
      }
      .contenedor {
        color: var(--on-formulario);
        height: 66vh;
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
        width: 65vw;
        transition: 0.5s;
        overflow: none;
        grid-template-columns: 29.6vw 18vw 13vw 3.5rem;
      }

      .item[modificando] button {
        transform: translate(0);
      }
      .item button {
        width: 2.75rem;
        padding: 0.25rem;
        transition: 0.3s;
        transform: translate(4vw);
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
      .cabecera-titulos {
        grid-template-columns: 29.6vw 18vw 13vw;
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

  volver() {
    store.dispatch(goHistoryPrev());
  }

  agregarOCancelar() {
    if (this.agregando || this.modificando) {
      this.modificando = false;
      this.agregando = false;

      this.sueldosSereno.forEach((sueldoSereno) => {
        sueldoSereno.modificando = false;
      });

      const sueldosSereno = this.sueldosSereno;
      this.sueldosSereno = [];
      this.update();
      this.sueldosSereno = sueldosSereno;
      this.update();
      return;
    }

    this.agregando = true;
    this.shadowRoot.querySelector("#ultimo")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
    this.shadowRoot.querySelector("#input-desde-agregando").value = "";
    this.shadowRoot.querySelector("#input-sueldo-agregando").value = "";
    this.shadowRoot.querySelector("#select-agregando").value = -1;
    this.update();
  }

  editando(e) {
    let padre = e.currentTarget.parentElement;
    while (padre) {
      if (padre.sueldoSereno) {
        padre.sueldoSereno.modificando = true;
        break;
      } else {
        padre = padre.parentElement;
      }
    }
    this.modificando = true;
    this.update();
  }

  formatearFechaAPeriodo(fecha) {
    if (fecha) {
      let str = String(fecha);
      let anio = str.slice(0, 4);
      let mes = str.slice(5, 7);
      return Number(anio) * 100 + Number(mes);
    } else {
      return "";
    }
  }

  agregar() {
    let body = {
      convenioId: this.shadowRoot.querySelector("#select-agregando").value,
      desde: this.formatearFechaAPeriodo(
        this.shadowRoot.querySelector("#input-desde-agregando").value
      ),
      sueldoSereno: this.shadowRoot.querySelector("#input-sueldo-agregando")
        .value,
    };
    store.dispatch(add(body));
  }

  formatearPeriodo(periodo) {
    if (periodo) {
      const str = String(periodo);
      const anio = str.slice(0, 4);
      const mes = str.slice(4, 6);
      return anio + "-" + mes;
    } else {
      return "";
    }
  }

  editar(e, sueldoSereno) {
    let padre = e.currentTarget.parentElement;
    let body = {
      convenioSueldoSerenoId: sueldoSereno.id,
      sueldoSereno: padre.querySelector(".input-sueldo").value,
    };
    store.dispatch(update(body));
  }

  render() {
    return html`
      <div class="main inner-grid row">
        <div class="inner-grid cabecera column">
          <div class="inner-grid cabecera-titulos">
            <div class="grid center">Convenio</div>
            <div class="grid center">Desde</div>
            <div class="grid center">Sueldo</div>
          </div>

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
            id="ultimo"
            class="grid item"
            ?oculto="${!this.agregando}"
            ?modificando=${this.agregando}
          >
            <div class="select">
              <select id="select-agregando" ?oculto="${!this.agregando}">
                <option value="-1" disabled selected>
                  Selecciona una opción
                </option>
                ${this.convenios.map(
                  (convenio) =>
                    html`<option value="${convenio.id}">
                      ${convenio.descripcion}
                    </option>`
                )}
              </select>
            </div>
            <div class="input">
              <input
                class="grid center"
                id="input-desde-agregando"
                @input="${(e) => {
                  this.editando(e);
                }}"
                type="month"
                ?oculto="${!this.agregando}"
              />
            </div>
            <div class="input">
              <input
                class="grid center"
                id="input-sueldo-agregando"
                @input="${(e) => {
                  this.editando(e);
                }}"
                type="number"
                ?oculto="${!this.agregando}"
              />
            </div>
            <button flat @click="${this.agregar}">${CHECK}</button>
          </div>
          ${this.sueldosSereno.map(
            (sueldoSereno) =>
              html` <div
                class="grid item"
                ultimoid="${sueldoSereno.id}"
                .sueldoSereno=${sueldoSereno}
                ?modificando=${sueldoSereno.modificando}
              >
                <div class="select">
                  <select .value="${sueldoSereno.convenioId}" disabled>
                    ${this.convenios.map(
                      (convenio) =>
                        html`<option
                          value="${convenio.id}"
                          ?selected=${convenio.id == sueldoSereno.convenioId}
                        >
                          ${convenio.descripcion}
                        </option>`
                    )}
                  </select>
                </div>
                <div class="input">
                  <input
                    class="grid center"
                    .value="${this.formatearPeriodo(sueldoSereno.desde)}"
                    @input="${(e) => {
                      this.editando(e);
                    }}"
                    type="month"
                    disabled
                  />
                </div>
                <div class="input">
                  <input
                    class="grid center input-sueldo"
                    .value="${sueldoSereno.sueldoSereno}"
                    @input="${(e) => {
                      this.editando(e);
                    }}"
                    type="number"
                  />
                </div>
                <button
                  flat
                  ?oculto="${!sueldoSereno.modificando}"
                  @click="${(e) => {
                    this.editar(e, sueldoSereno);
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

  firstUpdated() {}

  stateChanged(state, name) {
    if (name == SCREEN || name == MEDIA_CHANGE) {
      this.mediaSize = state.ui.media.size;
      this.hidden = true;
      const isCurrentScreen = [CONVENIO_SUELDO_SERENO_SCREEN].includes(
        state.screen.name
      );
      if (isInLayout(state, this.area) && isCurrentScreen) {
        this.hidden = false;
      }
    }
    if (name == CONVENIOS) {
      this.convenios = state.boletasDeposito.convenio.querys.entities;
    }
    if (name == CONVENIO_SUELDO_SERENO) {
      this.sueldosSereno =
        state.boletasDeposito.convenioSueldoSereno.querys.entities;
      this.update();
      if (this.sueldoSerenoAddId != null) {
        let div = this.shadowRoot.querySelector(
          '*[ultimoid="' + this.sueldoSerenoAddId + '"]'
        );
        div?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "end",
        });
        div.toggleAttribute("nuevo");
        setTimeout(() => {
          div.toggleAttribute("nuevo");
        }, 750);

        this.sueldoSerenoAddId = null;
      }
    }
    if (name == CONVENIO_SUELDO_SERENO_ADD) {
      this.sueldoSerenoAddId =
        state.boletasDeposito.convenioSueldoSereno.commands.add;
      if (this.sueldoSerenoAddId.errors) {
        store.dispatch(showError("No se pudo agregar"));
      } else {
        this.agregarOCancelar();
        store.dispatch(getAll());
      }
    }
    if (name == CONVENIO_SUELDO_SERENO_UPDATE) {
      let retorno = state.boletasDeposito.convenioSueldoSereno.commands.update;
      if (retorno.status || retorno.StatusCode) {
        store.dispatch(showAlert("Error", "Valores invalidos"));
      } else {
        this.agregarOCancelar();
        store.dispatch(getAll());
      }
    }
  }

  static get properties() {
    return {
      hidden: { type: Boolean, reflect: true },
      area: { type: String, reflect: true },
    };
  }
}
window.customElements.define("sueldo-sereno-component", sueldoSerenoComponent);