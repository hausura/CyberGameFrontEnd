import { FETCH_USER_LOGIN_ERROR, FETCH_USER_LOGIN_SUCESS,FETCH_USER_LOGIN, USER_LOGOUT, USER_REFRESH} from "../actions/userAction";


const INITIAL_STATE = {
    account:{
        userName: '',
        auth: null,
        token: ''
    },
    isLoading:false,
    isError:false
};
const userReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case FETCH_USER_LOGIN:
            return{
                isLoading:true,
                isError:false
            };
        case FETCH_USER_LOGIN_SUCESS:
            return{
                ...state,
                account: {
                    userName:action.data.userName,
                    token:action.data.token,
                    auth:true
                },
                isLoading:false,
                isError:false
            };
        case FETCH_USER_LOGIN_ERROR:
            return{
                ...state,
                account: {
                    userName: '',
                    auth: false,
                    token: ''           
                }, 
                isLoading:false,
                isError:true
            };
        case USER_LOGOUT:
            return{
                ...state,
                account: {
                    userName: '',
                    auth: false,
                    token: ''           
                }, 
            }
        case USER_REFRESH:
            return{
                ...state,
                account: {
                    userName: localStorage.getItem('userName'),
                    auth: true,
                    token: localStorage.getItem('token')           
                }, 
            }
        default: return state
    }
}

export default userReducer