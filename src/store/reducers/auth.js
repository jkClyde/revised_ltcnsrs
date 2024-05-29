import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  // FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
  LOGOUT
} from '../actions/types';

import { SET_MARKED, SET_STATS, SET_ADMIN_STATUS } from '../actions/calendar_types';

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null,

  isMarked: false,
  success: 0,

  //STATISTICS
  lfa_severe: 0,
  lfa_stunted: 0,
  lfa_normal: 0,
  lfa_tall: 0,

  wfa_severe: 0,
  wfa_underweight: 0,
  wfa_normal: 0,
  wfa_overweight: 0,

  wfl_severe: 0,
  wfl_wasted: 0,
  wfl_normal: 0,
  wfl_overweight: 0,
  wfl_obese: 0,

  population: 0,

  lfa_severe_percentage: 0,
  lfa_stunted_percentage: 0,
  lfa_normal_percentage: 0,
  lfa_tall_percentage: 0,

  wfa_severe_percentage: 0,
  wfa_underweight_percentage: 0,
  wfa_normal_percentage: 0,
  wfa_overweight_percentage: 0,

  wfl_severe_percentage: 0,
  wfl_wasted_percentage: 0,
  wfl_normal_percentage: 0,
  wfl_overweight_percentage: 0,
  wfl_obese_percentage: 0,
  admin_status: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_STATS:
      return {
        ...state,
        lfa_severe: action.payload.lfa_severe || state.lfa_severe,
        lfa_stunted: action.payload.lfa_stunted || state.lfa_stunted,
        lfa_normal: action.payload.lfa_normal || state.lfa_normal,
        lfa_tall: action.payload.lfa_tall || state.lfa_tall,

        wfa_severe: action.payload.wfa_severe || state.wfa_severe,
        wfa_underweight: action.payload.wfa_underweight || state.wfa_underweight,
        wfa_normal: action.payload.wfa_normal || state.wfa_normal,
        wfa_overweight: action.payload.wfa_overweight || state.wfa_overweight,

        wfl_severe: action.payload.wfl_severe || state.wfl_severe,
        wfl_wasted: action.payload.wfl_wasted || state.wfl_wasted,
        wfl_normal: action.payload.wfl_normal || state.wfl_normal,
        wfl_overweight: action.payload.wfl_overweight || state.wfl_overweight,
        wfl_obese: action.payload.wfl_obese || state.wfl_obese,

        population: action.payload.population || state.population
      };
    case SET_MARKED:
      return {
        ...state,
        isMarked: action.payload
      };

    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case LOGIN_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
      localStorage.setItem('access', payload.access);
      console.log('Login disptach worked prefectly');
      localStorage.setItem('refresh', payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null
      };
    case GOOGLE_AUTH_FAIL:
    case FACEBOOK_AUTH_FAIL:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      console.log('Logout dispatch worked perfetcly');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state
      };
    case SET_ADMIN_STATUS:
      return {
        ...state,
        admin_status: true
      };

    default:
      return state;
  }
}
