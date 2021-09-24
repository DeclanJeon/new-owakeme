import { USER_LOG_IN, USER_LOG_OUT } from '../actions/user';

const initState = {
    userName: '',
    photoURL: '',
    isLogin: false,
    isLogout: false
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LOG_IN:
            return {
                ...state,
                userName: action.userName,
                photoURL: action.photoURL,
                isLogin: true,
                isLogout: false
            };
        case USER_LOG_OUT:
            return {
                ...state,
                userName: '',
                isLogin: false,
                isLogout: true
            };
        default:
            return state;
    }
}

export default userReducer;