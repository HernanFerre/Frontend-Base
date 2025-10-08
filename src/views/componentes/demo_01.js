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
import { CONVENIOS_SCREEN } from "../../redux/routing/routs";
import {
  add,
  getAll,
  UpdateDescripcion,
} from "../../redux/boletasDeposito/convenio/actions";
import { CANCELAR, CHECK, MAS } from "../../../assets/icons/svgs";
import { showAlert, showError } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const CONVENIOS = "boletasDeposito.convenio.querys.timeStamp";
const CONVENIOS_ADD = "boletasDeposito.convenio.commands.addTimeStamp";
const UPDATE = "boletasDeposito.convenio.commands.updateTimeStamp";

export class convenioComponent extends connect(
  store,
  MEDIA_CHANGE,
  CONVENIOS,
  CONVENIOS_ADD,
  UPDATE,
  SCREEN
)(LitElement) {
  constructor() {
    super();
    this.convenios = [];
    this.convenioAddId = null;
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
        min-width: 30vw;
        height: 75vh;
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

  volver() {
    store.dispatch(goHistoryPrev());
  }

  agregarOCancelar() {
    if (this.agregando || this.modificando) {
      this.modificando = false;
      this.agregando = false;

      this.convenios.forEach((convenio) => {
        convenio.modificando = false;
      });

      const convenios = this.convenios;
      this.convenios = [];
      this.update();
      this.convenios = convenios;
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
      if (padre.convenio) {
        padre.convenio.modificando = true;
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

  render() {
    return html`
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
          ${this.convenios.map(
            (convenio) =>
              html` <div
                class="grid item"
                ultimoid="${convenio.id}"
                .convenio=${convenio}
                ?modificando=${convenio.modificando}
              >
                <div class="input">
                  <input
                    class="grid center input-descripcion"
                    .value="${convenio.descripcion}"
                    @input="${(e) => {
                      this.editando(e);
                    }}"
                  />
                </div>
                <button
                  flat
                  ?oculto="${!convenio.modificando}"
                  @click="${(e) => {
                    this.editar(e, convenio);
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
      const isCurrentScreen = [CONVENIOS_SCREEN].includes(state.screen.name);
      if (isInLayout(state, this.area) && isCurrentScreen) {
        this.hidden = false;
      }
    }
    if (name == CONVENIOS) {
      this.convenios = state.boletasDeposito.convenio.querys.entities;
      this.update();
      if (this.convenioAddId != null) {
        let div = this.shadowRoot.querySelector(
          '*[ultimoid="' + this.convenioAddId + '"]'
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

        this.convenioAddId = null;
      }
    }
    if (name == CONVENIOS_ADD) {
      this.convenioAddId = state.boletasDeposito.convenio.commands.addId;
      this.agregarOCancelar();
      store.dispatch(getAll());
    }
    if (name == UPDATE) {
      let retorno = state.boletasDeposito.convenio.commands.update;
      if (retorno.StatusCode) {
        store.dispatch(showAlert("Error ", retorno.Message));
      } else {
        store.dispatch(getAll());
        this.agregarOCancelar();
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
window.customElements.define("convenio-component", convenioComponent);