import ReviewType from '../actions/actionTypes/ReviewType'
    
const initState = {
    payload: {}
}

const reviewReducer = (state=initState, action) => {
    switch (action.type) {
        case(ReviewType.ADD):
            return {
                payload: action.payload
            };

        case(ReviewType.DELETE):
            return {
                id: action.id
            };

        case(ReviewType.UPDATE):
            return {
                payload: action.payload
            };

        case(ReviewType.GETONE):
            return {
                payload: action.payload
            };
            
        case(ReviewType.GETALL):
            return {
                payload: action.payload
            }

        default:
            return state;
    }
}


export default reviewReducer;