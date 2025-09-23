/** @format */

import { reducer as uiReducer } from "./ui/reducer";
import { reducer as screenReducer } from "./screens/reducer";
import { reducer as routingReducer } from "./routing/reducer";
import { reducer as apiReducer } from "./api/reducer";
import { reducer as autorizacionReducer } from "./autorizacion/reducer";
import { reducer as miPerfilReducer } from "./miPerfil/reducer";

export const rootReducer = (state = {}, action) => {
    const presentacionesEstadosRed = state.presentacionesEstados;
    return {
        autorizacion: autorizacionReducer(state.autorizacion, action),
        api: apiReducer(state.api, action),
        ui: uiReducer(state.ui, action),
        screen: screenReducer(state.screen, action),
        routing: routingReducer(state.routing, action),
        miPerfil: miPerfilReducer(state.miPerfil, action),
    };
};
