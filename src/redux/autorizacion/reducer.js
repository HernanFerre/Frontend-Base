/** @format */

import {
    AUTORIZACION,
    AUTORIZACION_SUCCESS,
    AUTORIZACION_ERROR,
    ACCEPT_SUCCESS,
    ACCEPT_ERROR,
    ACEPTAR_USUARIO_SUCCESS,
    ACEPTAR_USUARIO_ERROR,
    GET_PERFIL,
    GET_PERFIL_SUCCESS,
    GET_PERFIL_ERROR,
} from "./actions";

const initialState = {
    entities: null,
    tokenAutentication: null,
    timeStamp: null,
    perfilTimeStamp: null,
    errorTimeStamp: null,
    acceptTimeStamp: null,
    aceptarUsuario: {
        timeStamp: null,
        errorTimeStamp: null,
    },
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case AUTORIZACION:
            newState.tokenAutentication = action.token;
            break;
        case ACEPTAR_USUARIO_SUCCESS:
            newState.aceptarUsuario.timeStamp = new Date().getTime();
            break;
        case AUTORIZACION_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_PERFIL_SUCCESS:
            newState.entities = action.payload.receive;
            newState.perfilTimeStamp = new Date().getTime();
            break;
        case AUTORIZACION_ERROR:
        case GET_PERFIL_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case ACEPTAR_USUARIO_ERROR:
            newState.aceptarUsuario.errorTimeStamp = new Date().getTime();
            break;
        case ACCEPT_SUCCESS:
            newState.acceptTimeStamp = new Date().getTime();
            break;
        case AUTORIZACION_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
