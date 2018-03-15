let socket = io.connect('http://localhost:4000');

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');
let user = document.getElementById('user');

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message:message.value,
        username:username.value
    })
})

message.addEventListener('keypress', function(){
    socket.emit('typing', username.value);
})

socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong> ${data.username} : </strong> ${data.message} </p>`
});

socket.on('typing', function(data){
    feedback.innerHTML = `<p><em> ${data} is typing a message...</em><p>`;
})
socket.on('broadcast', function(data){
    user.innerHTML = data.description;
})