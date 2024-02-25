import { USER_AUTH } from '../actions/actionsAuth';

const stateUserAuth = {
    name: '',
    email: '',
    auth: false,
    // card: [
    //     {
    //         product: '',
    //         name: '',
    //         count: '',
    //     },
    // ],
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
                auth: true,
            };
        default:
            return {
                ...state,
            };
    }
};