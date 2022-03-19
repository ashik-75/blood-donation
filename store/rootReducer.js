import { combineReducers } from '@reduxjs/toolkit';
import donarReducer from './donar';

const rootReducer = combineReducers({
    donar: donarReducer,
});

export default rootReducer;
