import { USER_AUTH } from '../actions/actionsAuth';

const stateUserAuth = {
    token: '',
};

export const userAuth = (
    state = stateUserAuth,
    {
        type,
        payload,
    },
) => {
    switch (type) {
        case USER_AUTH:
            return {
                ...state,
                token: payload.token,
            };
        default:
            return {
                ...state,
            };
    }
};