/** @format */

import { artByDescriptionFetch, artFetch, artByIdFetch, addArtFetch, updateArtFetch } from "../fetchs";
import { RESTRequest, RESTAdd, RESTUpdate } from "../rest/actions";
import {    
    GET_ART,
    GET_ART_ERROR,
    GET_ART_SUCCESS,
    GET_BY_DESCRIPTION,
    GET_BY_DESCRIPTION_ERROR,
    GET_BY_DESCRIPTION_SUCCESS,
    GET_BY_ID, GET_BY_ID_ERROR,
    GET_BY_ID_SUCCESS,
    ADD_ART,
    ADD_ART_ERROR,
    ADD_ART_SUCCESS,
    UPDATE_ART,
    UPDATE_ART_ERROR,
    UPDATE_ART_SUCCESS
} from "./actions";

export const getArt =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ART) {
            dispatch(RESTRequest(artFetch, "", GET_ART_SUCCESS, GET_ART_ERROR, ""));
        }
    };
    
export const getByDescription =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_DESCRIPTION) {
            dispatch(RESTRequest(artByDescriptionFetch, action.descripcion, GET_BY_DESCRIPTION_SUCCESS, GET_BY_DESCRIPTION_ERROR, ""));
        }
    };

export const getById =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_ID) {
            dispatch(RESTRequest(artByIdFetch, action.id, GET_BY_ID_SUCCESS, GET_BY_ID_ERROR, ""));
        }
    };
    
export const addArt =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_ART) {
            dispatch(RESTAdd(addArtFetch, action.body, ADD_ART_SUCCESS, ADD_ART_ERROR, ""));
        }
    };

export const updateArt =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_ART) {
            dispatch(RESTUpdate(updateArtFetch, "", action.body, UPDATE_ART_SUCCESS, UPDATE_ART_ERROR, ""));
        }
    };
    

export const middleware = [getArt, getByDescription, getById, addArt, updateArt];
