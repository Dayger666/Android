import React, { Component } from 'react';
import AuthForm from '../ui/AuthForm';

class LoginScreen extends Component {

    state = {
        authMode: 'login'
    }

    componentDidMount() {
        this.props.subscribeToAuthChanges(this.onAuthStateChanged)
    }

    onAuthStateChanged = (user) => {
        if (user !== null) {
            this.props.navigation.navigate('App');
        }
    }

    switchAuthMode = () => {
        this.setState(prevState => ({
            authMode: prevState.authMode === 'login' ? 'signup' : 'login'
        }));
    }

    render() {
        return (
            <AuthForm
                login={this.props.logIn}
                signup={this.props.signUp}
                authMode={this.state.authMode}
                switchAuthMode={this.switchAuthMode}
            />
        );
    }
}


export default LoginScreen;
