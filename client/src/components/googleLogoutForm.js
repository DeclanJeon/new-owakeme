import React from 'react';
import { GoogleLogout } from 'react-google-login';

const GoogleLogoutForm = () => {
    return (
        <>
            <GoogleLogout 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Logout"
            />
        </>
    )
}

export default React.memo(GoogleLogoutForm)