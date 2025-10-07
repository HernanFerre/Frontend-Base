/** @format */

import {
    GET_RELEVADOR_ERROR,
    GET_RELEVADOR_SUCCESS,

} from "./actions";

const initialState = {
    all: {
        timeStamp: null,
        timeStampError: null
    },
    byId: {
        timeStamp: null,
        timeStampError: null
    },
    entities: [],
    entity: null
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case GET_RELEVADOR_SUCCESS:
            newState.all.timeStamp = new Date().getTime();
            newState.entities = action.payload.receive;
            break;
        case GET_RELEVADOR_ERROR:
            newState.all.timeStampError = new Date().getTime();
            newState.entities = [];
            break;
        
    }
    return newState;
};
