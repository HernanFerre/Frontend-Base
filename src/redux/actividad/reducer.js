/** @format */

import {
    GET_ACTIVIDADES_ERROR,
    GET_ACTIVIDADES_SUCCESS,
    GET_BY_DESCRIPTION_ERROR,
    GET_BY_DESCRIPTION_SUCCESS
} from "./actions";

const initialState = {
    all: {
        timeStamp: null,
        timeStampError: null,
    },
    byDescription: {
        entityByDescription: null,
        timeStamp: null,
        timeStampError: null
    },
    entities: []
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
        
    }
    return newState;
};
