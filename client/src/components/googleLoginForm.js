import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginForm = ({ onGoogleLoginSuccess }) => {
    return (
        <>
            <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={onGoogleLoginSuccess}
            />
        </>
    )
}

export default React.memo(GoogleLoginForm)