const express = require('express');
const app=express();
const http = require('http').createServer(app);
app.use(express.static(__dirname + '/public'))

http.listen(3000,()=>{
    // console.log('listning on server');
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
    // res.send('helo from server')
    
})

const io = require('socket.io')(http)

io.on('connection' ,(socket)=>{
    // console.log(' new connection');
   socket.on('newcon',(nam)=>{
       
       socket.broadcast.emit('newcon',nam)
   })

    socket.on('messege',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('messege',msg);
    })
})