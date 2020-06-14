import React from 'react'
import redRocket from './../../assets/redRocket.png'
import rocket from './../../assets/rocket.jpg'
function Messages(props) {
   
    return (
        < >
        {
        ( props.cls === 'centerAlign' || props.cls==='leftAlign')?
        <>
        <div className="chatMessage left">
                     <div className="avatar" style={{backgroundImage:"url("+rocket+")"}}></div>
                   <div className="message outward">
                      <p>{props.message}</p>
                  </div>
              </div>
                </>:
                <>
                 <div className="chatMessage right">
                     <div className="message outward">
                         <p>{props.message}</p>
                     </div>
                     <div className="avatar" style={{backgroundImage:"url("+redRocket+")"}}>
                     </div>
                 </div>
        </>
        }
        
        </>
    )
}

export default Messages

