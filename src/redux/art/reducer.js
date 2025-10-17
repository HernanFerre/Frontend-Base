/** @format */

import {
    GET_ART_ERROR,
    GET_ART_SUCCESS,
    GET_BY_DESCRIPTION_ERROR,
    GET_BY_DESCRIPTION_SUCCESS,
    GET_BY_ID_ERROR,
    GET_BY_ID_SUCCESS,
    ADD_ART_ERROR,
    ADD_ART_SUCCESS,
    UPDATE_ART_ERROR,
    UPDATE_ART_SUCCESS,
    DELETE_ART_ERROR,
    DELETE_ART_SUCCESS,
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
    addArt: {
        addId: null,
        timeStamp: null,
        timeStampError: null,
    },
    updateArt: {
        resultado: null,
        timeStamp: null,
        timeStampError: null,
    },
    deleteArt: {
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
        case GET_ART_SUCCESS:
            newState.all.timeStamp = new Date().getTime();
            newState.entities = action.payload.receive;
            break;
        case GET_ART_ERROR:
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
        case ADD_ART_SUCCESS:
            newState.addArt.timeStamp = new Date().getTime();
            newState.addArt.addId = action.payload.receive;
            break;
        case ADD_ART_ERROR:
            newState.addArt.timeStampError = new Date().getTime();
            // Optionally handle error state, e.g., set an error message
            break;
        case UPDATE_ART_SUCCESS:
            newState.updateArt.timeStamp = new Date().getTime();
            newState.updateArt.resultado = action.payload.receive;
            break;
        case UPDATE_ART_ERROR:
            newState.updateArt.timeStampError = new Date().getTime();
            break;
        case DELETE_ART_SUCCESS:
            newState.deleteArt.timeStamp = new Date().getTime();
            newState.deleteArt.resultado = action.payload.receive;
            break;
        case DELETE_ART_ERROR:
            newState.deleteArt.timeStampError = new Date().getTime();
            break;
    }
    return newState;
};
