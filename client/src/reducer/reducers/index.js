import userReducer from './user'
import channelReducer from './channel'
import deviceReducer from './deviceList'
import trackReducer from './track'
import chattingReducer from './chatting'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ userReducer, channelReducer, deviceReducer, trackReducer, chattingReducer });

export default rootReducer;