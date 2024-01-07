import { globaTypes } from "../actions/globalTypes";



const socketReducer = (state = [], action) => {
    switch (action.type){
        case globaTypes.SOCKET:
            return action.payload;
        default:
            return state;
    }
}


export default socketReducer