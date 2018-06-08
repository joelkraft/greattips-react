import {
    REQUEST_SAVE_NEW_RATING,
    NEW_RATING_WAS_SAVED,
    NEW_RATING_WAS_NOT_SAVED,
    REQUEST_RATINGS,
    RECEIVE_RATINGS,
    REQUEST_RATINGS_FAILED,
    REQUEST_DELETE_RATING,
    RATING_WAS_DELETED,
    RATING_WAS_NOT_DELETED
} from "../actiontypes/ratings";

const defaultState = {
    data: [
        {
            id: 0,
            tipId: 0,
            value: 5,
            text: `I've been following this advice for several weeks now and I feel much better rested. It's easier said than done, though.`
        },
        {
            id: 1,
            tipId: 0,
            value: 1,
            text: `Who has time for this? Probably good advice, but I have too much to do.`
        },
        {
            id: 2,
            tipId: 4,
            value: 5,
            text: `Classic! Love this one.`
        },
        {
            id: 3,
            tipId: 3,
            value: 4,
            text: `Haven't tried this yet but it seems good.`
        }
    ]
}
export default function tips(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_SAVE_NEW_RATING:
            return {
                ...state,
                isSaving: true
            };
        case NEW_RATING_WAS_SAVED:
            return {
                ...state,
                isSaving: false,
                data: [...state.data, action.data]
            };
        case NEW_RATING_WAS_NOT_SAVED:
            return {
                ...state,
                isSaving: false
            };
        case REQUEST_RATINGS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_RATINGS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            };
        case REQUEST_RATINGS_FAILED:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}
