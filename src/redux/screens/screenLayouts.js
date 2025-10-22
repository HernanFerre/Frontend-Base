/** @format */

import { ALL_BODY, HEADER_BODY_FOOT, BODY_FOOT, HEADER_BODY, SLIDER_HEADER_BODY } from "./layouts";

export const screenLayuts = {
    main: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    ART: {
        small: HEADER_BODY,
        medium: ALL_BODY,
        large: HEADER_BODY,
    },
    Actividades: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    Relevadores: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    Demo: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
    Empresas: {
        small: HEADER_BODY,
        medium: HEADER_BODY,
        large: HEADER_BODY,
    },
};

export const getLayout = (state) => {
    if (!state.screen.layouts[state.ui.media.size]) throw "no hay un layout definido en el state para media-size:" + state.ui.media.size;
    let layout = state.screen.layouts[state.ui.media.size];
    if (state.screen.layouts[state.ui.media.size][state.ui.media.orientation]) {
        layout = state.screen.layouts[state.ui.media.size][state.ui.media.orientation];
    }
    return layout;
};

export const isInLayout = (state, area) => {
    return getLayout(state).areas.find((a) => a == area);
};
