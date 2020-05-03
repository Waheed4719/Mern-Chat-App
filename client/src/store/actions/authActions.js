import jwtDecode from 'jwt-decode'
import Axios from 'axios'
import * as Types from './types'
import setAuthToken from './../../utils/setAuthToken'
import { message } from 'antd'


export const login = (user,history) => dispatch => {

    Axios.post('/api/auth/login',user)
    .then(user=>{
        console.log(user.data)
        let decode = jwtDecode(user.data.token)
       localStorage.setItem('auth_token',user.data.token)
       
        setAuthToken(user.data.token)
        dispatch({
            type: Types.SET_USER,
            payload: {
                user:decode
            }
        })
        message.success('Successfully Logged in')
        setTimeout(()=>{
            history.push('/Chat')
        },2000)
        
    })
    .catch(error=>{
        if(error){
            console.log(error.response.data)
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })

}

export const register = (user, history) => dispatch => {
    Axios.post('/api/auth/register',user)
    .then(user=>{
        console.log(user)
       
        dispatch({
            type: Types.CREATE_USER,
            payload: {
                createdUser:user
            }
        })
        history.push('/')
    })
    .catch(error=>{
        if(error){
            console.log(error.response.data)
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })
}

export const logout = history => {
    localStorage.removeItem('auth_token')
    setAuthToken()
    message.success('Successfully Logged out')
    history.push('/')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}