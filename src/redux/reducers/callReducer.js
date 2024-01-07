import { globaTypes } from "../actions/globalTypes";
const callReducer=(state = null, action) => {
    switch (action.type){
        case globaTypes.CALL:
            return action.payload;
        default:
            return state;
    }
}
export default callReducer