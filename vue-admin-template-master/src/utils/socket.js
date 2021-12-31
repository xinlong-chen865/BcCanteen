import io from 'socket.io-client'

const socket = io.connect('http://127.0.0.1:3000')

export default socket
