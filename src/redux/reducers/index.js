import { combineReducers } from 'redux';
import repositories from './home/repositories';
export default combineReducers({
  home: repositories
});
