// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import user from './user';
import alert from './alert';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, user, alert });

export default reducers;
