import { connect } from 'react-redux';
import { compose } from 'redux';

import {getQuestionsThunkCreator, setResultThunkCreator} from '../../redux/actions/QuestionActions';

import QuizIndex from './QuizIndex';

const mapStateToProps = (state) => ({
    questions: state.question.questions,
    result: state.question.result,
});

const mapDispatchToProps = (dispatch) => ({
    getQuestions: (total_questions,difficulty) => dispatch(getQuestionsThunkCreator(total_questions,difficulty)),
    setResult: (name,score)=>dispatch(setResultThunkCreator({name,score})),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    QuizIndex,
);
