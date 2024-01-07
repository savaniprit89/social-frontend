import { EditData } from "../actions/globalTypes";
import { Post_TYPES } from "../actions/postAction";

const detailPostReducer= (state =[],action)=>{
    switch (action.type){
        case Post_TYPES.GET_POST:
            var  a=[...state,action.payload]
             
 
           var jsonObject = a.map(JSON.stringify);
 
            var uniqueSet = new Set(jsonObject);
             var uniqueArray = Array.from(uniqueSet).map(JSON.parse);
 
        
            return uniqueArray;
        case Post_TYPES.UPDATE_POST:
            return EditData(state,action.payload._id,action.payload)
        default:
            return state;
    }
}

export default detailPostReducer