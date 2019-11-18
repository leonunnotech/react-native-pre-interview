import { ADD, DELETE, UPDATE, GETONE, GETALL, GETREVIEWS, GET_CURRENT_ID, ADD_NEW_FORM } from '../actions/actionTypes/BookType'
    
const initState = {
    id: '',
    status: undefined,
    current: {},
    payload: []
}

const bookReducer = (state=initState, action) => {
    switch (action.type) {
        case(ADD):
            return {
                status: undefined
            };

        case(DELETE):
            return {
                id: action.id
            };

        case(ADD_NEW_FORM):
            return {
                status: action.status
            };

        case(UPDATE):
            return {
                current: action.current
            };

        case(GETONE):
            return {
                current: action.current
            };

        case(GETALL):
            return {
                payload: action.payload
            };

        case(GETREVIEWS):
            return {
                payload: action.payload
            };

        case(GET_CURRENT_ID):
            return {
                id: action.id
            };

        default:
            return state;
    }
}


export default bookReducer;