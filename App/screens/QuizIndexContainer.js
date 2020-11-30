import { connect } from 'react-redux';
import { compose } from 'redux';

import {
    getQuestionsThunkCreator,
    getResultThunkCreator,
    setResultThunkCreator
} from '../../redux/actions/QuestionActions';

import QuizIndex from './QuizIndex';
import {logOut} from "../../redux/actions/UserActions";

const mapStateToProps = (state) => ({
    questions: state.question.questions,
    result: state.question.result,
    user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
    getQuestions: (total_questions,difficulty) => dispatch(getQuestionsThunkCreator(total_questions,difficulty)),
    signout:(onSignedOut)=>dispatch(logOut(onSignedOut)),
    setResult:(result,displayName,email)=>dispatch(setResultThunkCreator({result,displayName,email})),
    getResult:()=>dispatch(getResultThunkCreator()),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    QuizIndex,
);
