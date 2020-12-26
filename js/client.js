const socket = io('http://localhost:8000');

//get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageINP');
const messageContainer = document.querySelector('.container');

//audio that will be played on receiving msgs
var audio = new Audio('ting.mp3');


//ask the user for his/her name and let the server know
const name = prompt("Enter your name: ");
socket.emit('new-user-joined', name);

//if a new user joins, receive his/her name from the server
socket.on('user-joined', name =>{
    append(`${name} has joined the chat`, 'left');
});

//if server sends the data, receive it.
socket.on('receive', data=>{
    append(`${data.name}:${data.message}`, 'left');
});

//if user leaves the chat, append the info to the container
socket.on('left', name=>{
    append(`${name} has left the chat`, 'left');
});

//making function append which displays the message
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(`${position}`);
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
    if (position == 'left'){
        audio.play();
    }
}

//adding submit eventListener
//if the form gets submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();         //prevents page from reloading
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});


