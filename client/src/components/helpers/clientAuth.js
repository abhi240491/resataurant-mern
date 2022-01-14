import {setCookie,getCookie, deleteCookie} from './cookies'
import {setLocalStorage, getLocalStorage, deleteLocalStorage} from './localStorage';
export const setAuthentication = (token,user) => {
    console.log("Inside setAuthentication adding cookies...")
    setCookie('token',token);
    setLocalStorage('user',user);
}

export const isAuthenticated = () => {
    if(getCookie('token') && getLocalStorage('user')) {
        return getLocalStorage('user')
    } else {
        return false;
    }
}

export const logout = cb  => {
    deleteCookie('token')
    deleteLocalStorage('user')

    cb();
}