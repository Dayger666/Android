import { connect } from 'react-redux';
import { compose } from 'redux';

import {logIn, signUp, subscribeToAuthChanges} from "../../redux/actions/UserActions";
import LoginScreen from "./LoginScreen";

const mapStateToProps = (state) => ({
    user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (email, password, displayName) => dispatch(signUp(email, password, displayName)),
    logIn:( email, password) => dispatch(logIn( email, password)),
    subscribeToAuthChanges:(authStateChanged) => dispatch(subscribeToAuthChanges(authStateChanged)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    LoginScreen,
);
