const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

http.listen (3000, function(){
    console.log('listen on port 3000')
})

let img = ['./assets/1.jpeg','./assets/2.jpeg','./assets/3.jpeg']
let current= ''

io.on('connection', socket => {
    console.log('ada yang masuk ni')

    
    socket.on('next', function(data){
        let filtered= img.indexOf(data)
        if (filtered == img.length-1){
            current = img[0]
            io.emit('resNext', img[0])
        } else {
            current = img[filtered]
            io.emit('resNext', img[filtered+1])
        }
    })
    io.emit('initiateImg',current || './assets/1.jpeg' )
})