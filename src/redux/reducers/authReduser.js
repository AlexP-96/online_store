const stateAuth = {
    id: '',
    login: '',
    password: '',
    name: '',
    last_name: '',
    count: 0,
    authorization: false,
};

const rootReducer = (state = stateAuth,
    {
        type,
        payload,
    },
) => {
    switch (type) {
        case 'INC':
            return {
                ...state,
                count: payload + 1,
            };
        case 'DEC':
            return {
                ...state,
                count: payload - 1,
            };
        default:
            return { ...state };
    }
};

export default rootReducer;
