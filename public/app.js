// Token
const IAM = {
  token: null,
  name: null
};

// Connect to Socket.io Server
const socket = io();

// After User Connected
socket.on('connect', function() {
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
  document.getElementById('step3').style.display = 'none';
});

// After Token is issued
socket.on('token', function(data) {
  console.log(data.token);
  IAM.token = data.token;
});

// Input Name
document.getElementById('frm-myname').addEventListener('submit', function(e) {
  e.preventDefault();
  const myname = document.getElementById('txt-myname');
  if (myname.value === '') {
    return false;
  }
  myname.innerHTML = myname.value;
  IAM.name = myname.value;
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'block';
});

// Send Message
document.querySelector("#frm-post").addEventListener("submit", function(e) {
  e.preventDefault();
  const msg = document.querySelector("#msg");
  if (msg.value === "") {
    return false;
  }
  socket.emit("post", {
    text: msg.value,
    token: IAM.token,
    name: IAM.name
  });
  msg.value = "";
});

// Receive Message
socket.on("member-post", function(msg) {
  const is_me = (msg.token === IAM.token);
  addMessage(msg, is_me);
  //const list = document.querySelector("#msglist");
  //const li = document.createElement("li");
  //li.innerHTML = `${msg.text}`;
  //list.insertBefore(li, list.firstChild);
});

function addMessage(msg, is_me=false) {
  const list = document.getElementById('msglist');
  const li = document.createElement("li");
  if (is_me) {
    li.innerHTML = `<span class="msg-me"><span class="name">${msg.name}</span>> ${msg.text}</span>`;
  } else {
    li.innerHTML = `<span class="msg-member"><span class="name">${msg.name}</span>> ${msg.text}</span>`;
  }
  list.insertBefore(li, list.firstChild);
}

// Focus Setting
//window.onload = ()=>{
//  document.querySelector("#msg").focus();
//}
