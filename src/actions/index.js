import booksApi from '../api'
import { FETCH_BOOKS, CREATE_BOOK, EDIT_BOOK } from './type'

export const fetchBooks = () => async dispatch => {
  const response = await booksApi.get('/books')

  dispatch({ type: FETCH_BOOKS, payload: response.data['hydra:member'] })
}

export const createBook = formValues => async dispatch => {
  const response = await booksApi.post('/books', formValues)

  dispatch({ type: CREATE_BOOK, payload: response })
}

export const editBook = (id, formValues) => async dispatch => {
  const response = await booksApi.put(id, formValues)

  dispatch({ type: EDIT_BOOK, payload: response.data })
}
