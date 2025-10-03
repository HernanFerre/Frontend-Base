/** @format */

export const GET_ACTIVIDADES = "[actividad] get actividades";
export const GET_ACTIVIDADES_SUCCESS = "[actividad] get actividades success";
export const GET_ACTIVIDADES_ERROR = "[actividad] get actividades error";

export const GET_BY_DESCRIPTION = "[actividad] get by description";
export const GET_BY_DESCRIPTION_SUCCESS = "[actividad] get by description success";
export const GET_BY_DESCRIPTION_ERROR = "[actividad] get by description error";

export const GET_BY_ID = "[actividad] get by id";
export const GET_BY_ID_SUCCESS = "[actividad] get by id success";
export const GET_BY_ID_ERROR = "[actividad] get by id error";

export const ADD_ACTIVIDAD = "[actividad] add actividad";
export const ADD_ACTIVIDAD_SUCCESS = "[actividad] add actividad success";
export const ADD_ACTIVIDAD_ERROR = "[actividad] add actividad error";

export const UPDATE_ACTIVIDAD = "[actividad] update actividad";
export const UPDATE_ACTIVIDAD_SUCCESS = "[actividad] update actividad success";
export const UPDATE_ACTIVIDAD_ERROR = "[actividad] update actividad error"

export const getActividades = () => ({
    type: GET_ACTIVIDADES,
});

export const getByDescription = (descripcion) => ({
    type: GET_BY_DESCRIPTION,
    descripcion: descripcion
});

export const getById = (id) => ({
    type: GET_BY_ID,
    id: id
})

export const addActividad = (body) => ({
    type: ADD_ACTIVIDAD,
    body: body
})

export const updateActividad = (body) => ({
    type: UPDATE_ACTIVIDAD,
    body: body
})
