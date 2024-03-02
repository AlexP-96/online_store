import { USER_AUTH } from '../actions/actionsAuth';

const stateUserAuth = {
    name: '',
    email: '',
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
                name: payload.name,
                email: payload.email,
                token: payload.token,
            };
        default:
            return {
                ...state,
            };
    }
};