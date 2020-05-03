import React, {useState,useEffect} from 'react'
import './styles/Login.css'
import {register} from './../store/actions/authActions'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect, useHistory, Link } from 'react-router-dom'
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Pokeball from './../assets/pokemon.svg'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth)

useEffect(()=>{

    var nameInput = document.querySelector('input')
    var emailInput = document.querySelectorAll('input')[1]
    var passInput = document.querySelectorAll('input')[2]
if(nameInput){
    nameInput.addEventListener('keyup',()=>{
        if(nameInput.value === ''){
            nameInput.style.border = "1px solid red"
            nameInput.parentElement.parentElement.querySelector('p').innerHTML = " username cannot be empty"
            nameInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
        }
        else{
            nameInput.style.border = ""
            nameInput.parentElement.parentElement.querySelector('p').innerHTML = ""
            nameInput.parentElement.parentElement.querySelector('p').style.visibility = "hidden"
        }
        
    })


    emailInput.addEventListener('keyup',()=>{
        if(nameInput.value === ''){
            emailInput.style.border = "1px solid red"
            emailInput.parentElement.parentElement.querySelector('p').innerHTML = " email cannot be empty"
            emailInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
        }
        else{
            emailInput.style.border = ""
            emailInput.parentElement.parentElement.querySelector('p').innerHTML = ""
            emailInput.parentElement.parentElement.querySelector('p').style.visibility = "hidden"
        }
        
    })
    
    
    passInput.addEventListener('keyup',()=>{
        if(passInput.value === ''){
            passInput.style.border = "1px solid red"
            passInput.parentElement.parentElement.querySelector('p').innerHTML = " password cannot be empty"
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
    var nameInput = document.querySelector('input')
    var emailInput = document.querySelectorAll('input')[1]
    var passInput = document.querySelectorAll('input')[2]
        if(auth.errors.message){
            if(auth.errors.message.name){
                console.log(auth.errors.message.name)
                nameInput.parentElement.parentElement.querySelector('p').innerHTML = auth.errors.message.name
                nameInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
            }
            if(auth.errors.message.email){
                console.log(auth.errors.message.email)
                emailInput.parentElement.parentElement.querySelector('p').innerHTML = auth.errors.message.email
                emailInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
            }
            if(auth.errors.message.password){
                passInput.parentElement.parentElement.querySelector('p').innerHTML = auth.errors.message.password
                passInput.parentElement.parentElement.querySelector('p').style.visibility = "visible"
            }
        }
    
}, [auth.errors])




function submitForm(e){
    e.preventDefault()
    const pass = password
    
    const form = {name,email,pass}
    console.log(form)

    dispatch(register(form, history))
}

    return (
        
                <div className="login">
                    {auth && auth.isAuthenticated?<Redirect to='/Chat' />:null}
                    <h1 style={{fontFamily:"pocket_monkregular",fontSize: "38px"}}>Welcome to Poke Chat</h1>
            <img src ={Pokeball} style={{height: "100px",width: "auto",}} alt="pikachu" />
           <form >
           <h1 style={{fontFamily:"pocket_monkregular",fontSize: "34px"}}>Sign Up</h1>
                <div>
                    <div>
                    <label htmlFor="name">Name:</label>
                   <input type="text"  name="name"  onChange={(event)=>setName(event.target.value)}/>
                    </div>
                  
                   <p className="email-error"></p>
               </div>
           
               <div>
                   <div>
                   <label htmlFor="email">Email:</label>
                   <input type="text"  name="email"  onChange={(event)=>setEmail(event.target.value)}/>
                   </div>
                
                   <p className="email-error"></p>
               </div>
               
               <div>
                   <div>
                   <label htmlFor="password">Password:</label>
                   <input type="password"  name="password" onChange={(event)=>setPassword(event.target.value)}/>
                   </div>
                  
                   <p className="password-error"></p>
               </div>
               <small><Link to="/">Already have an account?</Link></small>
               <button style={{boxShadow: "0px 2px 6px #757B84",fontFamily:"pocket_monkregular",letterSpacing:"2px",fontSize:"18px",backgroundColor:"#E84141",width:"175px",lineHeight:"40px",height:"40px",borderRadius:'8px'}} href="#" className="signin-button" onClick={(e)=>submitForm(e)} >Sign in</button>
               
           </form>
          
       </div>
       
    )
}

export default Register
