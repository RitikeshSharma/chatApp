

const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageINP');
const messageContainer = document.querySelector('.container');

//const name = prompt("Enter your name: ");

socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} has joined the chat`, 'left');
});

//making function append which displays the message
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(`${position}`);
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
}

//adding submit eventListener
form.addEventListener('submit', (e)=>{
    e.preventDefault();         //prevents page from reloading
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

socket.on('receive', data=>{
    append(`${data.name}:${data.message}`, 'left');
});

socket.on('left', name=>{
    append(`${name} has left the chat`, 'left');
});