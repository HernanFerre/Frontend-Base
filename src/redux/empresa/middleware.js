/** @format */

import { RESTRequest, RESTAdd, RESTUpdate, RESTDelete } from "../rest/actions";
import { getEmpresasFetch, addEmpresaFetch, updateEmpresaFetch } from "../fetchs";
import {
    GET_ALL_EMPRESAS,
    GET_ALL_EMPRESAS_SUCCESS,
    GET_ALL_EMPRESAS_ERROR,
    ADD_EMPRESA,
    ADD_EMPRESA_SUCCESS,
    ADD_EMPRESA_ERROR,
    UPDATE_EMPRESA,
    UPDATE_EMPRESA_SUCCESS,
    UPDATE_EMPRESA_ERROR,
    DELETE_EMPRESA,
    DELETE_EMPRESA_SUCCESS,
    DELETE_EMPRESA_ERROR,
} from "./actions";

export const getAllEmpresas =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ALL_EMPRESAS) {
            dispatch(
                RESTRequest(
                    getEmpresasFetch,
                    "",
                    GET_ALL_EMPRESAS_SUCCESS,
                    GET_ALL_EMPRESAS_ERROR,
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJlNWM4ZDczNC0yYmE2LTRmNmUtOGQ3YS1iOTFlMGFkNGY5NTMiLCJ1bmlxdWVfbmFtZSI6ImJtb25mcmlub3R0aSIsImZhbWlseV9uYW1lIjoiTW9uZnJpbm90dGkiLCJnaXZlbl9uYW1lIjoiQnJ1bm8iLCJlbWFpbCI6IkJNb25mcmlub3R0aUB1b2NyYS5vcmciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy91cmkiOiIiLCJhdXRobWV0aG9kIjoiV2ViQXBpIiwicHJpbWFyeWdyb3Vwc2lkIjoiTERBUDovL0NOPUJNb25mcmlub3R0aSxPVT1Vc2VycyxPVT1EZXNhcnJvbGxvLE9VPVNpc3RlbWFzLE9VPU9zcGVjb24sREM9cnN1b2NyYSxEQz1sb2NhbCIsInJvbGUiOlsiU1FMX0Rlc2Fycm9sbG8iLCJsaXN0YWNndHJhIiwibGlzdGFzc3QiLCJQZXJzb25hbE1vZGkiLCJHU2lzdGVtYXMiLCJQUk9HUkFNQURPUkVTIiwiU09NQWRtaW5pc3RyYWRvciIsImNlbnRyYWxleGVwIiwiRnVsbCBBY2NlcyIsIkxpc3RhZWxjYXNjb2FtYXJpbGxvIiwiVG9kb3MiLCJQZXJzb25hbCIsIkFsbXVlcnpvIE9zcGVjb24iLCJ0b2Rvc1VzdWFyaW9zIiwiY2VudHJhbCIsInBlcnNvbmFsZXhlcCJdLCJuYmYiOjE3NjEwNzQ1MjksImV4cCI6MTc2MTA4NTMyOSwiaWF0IjoxNzYxMDc0NTI5fQ.b-cZE1kpwk0vAPU8rOKxe2i3mCQcZzuiui3bXYp7zQ0"
                )
            );
        }
    };

export const addEmpresa =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_EMPRESA) {
            dispatch(RESTAdd(addEmpresaFetch, action.body, ADD_EMPRESA_SUCCESS, ADD_EMPRESA_ERROR, ""));
        }
    };

export const updateEmpresa =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_EMPRESA) {
            dispatch(RESTUpdate(updateEmpresaFetch, "", action.body, UPDATE_EMPRESA_SUCCESS, UPDATE_EMPRESA_ERROR, ""));
        }
    };

export const deleteEmpresa =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === DELETE_EMPRESA) {
            dispatch(RESTDelete(empresaDeleteFetch, action.id, DELETE_EMPRESA_SUCCESS, DELETE_EMPRESA_ERROR, ""));
        }
    };

export const middleware = [getAllEmpresas, addEmpresa, updateEmpresa, deleteEmpresa];
