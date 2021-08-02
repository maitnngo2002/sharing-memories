import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user
        // eslint-disable-next-line no-restricted-globals
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up the user
        // eslint-disable-next-line no-restricted-globals
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}