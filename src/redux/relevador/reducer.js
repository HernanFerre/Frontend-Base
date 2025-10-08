/** @format */

import {
    GET_RELEVADOR_ERROR,
    GET_RELEVADOR_SUCCESS,
    GET_RELEVADOR_BY_ID_ERROR,
    GET_RELEVADOR_BY_ID_SUCCESS,
    GET_RELEVADOR_BY_USER_ID_ERROR,
    GET_RELEVADOR_BY_USER_ID_SUCCESS

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
    byUserId: {
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
        case GET_RELEVADOR_BY_ID_SUCCESS:
            newState.byId.timeStamp = new Date().getTime();
            newState.entity = action.payload.receive;
            break;
        case GET_RELEVADOR_BY_ID_ERROR:
            newState.byId.timeStampError = new Date().getTime();
            newState.entity = null;
            break;
        case GET_RELEVADOR_BY_USER_ID_SUCCESS:
            newState.byUserId.timeStamp = new Date().getTime();
            newState.entity = action.payload.receive;
            break;
        case GET_RELEVADOR_BY_USER_ID_ERROR:
            newState.byUserId.timeStampError = new Date().getTime();
            newState.entity = null;
            break;
        
    }
    return newState;
};
