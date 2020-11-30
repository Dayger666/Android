import {firebase} from "../../config";


export const createUser = (payload) => {
    return {
        type: 'CREATE_USER',
        payload,
    };
};
export const resetUser = () => {
    return {
        type: 'CLEAR_USER',
    };
};
export const signUp = ( {email, password, displayName} ) => {
    return async (dispatch) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userInfo) => {
                    userInfo.user.updateProfile({ displayName: displayName.trim() })
                        .then(() => {dispatch(createUser({displayName,email})); })
                })
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    };
};

export const logIn = ( {email, password} ) => {
    return async (dispatch) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(createUser(user));
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }

    };
};
export const subscribeToAuthChanges =  (authStateChanged)=> {
    return  async (dispatch) => {
        try {
            await firebase.auth().onAuthStateChanged((user) => {
                authStateChanged(user);
                if(user) {
                    dispatch(createUser({displayName: user.displayName, email: user.email}));
                }
            })
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    };
}
export const logOut = (onSignedOut) => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut();
            dispatch(resetUser());
            onSignedOut();
        } catch (error) {
            alert(error.response.data.message);
            throw error;
        }
    };
};
