let socket = io('localhost:3000')

socket.on('messages',(data)=>{
    console.log(data);
})