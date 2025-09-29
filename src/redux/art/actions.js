/** @format */

export const GET_ART = "[art] get art";
export const GET_ART_SUCCESS = "[art] get art success";
export const GET_ART_ERROR = "[art] get art error";

export const GET_BY_DESCRIPTION = "[art] get by description";
export const GET_BY_DESCRIPTION_SUCCESS = "[art] get by description success";
export const GET_BY_DESCRIPTION_ERROR = "[art] get by description error";

export const GET_BY_ID = "[art] get by id";
export const GET_BY_ID_SUCCESS = "[art] get by id success"; 
export const GET_BY_ID_ERROR = "[art] get by id error";

export const ADD_ART = "[art] add art";
export const ADD_ART_SUCCESS = "[art] add art success"; 
export const ADD_ART_ERROR = "[art] add art error";

export const UPDATE_ART = "[art] update art";
export const UPDATE_ART_SUCCESS = "[art] update art success"; 
export const UPDATE_ART_ERROR = "[art] update art error";   



export const getArt = () => ({
    type: GET_ART,
});

export const getByDescription = (descripcion) => ({
    type: GET_BY_DESCRIPTION,
    descripcion: descripcion
}); 

export const getById = (id) => ({
    type: GET_BY_ID,
    id: id
}); 

export const addArt = (body) => ({
    type: ADD_ART,
    body: body
});

export const updateArt = (body) => ({
    type: UPDATE_ART,
    body: body
});
