import React from 'react'
import send from './../assets/send.svg'

function Input(props) {
    return (
        <div className="inputLayout">
            <input value ={props.value} placeholder="write some text..." onChange={props.onChange} onKeyPress={e=>e.key==='Enter'? props.onSubmit():null}/>
            <button type="submit" onClick={props.onSubmit}><img src={send} alt="send btn" /></button>
        </div>
    )
}

export default Input
