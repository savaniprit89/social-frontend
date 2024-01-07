
import { globaTypes } from "../actions/globalTypes";
const peerReducer=(state = null, action) => {
    switch (action.type){
        case globaTypes.PEER:
            return action.payload;
        default:
            return state;
    }
}
export default peerReducer