import { DISCOVER_TYPES } from "../actions/discoverAction";

const intialstate = {
    loading: false,
    posts: [],
    result: 9,
    page: 2,
    firstLoad: false
}

const discoverReducer = (state = intialstate, action) => {
    switch (action.type) {
        case DISCOVER_TYPES.LOADING:
            return {
                ...state, loading: action.payload
            }
        case DISCOVER_TYPES.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                firstLoad: true
            }
        case DISCOVER_TYPES.UPDATE_POST:
            return {
             
                ...state,
                posts: action.payload.posts,
                result: action.payload.result,
                page: state.page + 1
            }
        default:
            return state;
    }
}

export default discoverReducer;