import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Pikachu from './../assets/pikachu.png'


function Chat() {
    const auth = useSelector(state=>state.auth)
    const [user,setUser] = useState({})
    const [room,setRoom] = useState('')
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

    return (
        <div>
            {!auth.isAuthenticated && <Redirect to="/" />}
            <h1 style={{fontFamily:"pocket_monkregular",fontSize: "44px"}}>Welcome to Poke Chat</h1>
            <img src ={Pikachu} style={{height: "120px",width: "auto"}} alt="pikachu" />
            
            <h3 style={{fontFamily:"pocket_monkregular",fontSize:"24px"}}>Hello,<span style={{color: "#E84141"}}> {auth.user.name}</span></h3>
            <h2 style={{fontFamily:"pocket_monkregular"}}>Join a room to start chat</h2>

            <div><input className="roomInput" onChange={e=>setRoom(e.target.value)} placeholder='Room name'/></div>
            <Link style={ {fontFamily:"pocket_monkregular",letterSpacing:"2px",backgroundColor:"#E84141",width:"175px",lineHeight:"40px",height:"40px",borderRadius:'8px'}} className="joinRoom" onClick={e=>(!room)?e.preventDefault():null} to={`/public?room=${room}`}>Join Room</Link>
        </div>
    )
}

export default Chat
