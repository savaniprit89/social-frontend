import { EditData } from "../actions/globalTypes";
import { PROFILE_TYPES } from "../actions/profileAction";

const initialState = {
    ids: [],
    loading: false,
    users: [],
    userposts: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case PROFILE_TYPES.GET_USER:
            console.log(action.payload)
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case PROFILE_TYPES.FOLLOW:
            console.log(action.payload)
            return {
                ...state,
                // users: state.users.map(user => (user._id === action.payload._id ? action.payload : user))
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case PROFILE_TYPES.UNFOLLOW:
            console.log(action.payload)
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case PROFILE_TYPES.GET_ID:
            console.log(action.payload)
            return {
                ...state,
                ids: [...state.ids, action.payload]
            };
        case PROFILE_TYPES.GET_POSTS:
            console.log(action.payload)
            return {
                ...state,
                userposts: [...state.userposts, action.payload]
            };
        case PROFILE_TYPES.UPDATE_POST:
            console.log(action.payload)
            return {
                ...state,
                userposts: EditData(state.userposts,action.payload._id,action.payload)
            };
        default:
            return state;
    }
}

export default profileReducer;

