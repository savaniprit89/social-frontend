import { DeleteData, EditData, globaTypes } from "../actions/globalTypes";
import { Post_TYPES } from "../actions/postAction";
const initialState = {
    loading: false,
    posts: [],
    result: 0,
    page: 2
}
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case Post_TYPES.CREATE_POST:
            return {
                ...state, posts: [action.payload, ...state.posts]
            };
        case Post_TYPES.LOADING_POST:
            return {
                ...state, loading: action.payload
            };
        case Post_TYPES.GET_POSTS:
            return {
                ...state, posts: action.payload.posts, result: action.payload.result, page: action.payload.page
            };
        case Post_TYPES.UPDATE_POST:
            console.log(state.posts, action.payload._id, action.payload)
            return {
                ...state, posts: EditData(state.posts, action.payload._id, action.payload)
            };
        case Post_TYPES.DELETE_POST:
           
            return {
                ...state, posts: DeleteData(state.posts,action.payload._id)
            };
        default:

            return state;
    }
}
export default postReducer