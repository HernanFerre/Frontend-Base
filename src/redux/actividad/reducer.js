/** @format */

import {
    GET_ACTIVIDADES_ERROR,
    GET_ACTIVIDADES_SUCCESS,
    GET_BY_DESCRIPTION_ERROR,
    GET_BY_DESCRIPTION_SUCCESS,
    GET_BY_ID_ERROR,
    GET_BY_ID_SUCCESS,
    ADD_ACTIVIDAD_ERROR,
    ADD_ACTIVIDAD_SUCCESS,
    UPDATE_ACTIVIDAD_ERROR,
    UPDATE_ACTIVIDAD_SUCCESS,
    DELETE_ACTIVIDAD_ERROR,
    DELETE_ACTIVIDAD_SUCCESS,
} from "./actions";

const initialState = {
    all: {
        timeStamp: null,
        timeStampError: null,
    },
    byDescription: {
        entityByDescription: null,
        timeStamp: null,
        timeStampError: null,
    },
    byId: {
        timeStamp: null,
        timeStampError: null,
    },
    addActividad: {
        addId: null,
        timeStamp: null,
        timeStampError: null,
    },
    updateActividad: {
        resultado: null,
        timeStamp: null,
        timeStampError: null,
    },
    deleteActividad: {
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
        case GET_ACTIVIDADES_SUCCESS:
            newState.all.timeStamp = new Date().getTime();
            newState.entities = action.payload.receive;
            break;
        case GET_ACTIVIDADES_ERROR:
            newState.all.timeStampError = new Date().getTime();
            newState.entities = [];
            break;
        case GET_BY_DESCRIPTION_SUCCESS:
            newState.byDescription.timeStamp = new Date().getTime();
            newState.byDescription.entityByDescription = action.payload.receive;
            break;
        case GET_BY_DESCRIPTION_ERROR:
            newState.byDescription.timeStampError = new Date().getTime();
            break;
        case GET_BY_ID_SUCCESS:
            newState.byId.timeStamp = new Date().getTime();
            newState.entity = action.payload.receive;
            break;
        case GET_BY_ID_ERROR:
            newState.byId.timeStampError = new Date().getTime();
            newState.entity = null;
            break;
        case ADD_ACTIVIDAD_SUCCESS:
            newState.addActividad.timeStamp = new Date().getTime();
            newState.addActividad.addId = action.payload.receive;
            break;
        case ADD_ACTIVIDAD_ERROR:
            newState.addActividad.timeStampError = new Date().getTime();
            newState.addActividad.addId = null;
            break;
        case UPDATE_ACTIVIDAD_SUCCESS:
            newState.updateActividad.timeStamp = new Date().getTime();
            newState.updateActividad.resultado = action.payload.receive;
            break;
        case UPDATE_ACTIVIDAD_ERROR:
            newState.updateActividad.timeStampError = new Date().getTime();
            break;
        case DELETE_ACTIVIDAD_SUCCESS:
            newState.deleteActividad.timeStamp = new Date().getTime();
            newState.deleteActividad.resultado = action.payload.receive;
            break;
        case DELETE_ACTIVIDAD_ERROR:
            newState.deleteActividad.timeStampError = new Date().getTime();
            break;
    }
    return newState;
};
