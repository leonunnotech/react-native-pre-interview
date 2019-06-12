import { FETCH_BOOKS, CREATE_BOOK, EDIT_BOOK } from '../actions/type'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return action.payload
    case CREATE_BOOK:
      return [...state, action.payload]
    case EDIT_BOOK:
      return state.map(book =>
        action.payload['@id'] === book['@id'] ? action.payload : book
      )
    default:
      return state
  }
}
