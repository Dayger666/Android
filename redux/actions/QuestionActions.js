import { API } from '../../service/api';
import {firebase} from "../../config";
const  db = firebase.firestore();

export const getQuestions = (payload) => {
    return {
        type: 'GET_QUESTIONS',
        payload,
    };
};
export const getResult = (payload) => {
    return {
        type: 'GET_RESULT',
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
export const getResultThunkCreator = () => {
    return async (dispatch) => {
        try {
            db.collection("results").get().then((snap) =>{
                const result = [];
                snap.forEach((doc) =>{
                    result.push({userName: doc.data().displayName, highScore: doc.data().result})
                })
                dispatch(getResult(result));
                console.log(result);
                return result;
                //or you can use useState like const [data, setData] = useState([]); then setData(datas)
            })
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    };
};
export const setResultThunkCreator = ({result,displayName,email}) => {
    return async (dispatch) => {
        try {
            db.collection("results").add({
                result,
                displayName,
                email,
            }).then(function(docRef) {
                })
            dispatch(setResult({
                result,
                displayName,
                email,
            }));
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    };
};
