import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseConfig from '../config/firebaseConfig';
import FirebaseUiConfig from '../config/firebaseUiConfig';
import { GoogleLogout } from 'react-google-login';
import "../assets/css/google.css";

const GoogleLoginForm = ({ setUserName }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    // initializeApp 두번 호출하는 부분 조심하기
    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }
    firebase.analytics();
    
    useEffect(() => {
        if(isSignedIn){
            console.log(firebase.auth().currentUser.photoURL)
            setUserName(firebase.auth().currentUser.displayName);
        }

        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, [isSignedIn])

    if(!isSignedIn){
        return (
            <div>
                <StyledFirebaseAuth uiConfig={FirebaseUiConfig} firebaseAuth={firebase.auth()} />
            </div>
        )  
    }
    return (
        <div>
            <GoogleLogout
                className="googleLogout"
                clientId={googleClientId}
                buttonText="Sign out with Google"
                onLogoutSuccess={() => firebase.auth().signOut()}
            >
            </GoogleLogout>
        </div>
    )
}

export default React.memo(GoogleLoginForm)