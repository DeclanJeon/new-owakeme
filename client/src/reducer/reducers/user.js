import { USER_LOG_IN, USER_LOG_OUT, GOOGLE_LOG_IN } from '../actions/user';

const initState = {
    userName: '',
    googleLogin: false,
    googleLogOut: false,
    isLogin: false,
    isLogout: false
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LOG_IN:
            return {
                ...state,
                userName: action.userName,
                googleLogin: false,
                isLogin: true,
                isLogout: false
            };
        case USER_LOG_OUT:
            return {
                ...state,
                isLogout: true
            };
        case GOOGLE_LOG_IN:
            return {
                ...state,
                userName: action.userName,
                googleLogin: true,
                googleLogOut: false,
                isLogin: false
            };
        default:
            return state;
    }
}

export default userReducer;