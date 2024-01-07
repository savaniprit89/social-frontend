
import { globaTypes } from "../actions/globalTypes";
const statusReducer=(state = false, action) => {
    switch (action.type){
        case globaTypes.STATUS:
            return action.payload;
        default:
            return state;
    }
}
export default statusReducer