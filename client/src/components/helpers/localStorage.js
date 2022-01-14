//setting up the local storage
export const setLocalStorage = (key, value) => {        //key maps to the token in Server end(userauth.js)
                                                        //value is the object {username....}
    localStorage.setItem(key,JSON.stringify(value));
}

export const getLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));   
}

export const deleteLocalStorage = key => {
    localStorage.removeItem(key);
};