import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseConfig from '../config/firebaseConfig';
import FirebaseUiConfig from '../config/firebaseUiConfig';
import { GoogleLogout } from 'react-google-login';
import "../assets/css/google.css";
import { userLogIn, userLogOut } from "../reducer/actions/user";

const GoogleLoginForm = ({ setUserName }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const dispatch = useDispatch();

    // initializeApp 두번 호출하는 부분 조심하기
    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }
    firebase.analytics();
    
    useEffect(() => {
        if(isSignedIn){
            dispatch(userLogIn(firebase.auth().currentUser.displayName, firebase.auth().currentUser.photoURL))
            setUserName(firebase.auth().currentUser.displayName);
        }

        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, [isSignedIn]);

    const GoogleLogOut = useCallback(() => {
        dispatch(userLogOut());
        firebase.auth().signOut();
    }, []);

    if(!isSignedIn){
        return (
            <div>
                <StyledFirebaseAuth uiConfig={FirebaseUiConfig} firebaseAuth={firebase.auth()} />
            </div>
        )  
    }

    window.onunload  = function(e) {
       GoogleLogOut();
       return "";
    };

    return (
        <div>
            <GoogleLogout
                className="googleLogout"
                clientId={googleClientId}
                buttonText="Sign out"
                onLogoutSuccess={GoogleLogOut}
            >
            </GoogleLogout>
        </div>
    )
}

export default React.memo(GoogleLoginForm)