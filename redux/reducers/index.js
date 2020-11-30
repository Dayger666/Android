import { combineReducers } from 'redux';
import question from './QuestionReducer';
import users from './UserReducer';

export default combineReducers({
    question,
    users,
});
