import {
    REQUEST_SAVE_USER_DATA,
    USER_DATA_WAS_SAVED,
    USER_DATA_WAS_NOT_SAVED,
    REQUEST_CLEAR_USER,
    USER_WAS_CLEARED,
    USER_WAS_NOT_CLEARED,
    TOGGLE_USER_MENU
} from "../actiontypes/profile";

const processData = data =>
    data.options.reduce((arr, man) => {
        const { name } = man;
        const rows = man.versions.map(version => {
            return { ...version, name };
        });
        return arr.concat(rows);
    }, []);

export function requestSaveUserData() {
    return {
        type: REQUEST_SAVE_USER_DATA
    };
}

export function userDataWasSaved(data) {
    return {
        type: USER_DATA_WAS_SAVED,
        data
    };
}

export function userDataWasNotSaved() {
    return {
        type: USER_DATA_WAS_NOT_SAVED
    };
}

export function saveUserData(data, token) {
    return function(dispatch) {
        dispatch(requestSaveUserData());
        // return fetch(`${apiUrl.root}/manifests/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: authHeaderValue
        //     },
        //     body: JSON.stringify(item)
        // })
        Promise.resolve({ json: () => data }) // fakeout to remove when api hooked up
            .then(response => response.json())
            .then(data => dispatch(userDataWasSaved(data)))
            .catch(err => {
                dispatch(userDataWasNotSaved());
                throw err;
            });
    };
}

export function requestClearUser() {
    return {
        type: REQUEST_CLEAR_USER
    };
}

export function userWasCleared() {
    return {
        type: USER_WAS_CLEARED
    };
}

export function userWasNotCleared() {
    return {
        type: USER_WAS_NOT_CLEARED
    };
}

export function clearUser(token) {
    return function(dispatch) {
        dispatch(requestClearUser());
        // return fetch(`${apiUrl.root}/manifests/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: authHeaderValue
        //     },
        //     body: JSON.stringify(item)
        // })
        Promise.resolve({ json: () => 'success' }) // fakeout to remove when api hooked up
            .then(response => response.json())
            .then(data => dispatch(userWasCleared()))
            .catch(err => {
                dispatch(userWasNotCleared());
                throw err;
            });
    };
}

export function toggleUserMenu() {
    return {
        type: TOGGLE_USER_MENU
    };
}
