import io from 'socket.io-client'
var Url = window.location.protocol + '//' + window.location.host + '/'


export const socket = io(Url)
