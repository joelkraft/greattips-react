import {
    REQUEST_SAVE_NEW_RATING,
    NEW_RATING_WAS_SAVED,
    NEW_RATING_WAS_NOT_SAVED,
    REQUEST_RATINGS,
    RECEIVE_RATINGS,
    REQUEST_RATINGS_FAILED
} from "../actiontypes/ratings";

export function requestSaveNewRating() {
    return {
        type: REQUEST_SAVE_NEW_RATING
    };
}

export function newRatingWasSaved(data) {
    return {
        type: NEW_RATING_WAS_SAVED,
        data
    };
}

export function newRatingWasNotSaved() {
    return {
        type: NEW_RATING_WAS_NOT_SAVED
    };
}

export function saveNewRating(data, token) {

    return function(dispatch) {
        dispatch(requestSaveNewRating());
        // return fetch(`${apiUrl.root}/manifests/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: authHeaderValue
        //     },
        //     body: JSON.stringify(item)
        // })
        return Promise.resolve({json: () => data}) // fakeout to remove when api hooked up
            .then(response => response.json())
            .then(data => dispatch(newRatingWasSaved(data)))
            .catch(err => {
                dispatch(newRatingWasNotSaved());
                throw err;
            });
    };
}

export function requestRatings() {
    return {
        type: REQUEST_RATINGS
    };
}

export function receiveRatings(ratings) {
    return {
        type: RECEIVE_RATINGS,
        ratings
    };
}

export function requestRatingsFailed() {
    return {
        type: REQUEST_RATINGS_FAILED
    };
}

export function getRatings(id, token) {

    return function(dispatch) {
        dispatch(requestRatings());
        // return fetch(`${apiUrl.root}/manifests/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: authHeaderValue
        //     },
        //     body: JSON.stringify(item)
        // })
        return Promise.resolve({json: () => ({text:`Default ratings ${id}`, category: 'Default'})}) // fakeout to remove when api hooked up
            .then(response => response.json())
            .then(data => dispatch(receiveRatings(data)))
            .catch(err => {
                dispatch(requestRatingsFailed());
                throw err;
            });
    };
}