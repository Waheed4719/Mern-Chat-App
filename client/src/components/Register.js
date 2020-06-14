import React, {useState,useEffect} from 'react'
import './styles/login.css'
import {register} from './../store/actions/authActions'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect, useHistory, Link } from 'react-router-dom'
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import google from './../assets/google-icon.svg'
import linkedIn from './../assets/linkedin-icon.svg'
import facebook from './../assets/facebook-icon.svg'
import icon from './../assets/icon-2.svg'
import * as animationData from './../assets/chat2.json'
import Lottie from 'react-lottie'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth)
    const [isStopped, setIsStopped] = useState(false)
    const [isPaused,setIsPaused] = useState(false)




function submitForm(e){
    e.preventDefault()
    const pass = password
    
    const form = {name,email,pass}
    console.log(form)

    dispatch(register(form, history))
}



    const buttonStyle = {
        display: 'block',
        margin: '10px auto'
      };
   
      const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        
        <div className="container" >
        {auth && auth.isAuthenticated? <Redirect to="/Chat" /> :null}
            <div className="mainCont reg" >
       

            <div class="hero">
        
        <h1>Chat App</h1>
        <h3>Built using Mongo, Express, React, Node.JS and Socket.io</h3>

            <Lottie options={defaultOptions}
            height={400}
            width={400}
            isStopped={isStopped}
            isPaused={isPaused}/>
            
        </div>
        

                <div className="login outward" style={{flexDirection:'column'}}>
                    <div className="title">
                        <h1>Register</h1>
                    </div>
        
                    <div className="loginForm">

                            <div className="inputBox  inward">
                                <input placeholder="Name" onChange={(event)=>setName(event.target.value)} />
                            </div>
                            <div className="inputBox  inward">
                                <input placeholder="Email Address"  onChange={(event)=>setEmail(event.target.value)} />
                            </div>
                            
                            <div className="inputBox  inward">
                                <input placeholder="Password" onChange={(event)=>setPassword(event.target.value)} />
                            </div>
                          
                            <div className="inputBox  outward loginBtn" onClick={(e)=>submitForm(e)}>
                                <a>Submit</a>
                            </div>
                            <a>Or sign up using</a>
        
                            <div className="brands">
                                <div className="google outward">
                                    <img src={google} />
                                </div>
                                <div className="facebook outward">
                                    <img src={facebook} />
                                </div>
                                <div className="linkedIn outward">
                                    <img src={linkedIn} />
                                </div>
                                <div className="Icon outward">
                                    <img src={icon} />
                                </div>
                            </div>
                            <Link to="/">Already have an account? <span>Sign in!</span></Link>
                    </div>
                </div>

           
             
                    </div>
         
        
                </div>
        
       
    )
}

export default Register
