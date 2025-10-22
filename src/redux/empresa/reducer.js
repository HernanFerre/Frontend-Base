/** @format */

import {
    GET_ALL_EMPRESAS_ERROR,
    GET_ALL_EMPRESAS_SUCCESS,
    ADD_EMPRESA_ERROR,
    ADD_EMPRESA_SUCCESS,
    UPDATE_EMPRESA_ERROR,
    UPDATE_EMPRESA_SUCCESS,
    DELETE_EMPRESA_ERROR,
    DELETE_EMPRESA_SUCCESS,
} from "./actions";

const initialState = {
    all: {
        timeStamp: null,
        timeStampError: null,
    },
    addEmpresa: {
        addId: null,
        timeStamp: null,
        timeStampError: null,
    },
    updateEmpresa: {
        resultado: null,
        timeStamp: null,
        timeStampError: null,
    },
    deleteEmpresa: {
        resultado: null,
        timeStamp: null,
        timeStampError: null,
    },
    entities: [],
    entity: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET_ALL_EMPRESAS_SUCCESS:
            newState.all.timeStamp = new Date().getTime();
            if (action.payload.receive.length) {
                newState.entities = action.payload.receive;
            }
            break;
        case GET_ALL_EMPRESAS_ERROR:
            newState.all.timeStampError = new Date().getTime();
            break;
        case ADD_EMPRESA_SUCCESS:
            newState.addEmpresa.timeStamp = new Date().getTime();
            newState.addEmpresa.addId = action.payload.receive;
            break;
        case ADD_EMPRESA_ERROR:
            newState.addEmpresa.timeStampError = new Date().getTime();
            break;
        case UPDATE_EMPRESA_SUCCESS:
            newState.updateEmpresa.timeStamp = new Date().getTime();
            newState.updateEmpresa.resultado = action.payload.receive;
            break;
        case UPDATE_EMPRESA_ERROR:
            newState.updateEmpresa.timeStampError = new Date().getTime();
            break;
        case DELETE_EMPRESA_SUCCESS:
            newState.deleteEmpresa.timeStamp = new Date().getTime();
            newState.deleteEmpresa.resultado = action.payload.receive;
            break;
        case DELETE_EMPRESA_ERROR:
            newState.deleteEmpresa.timeStampError = new Date().getTime();
            break;
    }
    return newState;
};
