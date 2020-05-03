import React from 'react'

function Messages(props) {
   
    return (
        <div className={props.className} >
        {(props.className === 'centerAlign')?
        <>
        <p>{props.message}</p>
        </>
        :
        (props.className==='leftAlign')?
        <>
        <img src={props.image} alt="man" />
        <p>{props.message}</p>
        </>:
        <>
        <p>{props.message}</p>    
        <img src={props.image} alt="woman" />
        </>
        }
        
        </div>
    )
}

export default Messages

