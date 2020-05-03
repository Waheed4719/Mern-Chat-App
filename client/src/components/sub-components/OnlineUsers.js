import React from 'react'
import { useSelector } from 'react-redux'

function OnlineUsers(props) {
    var ou = []
    const auth = useSelector(state=>state.auth)
    
    var online = props.onUsers.filter(user=>user.user!=auth.user._id)
    if(props.onUsers){
        ou = online.map((ousers,index)=><div key={index} className="status"><div className="dot"></div><p style={{cursor:'pointer',padding:'0px' }}>{ousers.name}</p></div>)
    }

    const sampleStyle={color: "white",fontFamily:"Open sans",marginLeft: '0px'}
    return (
        <>
        <h4 style={{...sampleStyle,fontWeight:"bolder",fontFamily:"Circular Std Black"}}>Online Users</h4>
        {(!ou.length) && <p style={sampleStyle}>No Users Online</p> }
            {ou}
        </>
    )
}

export default OnlineUsers
