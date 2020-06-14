import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Redirect, Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import io from 'socket.io-client'
import {logout} from './../store/actions/authActions'
import {socket} from './sub-components/Socket'



// let socket;
// var Url = window.location.protocol + '//' + window.location.host + '/'

function Chat() {
    const auth = useSelector(state=>state.auth)
    const [user,setUser] = useState({})
    const [room,setRoom] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(auth && auth.isAuthenticated){
            setUser(auth.user)
        }
    }, [])

    useEffect(()=>{
        var input = document.getElementsByClassName("roomInput")[0];
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    const joinRoom = document.querySelector(".joinRoom")
    if(joinRoom){

        joinRoom.click();
    }
  }
});
    })


    function logOutEmit(e){
        e.preventDefault()
        socket.emit('logout',socket.id)
        dispatch(logout(history))
    }



    return (
        <div className="container" >
        {auth && !auth.isAuthenticated? <Redirect to="/" /> :null}
            <div className="mainCont chat" >
        
                <div className="login outward" style={{flexDirection:'column'}}>
                    <div className="title" >
                        <h1 style={{fontSize: '18px'}}>Welcome, {auth.user.name}</h1>
                    </div>
                    <h2 >Join a room to start chat</h2>
        
                    <div className="loginForm">
                            <div className="inputBox  inward">
                                <input className="roomInput" placeholder="Room Name" onChange={(event)=>setRoom(event.target.value)}/>
                            </div>
                           
                            <div className="inputBox outward loginBtn " >
                                <Link className="joinRoom" style={{width: '100%'}} to={room? `/public?room=${room}`:''}>Join Room</Link>
                            </div>
                        
                    </div>
                </div>


                         <div className="inputBox  outward logoutBtn" onClick={logOutEmit} >
                                <Link to="#">Logout</Link>
                            </div>
        
              
                    </div>
         
        
                </div>
    )
}

export default Chat
