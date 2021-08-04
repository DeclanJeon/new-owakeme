import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { userLogIn } from '../reducer/actions/user'

const GoogleLoginForm = () => {
    const dispatch = useDispatch()

    const onGoogleLoginSuccess = (e) => {
        dispatch(userLogIn(e.profileObj.name))
    }

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