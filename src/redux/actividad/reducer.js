/** @format */

import { GET_ACTIVIDADES_ERROR, GET_ACTIVIDADES_SUCCESS } from "./actions";

const initialState = {
    timeStamp: null,
    timeStampError: null,
    entities: []
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_ACTIVIDADES_SUCCESS:
            newState.timeStamp = new Date().getTime();
            newState.entities = action.payload.receive;
            break;
        case GET_ACTIVIDADES_ERROR:
            newState.timeStampError = new Date().getTime();
            newState.entities = [];
            break;        
    }
    return newState;
};
