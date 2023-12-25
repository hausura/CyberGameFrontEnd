import { toast } from 'react-toastify';
import { loginApi } from '../../components/services/UserService';


export const FETCH_USER_LOGIN='FETCH_USER_LOGIN';
export const FETCH_USER_LOGIN_ERROR='FETCH_USER_LOGIN_ERROR';
export const FETCH_USER_LOGIN_SUCESS='FETCH_USER_LOGIN_SUCESS';
export const USER_REFRESH='USER_REFRESH';


export const USER_LOGOUT='USER_LOGOUT';

export const handleLoginRedux = (userName,password) =>{
    return async(dispatch,getState) => {
        dispatch({type:FETCH_USER_LOGIN});

        let res = await loginApi(userName,password);
        if (res && res.token){
            toast.success("Log in");

            localStorage.setItem('token',res.token)
            localStorage.setItem('userName',userName.trim())
            dispatch({
                type:FETCH_USER_LOGIN_SUCESS,
                data: {userName:userName,token:res.token}
            })
        }
        else{
            if(res && res.status ===400){
                toast.error(res.data.error);
            }
            dispatch({
                type:FETCH_USER_LOGIN_ERROR
            })
        }
    }
}
export const handleLogoutRedux = (userName,password) =>{
    return async(dispatch,getState) => {
        toast.success("Log out");
        dispatch({type:USER_LOGOUT});
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
    }
}


export const handleRefresh = (userName,password) =>{
    return async(dispatch,getState) => {
        dispatch({type:USER_REFRESH});
    }
}