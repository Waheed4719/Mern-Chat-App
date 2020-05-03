import React, {useState,useEffect} from 'react'
import './styles/Login.css'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Link, useHistory, Redirect} from 'react-router-dom'
import {login} from './../store/actions/authActions'
import {useDispatch, useSelector} from 'react-redux'
import Pokeball from './../assets/pokemon.svg'

function Login() {

const dispatch = useDispatch()  
const auth = useSelector(state => state.auth)
const history = useHistory();
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')


useEffect(()=>{

    var nameInput = document.querySelector('.userInput')
    var passInput = document.querySelector('.password')
    if(nameInput){
        nameInput.addEventListener('keyup',()=>{
        
            if(nameInput.value === ''){
                nameInput.style.border = "1px solid red"
                nameInput.parentElement.parentElement.querySelector('p').innerHTML = " email field cannot be empty"
                nameInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
            }
            else{
                nameInput.style.border = ""
                nameInput.parentElement.parentElement.querySelector('p').innerHTML = ""
                nameInput.parentElement.parentElement.querySelector('p').style.visibility = "hidden"
            }
            
        })
    }
    if(passInput){
        passInput.addEventListener('keyup',()=>{
            if(passInput.value === ''){
                passInput.style.border = "1px solid red"
                passInput.parentElement.parentElement.querySelector('p').innerHTML = " password field cannot be empty"
                passInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
            }
            else{
                passInput.style.border = ""
                passInput.parentElement.parentElement.querySelector('p').innerHTML = ""
                passInput.parentElement.parentElement.querySelector('p').style.visibility = "hidden"
            }
            
        })
    }
    


},[])

useEffect(() => {
    var nameInput = document.querySelector('.userInput')
    var passInput = document.querySelector('.password')
        if(auth.errors){
            if(auth.errors.email){
                console.log(auth.errors.email)
                nameInput.parentElement.parentElement.querySelector('p').innerHTML = auth.errors.email
                nameInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
            }
            if(auth.errors.pass){
                passInput.parentElement.parentElement.querySelector('p').innerHTML = auth.errors.pass
                passInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
            }
        }
    
}, [auth.errors])



function submitForm(e){
    e.preventDefault()
    const email = username;
    const pass = password
    const form = {email,pass}
    
    dispatch(login(form,history))

}
    const divStyle = {display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}

    return (
        <div className="login">
           {auth && auth.isAuthenticated? <Redirect to="/Chat" /> :null}
            <h1 style={{fontFamily:"pocket_monkregular",fontSize: "64px"}}>PokeChat</h1>
            
            <img src ={Pokeball} style={{height: "150px",width: "auto"}} alt="pikachu" />
            
            <form >
            <h1 style={{fontFamily:"pocket_monkregular",fontSize: "44px"}}>Sign in</h1>
            
                <div>
                    <div style={divStyle}>
                    
                    <input type="text" className="userInput" placeholder="Email address"   name="username"  onChange={(event)=>setUsername(event.target.value)}/>
                    </div>
                    
                    <p className="username-error">hello</p>
                </div>
                
                <div>
                    <div style={divStyle}>
                    
                    <input type="password" className="password" placeholder="Password"  name="password" onChange={(event)=>setPassword(event.target.value)}/>
                    </div>
                   
                    <p className="password-error">hello</p>
                </div>
                <small><Link style={{fontFamily:"pocket_monkregular",fontSize: "17px"}} to="/register">Don't have an account?</Link></small>
                <button style={{boxShadow: "0px 2px 6px #757B84",fontFamily:"pocket_monkregular",letterSpacing:"2px",fontSize:"18px",backgroundColor:"#E84141",width:"175px",lineHeight:"40px",height:"40px",borderRadius:'8px'}} href="#" className="signin-button" onClick={(e)=>submitForm(e)} >Sign in</button>
                
            </form>

        </div>
    )
}

export default Login
