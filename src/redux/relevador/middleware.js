/** @format */

import { relevadorGetAllFetch } from "../fetchs";
import { RESTRequest, RESTAdd, RESTUpdate } from "../rest/actions";
import {    
    GET_RELEVADOR,
    GET_RELEVADOR_ERROR,
    GET_RELEVADOR_SUCCESS,

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
    

    

export const middleware = [getRelevador];
