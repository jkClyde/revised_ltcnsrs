// third-party
import { combineReducers } from 'redux';

// project imports
import menu from './menu';
import auth from './auth';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu: menu,
  auth: auth
});

export default reducers;
