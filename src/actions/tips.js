import {
    REQUEST_SAVE_NEW_TIP,
    NEW_TIP_WAS_SAVED,
    NEW_TIP_WAS_NOT_SAVED,
    REQUEST_TIP,
    RECEIVE_TIP,
    REQUEST_TIP_FAILED,
    REQUEST_UPDATE_TIP,
    TIP_WAS_UPDATED,
    TIP_WAS_NOT_UPDATED
} from "../actiontypes/tips";

export function requestSaveNewTip() {
    return {
        type: REQUEST_SAVE_NEW_TIP
    };
}

export function newTipWasSaved(data) {
    return {
        type: NEW_TIP_WAS_SAVED,
        data
    };
}

export function newTipWasNotSaved() {
    return {
        type: NEW_TIP_WAS_NOT_SAVED
    };
}

export function saveNewTip(data, token) {

    return function(dispatch) {
        dispatch(requestSaveNewTip());
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
            .then(data => dispatch(newTipWasSaved(data)))
            .catch(err => {
                dispatch(newTipWasNotSaved());
                throw err;
            });
    };
}

export function requestTip() {
    return {
        type: REQUEST_TIP
    };
}

export function receiveTip(tip) {
    return {
        type: RECEIVE_TIP,
        tip
    };
}

export function requestTipFailed() {
    return {
        type: REQUEST_TIP_FAILED
    };
}

export function getTip(id, token) {

    return function(dispatch) {
        dispatch(requestTip());
        // return fetch(`${apiUrl.root}/manifests/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: authHeaderValue
        //     },
        //     body: JSON.stringify(item)
        // })
        return Promise.resolve({json: () => ({text:`Default Tip ${id}`, category: 'Default'})}) // fakeout to remove when api hooked up
            .then(response => response.json())
            .then(data => dispatch(receiveTip(data)))
            .catch(err => {
                dispatch(requestTipFailed());
                throw err;
            });
    };
}

export function requestUpdateTip() {
    return {
        type: REQUEST_UPDATE_TIP
    };
}

export function tipWasUpdated(tip) {
    return {
        type: TIP_WAS_UPDATED,
        tip
    };
}

export function tipWasNotUpdated() {
    return {
        type: TIP_WAS_NOT_UPDATED
    };
}

export function updateTip(tipData, token) {

    return function(dispatch) {
        dispatch(requestUpdateTip());
        // return fetch(`${apiUrl.root}/manifests/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: authHeaderValue
        //     },
        //     body: JSON.stringify(item)
        // })
        return Promise.resolve({json: () => tipData}) // fakeout to remove when api hooked up
            .then(response => response.json())
            .then(data => dispatch(tipWasUpdated(data)))
            .then(result => result.tip)
            .catch(err => {
                dispatch(tipWasNotUpdated());
                throw err;
            });
    };
}