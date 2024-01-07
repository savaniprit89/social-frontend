
import { globaTypes } from "../actions/globalTypes";
const initialState = {}
const authReducer=(state = initialState, action) => {
    switch (action.type){
        case globaTypes.AUTH:
            return action.payload;
        default:
            return state;
    }
}
export default authReducer




///




/*




const authReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return {
                user:null,
                loading:true,
                error:null,
            }
        case "LOGIN_SUCCESS":
                return {
                    user:action.payload,
                    loading:false,
                    error:null,
                }
        case "LOGIN_FAIL":
                    return {
                        user:null,
                        loading:false,
                        error:action.payload,
                    }
        case "LOGOUT":
                        return {
                            user:null,
                            loading:false,
                            error:null,
                        }
        default:
            return state;
    }
}
*/