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
