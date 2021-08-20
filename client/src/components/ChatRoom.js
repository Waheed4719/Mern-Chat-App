import React,{useEffect,useState,useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import queryString from 'query-string'
import Messages from './sub-components/Messages'
import {logout} from './../store/actions/authActions'
import { Redirect,Link, useHistory } from 'react-router-dom'
import './styles/chatPage.css'
import './styles/neomorphism.css'
import Path1 from './../assets/Path 1.png'
import Path2 from './../assets/Path 2.png'
import rocket from './../assets/rocket.jpg'
import redRocket from './../assets/redRocket.png'
import {socket} from './sub-components/Socket'
import Axios from 'axios'
import {UploadOutlined}from '@ant-design/icons'


function ChatRoom({location}) {
    
    //Setting up Hooks
    const auth = useSelector(state=>state.auth)
    const [room,setRoom] = useState('')
    const [user,setUser] = useState({})
    const [onlineUsers,setOnlineUsers] = useState([])
    const [messages,setMessages] = useState([])
    const [message,setMessage] = useState('')
    const [adminMsg, setAdminMsg] = useState({})
    const [image,setImage] = useState('')
    const messagesEndRef = useRef(null)
    const MsgInput = useRef(null)
    const submitMsg = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const upload = useRef()
    const uploadBtn = useRef()
    const popupMenu = useRef()
    const triggerPop = useRef()

    useEffect(() => {

        setUser(auth.user)
        const data = queryString.parse(location.search)
        setRoom(data.room)
        const user = auth.user
        const room = data.room  
        socket.emit('join',{user, room} )

        
        var allMessages= localStorage.getItem('messages')
        if(allMessages){
            let oldMessages = JSON.parse(allMessages)
            if(oldMessages[(oldMessages.length)-1].room === data.room){
                setMessages(JSON.parse(allMessages))
            }
            else{
                localStorage.removeItem('messages')
            }
        }



        return()=>{
            socket.emit('disconnect');
            socket.off()
        }
     
    }, [location.search])



    useEffect(()=>{
        
        socket.on('message',data=>{  
            localWork(data)
            setMessages(messages=>[...messages,data])
            scrollToBottom()
            if(data.user==="admin"){
                setAdminMsg(data)
            }
    })

        socket.on('media',data=>{
            localWork(data)
            setMessages(messages=>[...messages,data])
            scrollToBottom()
        })
        
    },[])

    useEffect(()=>{
        socket.emit('getUsers',room)
        socket.on('usersOnline',data=>{
            setOnlineUsers(data)
        })
    },[adminMsg])

 
    function logOutEmit(e){
        e.preventDefault()
        socket.emit('logout')
        localStorage.removeItem("messages")
        dispatch(logout(history))
    }

   const inputHandler = e =>{
       e.preventDefault()
       setMessage(e.target.value)
   }

   const submitFileHandler = e =>{
    console.log('here')
    console.log(e.target.files[0])
    let form = new FormData()
    form.append('file',e.target.files[0])
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    let media = null
    Axios.post('/api/auth/uploadfiles',form,config)
    .then(response=>{
        console.log(response)
        if (response.data.success) {
            media = response.data.url
            if(media){
                const user = auth.user
                user.room = room
                socket.emit('sendMedia',{user,media})
                setImage('')
            }
        }
    })
    .catch(error=>console.log(error))
    setImage('')
    

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


  useEffect(()=>{
    if(MsgInput){
        MsgInput.current.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
            event.preventDefault();
            if(submitMsg){
                submitMsg.current.click();
            }
          }
        });
    }

    if(upload && uploadBtn){
        uploadBtn.current.addEventListener('click', (e)=>{
            e.stopImmediatePropagation()
            upload.current.click()
        })
    }

    if(triggerPop){
        triggerPop.current.addEventListener('click',()=>{
            if(popupMenu){
                if(popupMenu.current.style.display==""){
                    popupMenu.current.style.display="flex"
                }
                else{
                    popupMenu.current.style.display=""
                }
            }
        })
    }

    },[])

    const localWork = (data) => {
        let localMessages = localStorage.getItem('messages') 
        var oldMessages = []
        if(localMessages){
            console.log("got")
            oldMessages= JSON.parse(localMessages)
            console.log('1', oldMessages)
            if(data.user !== 'admin'){
                oldMessages.push(data)
                console.log('2', oldMessages)
            }
            
            localStorage.setItem('messages',JSON.stringify(oldMessages))
        }
        else{
            if(data.user !== 'admin'){
                console.log("got 2")
                oldMessages.push(data)
            }
        
    
            localStorage.setItem('messages',JSON.stringify(oldMessages))
        }
    }

   var msg = []
   if(messages){
    msg = messages.map((msgs,index)=>(msgs.user===auth.user.name)?
    <Messages key={index} message={msgs.text} media={msgs.url} cls="right" image={redRocket}/>: 
    <Messages key={index} message={msgs.text} media={msgs.url} cls="left" image={rocket} />
    )
   }

   var ou
   if(onlineUsers){
    ou = onlineUsers.map((online,index)=>
   <li key={index}>{online.name} {(online.name===auth.user.name)? <small>( me )</small>: null}</li>
    ) 
   }

    return (
        <div className="container" style={{flexDirection: 'column'}}>
            {auth && auth.isAuthenticated?null:<Redirect to="/"/>}
   
            <div className="outward mainBox">
                
                <div className="platform">

                    <div className="title">
                            <div className="roomName">
                            <p>{room}</p>
                            <img src = {Path1}  alt="no image" ref={triggerPop}/>
                            <div className="popupMenu outward" ref={popupMenu}>
                                <p>Users Online</p>
                                <hr style={{width:"100%",height:"2px",borderWidth:'4px',color:'gray',backgroundColor:'gainsboro'}}/>
                                <ul>
                                {ou}
                                </ul>
                            
                            </div>
                            </div>
                                <div className="onlineStatus">
                                    <p>Online: {(onlineUsers.length)}</p>
                                    <div className="dot"></div>
                                </div>
                            </div>

                    <div className="chatbox" >
                                    {msg}
                                    <div ref={messagesEndRef} />
                        </div>

                    <div className="chatInput">
                        <div className="inputBox  inward">
                            <input placeholder="Type your message" value={message} ref={MsgInput} onChange = {inputHandler}/>
                        </div>
                        <div className="submitBtn outward" ref={uploadBtn}  >
                            <UploadOutlined style={{fontSize: '18px'}} />
                        </div>
                        <input type='file' value={image} single="true" className="fileInput"  ref={upload}  onChange={submitFileHandler}/>
                        <div className="submitBtn outward" ref={submitMsg} onClick={submitHandler}>
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
