/** @format */

export const GET_ACTIVIDADES = "[actividad] get actividades";
export const GET_ACTIVIDADES_SUCCESS = "[actividad] get actividades success";
export const GET_ACTIVIDADES_ERROR = "[actividad] get actividades error";

export const GET_BY_DESCRIPTION = "[actividad] get by description";
export const GET_BY_DESCRIPTION_SUCCESS = "[actividad] get by description success";
export const GET_BY_DESCRIPTION_ERROR = "[actividad] get by description error";

export const getActividades = () => ({
    type: GET_ACTIVIDADES,
});

export const getByDescription = (descripcion) => ({
    type: GET_BY_DESCRIPTION,
    descripcion: descripcion
});