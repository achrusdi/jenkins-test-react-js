import { combineReducers } from 'redux';
import counterReducer from '../slices/counterSlice';
// import todoReducer from '../slices/todoSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  // todo: todoReducer
});

export default rootReducer;
