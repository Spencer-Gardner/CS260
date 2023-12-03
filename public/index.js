'use strict';

// WEBSOCKET...
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

function configureWebSocket() {
  socket.onopen = (event) => {
    console.log('socket open');
  };
  socket.onclose = (event) => {
    console.log('socket closed')
  };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    displayLogin(msg.user);
  }
};

function displayLogin(user) {
  let loginMsg = document.getElementById('message');
  loginMsg.innerText = user + ' logged in!';
}

function broadcastEvent(user) {
  const event = {
    user: user
  };
  socket.send(JSON.stringify(event));
};


// LOGIN DISPLAY...
(async () => {
  const username = localStorage.getItem('username');
  if (username) {
    document.getElementById('user').innerText = username;
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('playControls', 'none');
  }
})();

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}


// PRIMARY FUNCTIONS...
async function login() {
  verify(`/api/auth/login`);
}

async function create() {
  verify(`/api/auth/create`);
}

async function verify(endpoint) {
  const username = document.querySelector('#username')?.value;
  const password = document.querySelector('#password')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ username: username, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('username', username);
    window.location.href = 'play.html';
    broadcastEvent(username);
  } else {
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}


// SECONDARY FUNCTIONS...
function play() {
  window.location.href = 'play.html';
}

function logout() {
  localStorage.removeItem('username');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(username) {
  const response = await fetch(`/api/user/${username}`);
  if (response.status === 200) {
    return response.json();
  }
  return null;
}

configureWebSocket();