import {CLEAR_MESSAGE} from '../constants/messageConstants'

export const clearMessages = () => 
                    dispatch=>{
                        dispatch({ 
                            type: CLEAR_MESSAGE,
                            //payload: Not required in this case
                        })
                    }