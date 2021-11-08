const socket = io()
const messarea =  document.querySelector('.chat');
let  nam;
do{
  nam =  prompt('please enter your name');

}while(!nam)
if(nam)
{
    socket.emit('newcon',nam);
    
}

let textarea = document.querySelector('.type');

textarea.addEventListener('keyup',(e)=>{
  
    if(e.key === 'Enter')
    {
        sendmess(e.target.value);
    }
    // console.log(e.target.value);
   

})

function sendmess(mess)
{
    let msg={
        user:nam,
        messege:mess.trim()
        
    }
    appendmess(msg, 'send');
    textarea.value=''
    scroll();
    

    // send to server 
    socket.emit('messege' , msg);

}


function appendmess(msg,type){
   
    let maindiv = document.createElement('div');
    let classname = type;
    maindiv.classList.add(classname);
    let data =` <p>${msg.user}</p>
    <p class="mess-${type}">${msg.messege}</p>`
    maindiv.innerHTML=data;
    messarea.appendChild(maindiv)

    

}


socket.on('messege',(msg)=>{
    appendmess(msg,'received')
    scroll();
})
function newconnection(nam)
{   let div = document.createElement('div');
    div.classList.add('newc')
    let newcon = ` <h4 class="newcon">${nam} is joined</h4>`
    div.innerHTML=newcon;
    messarea.appendChild(div);
}
socket.on('newcon',(nam)=>{
    newconnection(nam);
    scroll();
})

function scroll()
{
    messarea.scrollTop=messarea.scrollHeight;
}
