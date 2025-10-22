/** @format */
export const GET_ALL_EMPRESAS = "[empresa] get all empresas";
export const GET_ALL_EMPRESAS_SUCCESS = "[empresa] get all empresas success";
export const GET_ALL_EMPRESAS_ERROR = "[empresa] get all empresas error";

export const ADD_EMPRESA = "[empresa] add empresa";
export const ADD_EMPRESA_SUCCESS = "[empresa] add empresa success";
export const ADD_EMPRESA_ERROR = "[empresa] add empresa error";

export const UPDATE_EMPRESA = "[empresa] update empresa";
export const UPDATE_EMPRESA_SUCCESS = "[empresa] update empresa success";
export const UPDATE_EMPRESA_ERROR = "[empresa] update empresa error";

export const DELETE_EMPRESA = "[empresa] delete empresa";
export const DELETE_EMPRESA_SUCCESS = "[empresa] delete empresa success";
export const DELETE_EMPRESA_ERROR = "[empresa] delete empresa error";

export const getAllEmpresas = () => ({
    type: GET_ALL_EMPRESAS,
});

export const addEmpresa = (body) => ({
    type: ADD_EMPRESA,
    body: body,
});

export const updateEmpresa = (body) => ({
    type: UPDATE_EMPRESA,
    body: body,
});

export const deleteEmpresa = (id) => ({
    type: DELETE_EMPRESA,
    id: id,
});
