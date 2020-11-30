const initState = {
    user: {},
    isLoggedIn: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER': {
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
            };
        }
        case 'CLEAR_USER': {
            return initState;
        }
        default:
            return state;
    }
};
