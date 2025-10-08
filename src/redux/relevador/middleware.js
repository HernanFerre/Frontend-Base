/** @format */

import { relevadorGetAllFetch, relevadorByIdFetch, relevadorByUserIdFetch } from "../fetchs";
import { RESTRequest, RESTAdd, RESTUpdate } from "../rest/actions";
import {    
    GET_RELEVADOR,
    GET_RELEVADOR_ERROR,
    GET_RELEVADOR_SUCCESS,
    GET_RELEVADOR_BY_ID,
    GET_RELEVADOR_BY_ID_ERROR,
    GET_RELEVADOR_BY_ID_SUCCESS,    
    GET_RELEVADOR_BY_USER_ID,
    GET_RELEVADOR_BY_USER_ID_ERROR,
    GET_RELEVADOR_BY_USER_ID_SUCCESS

} from "./actions";

export const getRelevador =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RELEVADOR) {
            dispatch(RESTRequest(relevadorGetAllFetch, "", GET_RELEVADOR_SUCCESS, GET_RELEVADOR_ERROR, ""));
        }
    };

export const getRelevadorById =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RELEVADOR_BY_ID) {
            dispatch(RESTRequest(relevadorByIdFetch, action.id, GET_RELEVADOR_BY_ID_SUCCESS, GET_RELEVADOR_BY_ID_ERROR, ""));
        }
    };

export const getRelevadorByUserId =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_RELEVADOR_BY_USER_ID) {
            dispatch(RESTRequest(relevadorByUserIdFetch, action.userId, GET_RELEVADOR_BY_USER_ID_SUCCESS, GET_RELEVADOR_BY_USER_ID_ERROR, ""));
        }
    };
    

    

    

export const middleware = [getRelevador, getRelevadorById, getRelevadorByUserId];
