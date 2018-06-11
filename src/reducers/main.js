import { combineReducers } from 'redux'
import tips from './tips'
import profile from './profile'
import ratings from './ratings'
import errors from './errors';
// import user from './user';

const MainReducer = combineReducers({
    tips,
    profile,
    ratings,
    errors
    // comments,
    // user,
})

export default MainReducer