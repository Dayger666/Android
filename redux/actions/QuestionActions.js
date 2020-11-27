import { API } from '../../service/api';

export const getQuestions = (payload) => {
    return {
        type: 'GET_QUESTIONS',
        payload,
    };
};
export const setResult = (payload) => {
    return {
        type: 'SET_RESULT',
        payload,
    };
};

export const _ = (array) => [...array].sort(() => Math.random() - 0.7);
export const getQuestionsThunkCreator = (total_questions,difficulty) => {
    return async (dispatch) => {
        try {
            const response = await API.grabQuizQuestions(total_questions,difficulty);
            const result = response.data.results.map((quizprops) => ({
                ...quizprops,
                answers: _([...quizprops.incorrect_answers, quizprops.correct_answer]),
            }));
            dispatch(getQuestions(result));
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    };
};

export const setResultThunkCreator = (result) => {
    return async (dispatch) => {
        try {
            dispatch(setResult(result));
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    };
};
