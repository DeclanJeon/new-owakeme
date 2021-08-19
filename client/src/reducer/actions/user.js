export const USER_LOG_IN = 'USER_LOG_IN';
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const GOOGLE_LOG_IN = 'GOOGLE_LOG_IN';

export const userLogIn = (userName) => {
    return {
        type: USER_LOG_IN,
        userName: userName
    };
};

export const userLogOut = () => {
    return {
        type: USER_LOG_OUT
    }
};

export const googleLogIn = (userName) => {
    return {
        type: GOOGLE_LOG_IN,
        userName: userName
    };
};