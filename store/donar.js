/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

let donarStorage = null;

if (typeof window !== 'undefined') {
    donarStorage = localStorage.getItem('donar') ? JSON.parse(localStorage.getItem('donar')) : {};
}

const donar = createSlice({
    name: 'donar',
    initialState: {
        donar: donarStorage?.donar || {},
        token: donarStorage?.token || '',
    },
    reducers: {
        ADD_DONAR_INFO: (state, action) => {
            state.donar = action.payload.donar;
            state.token = action.payload.token;
        },
        REMOVE_DONAR: (state) => {
            state.donar = {};
            state.token = '';
        },
    },
});

const donarReducer = donar.reducer;

export const { ADD_DONAR_INFO, REMOVE_DONAR } = donar.actions;

export const donarLogin = (data) => (dispatch) => {
    if (window !== 'undefined') {
        localStorage.setItem('donar', JSON.stringify(data));
    }
    dispatch({
        type: ADD_DONAR_INFO.type,
        payload: data,
    });
};

export default donarReducer;
