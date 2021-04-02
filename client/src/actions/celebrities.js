import * as api from '../api/index.js';


// Action creators

export const getCelebrities = ()=> async (dispatch) => {
  
    try {
        const { data } = await api.getCelebrities();

        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message);        
    }

}