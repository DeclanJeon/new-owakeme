import { USER_LOG_IN, USER_LOG_OUT } from '../actions/user';

const initState = {
    userName: '',
    isLogin: false,
    isLogout: false
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LOG_IN:
            return {
                ...state,
                userName: action.userName,
                isLogin: true,
                isLogout: false
            };
        case USER_LOG_OUT:
            return {
                ...state,
                isLogin: false,
                isLogout: true
            };
        default:
            return state;
    }
}

export default userReducer;