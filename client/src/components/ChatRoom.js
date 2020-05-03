import React,{useEffect,useState,useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import queryString from 'query-string'
import ChatInput from './Input'
import Messages from './sub-components/Messages'
import OnlineUsers from './sub-components/OnlineUsers'
import io from 'socket.io-client'
import './chatbox.css'
import man from './../assets/2.svg'
import video from './../assets/video.svg'
import camera from './../assets/camera.svg'
import clip from './../assets/icon.svg'
import smileys from './../assets/smileys.svg'
import PopInfo from './sub-components/PopInfo'
import {logout} from './../store/actions/authActions'
import { Redirect,Link, useHistory } from 'react-router-dom'

let socket;
var Url = window.location.protocol + '//' + window.location.host + '/'

function ChatRoom({location}) {
    
    const auth = useSelector(state=>state.auth)
    const [room,setRoom] = useState('')
    const [user,setUser] = useState({})
    const [onlineUsers,setOnlineUsers] = useState([])
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState('')
    const [adminMsg, setAdminMsg] = useState({})
    const messagesEndRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        setUser(auth.user)
        const data = queryString.parse(location.search)
        setRoom(data.room)
        const user = auth.user
        const room = data.room      
        socket = io(Url)
        socket.emit('join',{user, room} )

        return()=>{
            socket.emit('disconnect');
            socket.off()
        }
     
    }, [Url,location.search])

    useEffect(()=>{
        socket.on('message',data=>{
        setMessages(messages=>[...messages,data])
        scrollToBottom()
        if(data.user==="admin"){
            setAdminMsg(data)
        }
    })
    },[])

    useEffect(()=>{
        socket.emit('getUsers')
        socket.on('usersOnline',data=>{
            setOnlineUsers(data)
        })
    },[adminMsg])

 
    function logOut(e){
        e.preventDefault()
        socket.emit('logout')
        dispatch(logout(history))
    }

   const inputHandler = e =>{
       e.preventDefault()
       setMessage(e.target.value)
   }

   const submitHandler = e =>{
        if(message){
            const user = auth.user
            user.room = room
            const object = {user: auth.user.name, text: message}
        
            socket.emit('sendmessage',{user,message})
            setMessage('')
        }

   }

   const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

   var msg = []
   if(messages){
    msg = messages.map((msgs,index)=>(msgs.user===auth.user.name)?
    <Messages key={index} message={msgs.text} className="rightAlign" image={man}/>: 
    (msgs.user === 'admin')?
    <Messages key={index} message={msgs.text} className="centerAlign" />
    : <Messages key={index} message={msgs.text} className="leftAlign" image={man} />
    )
   }

   var ou
   if(onlineUsers){
    ou = <OnlineUsers onUsers={onlineUsers} />  
   }


    return (
        <div className="">
            {auth && auth.isAuthenticated?null:<Redirect to="/"/>}
            <h1  style={{fontFamily:"pocket_monkregular",fontSize: "44px",color: "dodgerblue"}}>Room Chat</h1>
        <div className="chatroom">
            <div className="Online">
            <OnlineUsers onUsers={onlineUsers} />
            </div>
            <div className="Chatbox">
                <div className="header">
                    <p>Public Room: {room}</p>
                    <div className="onlineStatus">
                    <p>Online: {(onlineUsers.length)-1}</p>
                    <div className="dot"></div>
                    </div>
                    
                    </div>
                    <div className="chatMsgContainer">
                        {msg}
                        <div ref={messagesEndRef} />
                    </div>
                    <ChatInput onSubmit ={submitHandler} value={message} onChange = {inputHandler}/>

                    <div className="uploads">
                    <PopInfo image={camera} alt='image uploads'/>
                    <PopInfo image={video}  alt='video uploads'/>
                    <PopInfo image={clip}  alt='file uploads '/>
                    <PopInfo image={smileys} alt='smileys'/>
                    
                    </div>

            </div>

            
        </div><Link  style={{fontFamily:"pocket_monkregular",letterSpacing:"2px",fontSize:"18px"}} to ='#' onClick={logOut} className="logout" >Logout</Link>
        </div>
    )
}

export default ChatRoom
