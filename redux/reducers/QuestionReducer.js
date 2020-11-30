const initState = {
    questions: [],
    result:[]
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'GET_QUESTIONS': {
            return {
                ...state,
                questions: [...action.payload],
            };
        }
        case 'GET_RESULT': {
            return {
                ...state,
                result: [...action.payload],
            };
        }
        case 'SET_RESULT': {
            return {
                ...state,
                result: [...state.result,action.payload],
            };
        }
        default:
            return state;
    }
};
