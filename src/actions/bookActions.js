import { ADD, DELETE, UPDATE, GETONE, GETALL, GETREVIEWS, GET_CURRENT_ID, ADD_NEW_FORM, FAILURE } from './actionTypes/BookType';
import GeneralFoundation from '../GeneralFoundation';

const generalFoundation = new GeneralFoundation();

export const getBookById = (id) => {
    return (dispatch) => {
        generalFoundation.demoFoundation.getOne('books', id).then(res => {
            res.id = res['@id'].replace('/books/','');
            dispatch(getBook(res))
        })
    }
}

export const updateBookById = (id, payload) => {
    return (dispatch) => {
        generalFoundation.demoFoundation.update('books', id, payload).then(res => {
            dispatch(updateBook(res))
        });
    }
}

export const goToAddForm = (status) => {
    return (dispatch) => {
        dispatch(setUpAsAddForm(status))
    }
}

export const setCurrentId = (id) => {
    return (dispatch) => {
        dispatch(setCurrentBook(id))
    }
}

export const getBooks = (query) => {
    return (dispatch) => {
        generalFoundation.demoFoundation.getList('books', query).then(res => {
            let result = res['hydra:member'].map(book => {
                book.id = book['@id'].replace('/books/','');
                return book;
            })
            dispatch(getAllBooks(result))
        })
    }
}

export function deleteBookById (id) {
    return (dispatch) => {
        generalFoundation.demoFoundation.remove('books', id).then(res => {
            dispatch(deleteBook(res))
        })
    }
}

export function addBook (payload) {
    return (dispatch) => {
        generalFoundation.demoFoundation.create('books', payload).then(res => {
            dispatch(createBook(res))
        })
    }
}

export function getReviewsByBook (id) {
    return (dispatch) => {
        generalFoundation.demoFoundation.remoteGet('books', 'reviews', id).then(res => {
            dispatch(getReviewsFromBook(res))
        })
    }
}

function addTodoFailure (err) {
    return {
        type: FAILURE,
        error: err
    }
}

function setUpAsAddForm (status) {
    return {
        type: ADD_NEW_FORM,
        status
    }
}

function setCurrentBook (id) {
    return {
        type: GET_CURRENT_ID,
        id: id
    }
}

function getBook (data) {
    return {
        type: GETONE,
        current: data
    }
}

function getAllBooks (data) {
    return {
        type: GETALL,
        payload: data
    }
}

function updateBook (data) {
    return {
        type: UPDATE,
        current: data
    }
}

function deleteBook (data) {
    return {
        type: DELETE,
        payload: data
    }
}

function createBook (payload) {
    return {
        type: ADD,
        payload
    }
}

function getReviewsFromBook (payload) {
    return {
        type: GETREVIEWS,
        payload
    }
}