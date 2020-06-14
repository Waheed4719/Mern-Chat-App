import React, {useState,useEffect} from 'react'
import './styles/login.css'
import './styles/neomorphism.css'
import {Link, useHistory, Redirect} from 'react-router-dom'
import {login} from './../store/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'



import google from './../assets/google-icon.svg'
import linkedIn from './../assets/linkedin-icon.svg'
import facebook from './../assets/facebook-icon.svg'
import icon from './../assets/icon-2.svg'
import * as animationData from './chat.json'
import Lottie from 'react-lottie'


function Login() {

const dispatch = useDispatch()  
const auth = useSelector(state => state.auth)
const history = useHistory();
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isStopped, setIsStopped] = useState(false)
const [isPaused,setIsPaused] = useState(false)





function submitForm(e){
    e.preventDefault()
    
    const pass = password
    const form = {email,pass}
    console.log(email,pass)
    dispatch(login(form,history))

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



return(
    <div className="container" >
{auth && auth.isAuthenticated? <Redirect to="/Chat" /> :null}
    <div className="mainCont log" >

        <div className="login outward" style={{flexDirection:'column'}}>
            <div className="title">
                <h1>Login</h1>
            </div>

            <div className="loginForm">
                    <div className="inputBox  inward">
                        <input placeholder="Email Address"  onChange={(event)=>setEmail(event.target.value)} />
                    </div>
                    
                    <div className="inputBox  inward">
                        <input placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
                    </div>
                    <div className="forgot">
                        <a href="#">Forgot your password?</a>
                    </div>
                    <div className="inputBox  outward loginBtn" onClick={(e)=>submitForm(e)}>
                        <a>Submit</a>
                    </div>
                    <a>Or sign in using</a>

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
                    <Link to="/register">Don't have an account? <span>Sign up!</span></Link>
            </div>
        </div>

        <div class="hero">

            <h1>Chat App</h1>
            <h3>Built using Mongo, Express, React, Node.JS and Socket.io</h3>

                    <Lottie options={defaultOptions}
                    height={400}
                    width={400}
                    isStopped={isStopped}
                    isPaused={isPaused}/>
                    
                </div>
            </div>
 

        </div>



    )

}

export default Login
