/** @format */

import { SET } from "./actions";

const initialState = {
    timeStamp: null,
    ok: false,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };

    switch (action.type) {
        case SET:
            newState.timeStamp = new Date().getTime();
            if (action.perfil) {
                newState.ok = true;
                newState.perfil = action.perfil;
            } else {
                newState.ok = false;
            }
            break;
    }

    return newState;
};
