import React from 'react'
import redRocket from './../../assets/redRocket.png'
import rocket from './../../assets/rocket.jpg'
var Url = window.location.protocol + '//' + window.location.host
function Messages({media,message,cls}) {
  
    return (
        < >
        {
        ( cls === 'centerAlign' || cls==='leftAlign')?
        <>
        <div className="chatMessage left">
                     <div className="avatar" style={{backgroundImage:"url("+rocket+")"}}></div>
                   <div className="message outward">
                   {message?<p>{message}</p>:null}

                    {media && media.endsWith('.jpg' || '.svg' || '.png')?
                    
                    <img src={ `${Url}/${media}`} width="100" height="100"/>:null}  
                    {media && media.endsWith('.mp4' )?
                    <video src={ `${Url}/${media}`} width="200" height="200"  controls autoPlay/>
                    :null}
                      
                      
                  </div>
              </div>
                </>:
                <>
                 <div className="chatMessage right">
                     <div className="message outward">
                        {message?<p>{message}</p>:null}

                       {media && media.endsWith('.jpg' || '.svg' || '.png')?
                       <img src={ `${Url}/${media}`} width="100" height="100"/>:null}  
                       {media && media.endsWith('.mp4')?
                       <video src={ `${Url}/${media}`} width="200" height="200"  controls autoPlay/>
                       :null}
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

