import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {useHistory, Redirect} from 'react-router-dom'
import {login} from '../store/actions/authActions'
import './styles/home.css'


function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector(state=>state.auth)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    

    const submitForm = (e) =>{
        e.preventDefault()
        if((email && pass)){

            console.log(email,pass)
            const data = {email,pass}
            dispatch(login(data,history))
          
        }
    }

 
    return (
        <div className="home">
            {auth.isAuthenticated && <Redirect to="/Chat" />}
            
            <h3>Sign in to Join</h3>
            <form onSubmit={(e)=>submitForm(e)}>
                <div className="inputLayout2">
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address"/>
                </div>
                <div className="inputLayout2">
                    <input value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="Password"/>
                </div>
                <button type="submit" className="btn-filled">Sign in</button>  
            </form>

        </div>
    )
}

export default Login
