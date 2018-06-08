import { combineReducers } from 'redux'
import tips from './tips'
import profile from './profile'
import ratings from './ratings'
// import authenticate from './authenticate';
// import user from './user';

const MainReducer = combineReducers({
    tips,
    profile,
    ratings
    // categories,
    // comments,
    // user,
})

export default MainReducer