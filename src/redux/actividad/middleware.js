/** @format */

import { actByDescriptionFetch, actByIdFetch, actividadesFetch } from "../fetchs";
import { RESTRequest } from "../rest/actions";
import {
    GET_ACTIVIDADES,
    GET_ACTIVIDADES_ERROR,
    GET_ACTIVIDADES_SUCCESS,
    GET_BY_DESCRIPTION,
    GET_BY_DESCRIPTION_SUCCESS,
    GET_BY_DESCRIPTION_ERROR,
    GET_BY_ID,
    GET_BY_ID_ERROR,
    GET_BY_ID_SUCCESS,
    ADD_ACTIVIDAD,
    ADD_ACTIVIDAD_ERROR,
    ADD_ACTIVIDAD_SUCCESS,
    UPDATE_ACTIVIDAD,
    UPDATE_ACTIVIDAD_ERROR,
    UPDATE_ACTIVIDAD_SUCCESS
} from "./actions";

export const getActividades =
    ({ dispatch }) =>
        (next) =>
            (action) => {
                next(action);
                if (action.type === GET_ACTIVIDADES) {
                    dispatch(RESTRequest(actividadesFetch, "", GET_ACTIVIDADES_SUCCESS, GET_ACTIVIDADES_ERROR, ""));
                }
            };

export const getByDescription =
    ({ dispatch }) =>
        (next) =>
            (action) => {
                next(action);
                if (action.type === GET_BY_DESCRIPTION) {
                    dispatch(RESTRequest(actByDescriptionFetch, action.descripcion, GET_BY_DESCRIPTION_SUCCESS, GET_BY_DESCRIPTION_ERROR, ""));
                }
            };

export const getById =
    ({ dispatch }) =>
        (next) =>
            (action) => {
                next(action);
                if (action.type === GET_BY_ID) {
                    dispatch(RESTRequest(actByIdFetch, action.id, GET_BY_ID_SUCCESS, GET_BY_ID_ERROR, ""));
                }
            };

export const middleware = [getActividades, getByDescription, getById];
