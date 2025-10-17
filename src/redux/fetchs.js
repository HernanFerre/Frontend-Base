/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApiExpedientes = SERVICE_URL;
let webApi = SERVICE_URL + "/v1";

const expedienteOdataFactory = ODataFetchFactory({
    fetch: fetch,
    domain: webApiExpedientes,
});

export const autorizacionFetch = fetchFactory(webApi, "Autorizacion");
export const autorizacionAceptarUsuarioFetch = fetchFactory(webApi, "Autorizacion/AceptarUsuario");
export const acceptFetch = fetchFactory(webApi, "Autorizacion/Accept");
export const artFetch = fetchFactory(webApi, "Art/All");
export const artByDescriptionFetch = fetchFactory(webApi, "Art/GetByDescripcion");
export const artByIdFetch = fetchFactory(webApi, "Art/GetById");
export const addArtFetch = fetchFactory(webApi, "Art/Add");
export const updateArtFetch = fetchFactory(webApi, "Art/Update");
export const deleteArtFetch = fetchFactory(webApi, "Art/Quitar");
export const actividadesFetch = fetchFactory(webApi, "Actividad/All");
export const actByDescriptionFetch = fetchFactory(webApi, "Actividad/GetByDescripcion");
export const actByIdFetch = fetchFactory(webApi, "Actividad/GetById");
export const addActividadFetch = fetchFactory(webApi, "Actividad/Add");
export const actividadUpdateFetch = fetchFactory(webApi, "Actividad/Update");
export const actividadDeleteFetch = fetchFactory(webApi, "Actividad/Quitar");
export const relevadorGetAllFetch = fetchFactory(webApi, "Relevador/All");
export const relevadorByIdFetch = fetchFactory(webApi, "Relevador/GetById");
export const relevadorByUserIdFetch = fetchFactory(webApi, "Relevador/GetByUserId");
