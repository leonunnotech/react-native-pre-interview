import { ADD, DELETE, UPDATE, GETONE, GETALL } from './actionTypes/ReviewType';

export function getReview (id) {
    return {
        type: GETONE,
        id
    }
}

export function getAllReviews () {
    return {
        type: GETALL
    }
}

export function updateReview (id, payload) {
    return {
        type: UPDATE,
        id,
        payload
    }
}

export function deleteReview (id) {
    return {
        type: DELETE,
        id
    }
}

export function createReview (payload) {
    return {
        type: ADD,
        payload
    }
}