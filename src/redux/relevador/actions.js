/** @format */

export const GET_RELEVADOR = "[relevador] get"
export const GET_RELEVADOR_SUCCESS = "[relevador] get relevador success";
export const GET_RELEVADOR_ERROR = "[relevador] get relevador error";

export const GET_RELEVADOR_BY_ID = "[relevador] get relevador by id";
export const GET_RELEVADOR_BY_ID_SUCCESS = "[relevador] get relevador by id success";
export const GET_RELEVADOR_BY_ID_ERROR = "[relevador] get relevador by id ERROR";

export const GET_RELEVADOR_BY_USER_ID = "[relevador] get relevador by user id";
export const GET_RELEVADOR_BY_USER_ID_SUCCESS = "[relevador] get relevador by user id success";
export const GET_RELEVADOR_BY_USER_ID_ERROR = "[relevador] get relevador by user id ERROR";


export const getRelevador = () => ({
    type: GET_RELEVADOR,
});

export const getRelevadorById = (id) => ({
    type: GET_RELEVADOR_BY_ID,
    id: id,
});

export const getRelevadorByUserId = (userId) => ({
    type: GET_RELEVADOR_BY_USER_ID,
    userId: userId,
});


