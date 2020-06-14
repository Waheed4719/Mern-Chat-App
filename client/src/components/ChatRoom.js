import React,{useEffect,useState,useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import queryString from 'query-string'
import Messages from './sub-components/Messages'
import OnlineUsers from './sub-components/OnlineUsers'
import io from 'socket.io-client'
import {logout} from './../store/actions/authActions'
import { Redirect,Link, useHistory } from 'react-router-dom'
import './styles/chatPage.css'
import './styles/neomorphism.css'
import Path1 from './../assets/Path 1.png'
import Path2 from './../assets/Path 2.png'
import rocket from './../assets/rocket.jpg'
import redRocket from './../assets/redRocket.png'



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

 
    function logOutEmit(e){
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
    <Messages key={index} message={msgs.text} cls="rightAlign" image={redRocket}/>: 
    (msgs.user === 'admin')?
    <Messages key={index} message={msgs.text} cls="centerAlign" />
    : <Messages key={index} message={msgs.text} cls="leftAlign" image={rocket} />
    )
   }

   var ou
   if(onlineUsers){
    ou = <OnlineUsers onUsers={onlineUsers} />  
   }

    return (
        <div className="container" style={{flexDirection: 'column'}}>
            {auth && auth.isAuthenticated?null:<Redirect to="/"/>}
    <div className="outward mainBox">
        
       <div className="platform">

            <div className="title">
                <div className="roomName">
                <p>{room}</p>
                <img src = {Path1}  alt="no image"/>
                </div>
              

                               <div className="onlineStatus">
                                     <p>Online: {(onlineUsers.length)-1}</p>
                 <div className="dot"></div></div>
            </div>

            <div className="chatbox" >

                        {msg}
                        <div ref={messagesEndRef} />


            </div>

        <div className="chatInput">
            <div className="inputBox  inward">
                <input placeholder="Type your message" value={message} onChange = {inputHandler}/>
            </div>
            <div className="submitBtn outward" onClick={submitHandler}>
                <img src={Path2} />
            </div>
        </div>


       </div>

        

    </div>

    <div className="inputBox  outward logoutBtn" onClick={logOutEmit} >
                                <Link to="#">Logout</Link>
                            </div>
</div>
    )





}

export default ChatRoom
