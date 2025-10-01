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
export const actByDescriptionFetch = fetchFactory(webApi, "Actividad/GetByDescripcion");
export const actividadesFetch = fetchFactory(webApi, "Actividad/All");
