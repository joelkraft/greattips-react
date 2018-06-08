import {
    REQUEST_SAVE_NEW_TIP,
    NEW_TIP_WAS_SAVED,
    NEW_TIP_WAS_NOT_SAVED,
    REQUEST_TIP,
    RECEIVE_TIP,
    REQUEST_TIP_FAILED,
    REQUEST_TIPS,
    RECEIVE_TIPS,
    TIP_WAS_SAVED,
    TIP_WAS_NOT_SAVED,
    REQUEST_SAVE_TIP,
    REQUEST_CREATE_TIP,
    TIP_WAS_CREATED,
    TIP_WAS_NOT_CREATED,
    REQUEST_DELETE_TIP,
    TIP_WAS_DELETED,
    TIP_WAS_NOT_DELETED
} from "../actiontypes/tips";

const defaultState = {
    tips: [
        {
            id: 0,
            text: 'You get better rest if you read in low light before bed.',
            category: 'Health'
        },
        {
            id: 1,
            text: 'Flossing before bed reduces the chance of gingivitis.',
            category: 'Health'
        },
        {
            id: 2,
            text: 'Storm windows help conserve energy in winter.',
            category: 'Household'
        },
        {
            id: 3,
            text: 'Soak your feet in warm water to get a splinter out more easily.',
            category: 'Health'
        },
        {
            id: 4,
            text: 'Always look both ways before crossing the street.',
            category: 'Safety'
        },
    ]
}
export default function tips(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_SAVE_NEW_TIP:
            return {
                ...state,
                isSaving: true
            };
        case NEW_TIP_WAS_SAVED:
            return {
                ...state,
                isSaving: false,
                tips: [...state.tips, action.data]
            };
        case NEW_TIP_WAS_NOT_SAVED:
            return {
                ...state,
                isSaving: false
            };
        case REQUEST_TIP:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_TIP:
            return {
                ...state,
                isFetching: false,
                tips: [...state.tips, action.tip]
            };
        case REQUEST_TIP_FAILED:
            return {
                ...state,
                isFetching: false
            };
        case REQUEST_TIPS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_TIPS:
            return {
                ...state,
                isFetching: false,
                items: action.items
            };
        case REQUEST_SAVE_TIP:
            return {
                ...state,
                isSaving: true
            };
        case TIP_WAS_SAVED:
            return {
                ...state,
                isSaving: false
            };
        case TIP_WAS_NOT_SAVED:
            return {
                ...state,
                isSaving: false
            };
        case REQUEST_CREATE_TIP:
            return {
                ...state,
                isCreating: true
            };
        case TIP_WAS_CREATED:
            return {
                ...state,
                isCreating: false,
                items: [...state.items, action.item]
            };
        case TIP_WAS_NOT_CREATED:
            return {
                ...state,
                isCreating: false
            };
        case REQUEST_DELETE_TIP:
            return {
                ...state,
                isDeleting: true
            };
        case TIP_WAS_DELETED:
            return {
                ...state,
                isDeleting: false,
                items: state.items.filter(item =>
                    !item.tip.endsWith(action.id)
                )
            };
        case TIP_WAS_NOT_DELETED:
            return {
                ...state,
                isDeleting: false
            };
        default:
            return state;
    }
}
