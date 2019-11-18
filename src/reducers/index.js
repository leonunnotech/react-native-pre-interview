import { combineReducers } from 'redux'
import BookReducer from './BookReducer';
import ReviewReducer from './ReviewReducer';


export default Reducers = combineReducers({
    Book: BookReducer,
    Review: ReviewReducer
})