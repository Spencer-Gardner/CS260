import React from 'react';
import Button from 'react-bootstrap/Button';

import {MessageDialog} from './message';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [message, setMessage] = React.useState('');

  let port = window.location.port;
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  let socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

  function configureWebSocket() { 
      socket.onopen = (event) => {
      console.log('socket open');
    };
    socket.onclose = (event) => {
      console.log('socket close');
    };
    socket.onmessage = async (event) => {
      try {
        const msg = JSON.parse(await event.data.text());
        setMessage(msg.user + msg.msg);
        setTimeout(() => {
          setMessage('');
        }, 5000);
      } catch {
        console.log('error');
      }
    };
  }
  
  function broadcastEvent(user, msg) {
    const event = {
      user: user,
      msg: msg
    }
    socket.send(JSON.stringify(event));
  }

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      broadcastEvent(userName, ' logged in!');
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  configureWebSocket();

  return (
    <>
        <div className="container-fluid justify-content-start align-items-center pt-4">
            <div id="loginControls" className="card border-dark text-center p-5">
                <h3>Login</h3>
                <div className="input-group pt-4">
                    <input
                        className="form-control"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                    />
                </div>
                <div className="input-group pt-2 pb-4">
                    <input
                    className="form-control"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" />
                </div>
                <div className="container-fluid pt-2">
                  <div className="row gx-2">
                    <div className="col">
                      <Button variant="outline-dark" className="px-4" onClick={() => loginUser()}>
                          Enter
                      </Button>
                  </div>
                  <div className="col">
                      <Button variant="outline-dark" className="px-4" onClick={() => createUser()}>
                          Create
                      </Button>
                      </div>                  
                  </div>
                </div>
            </div>
            <div className="text-center">
                <h4 id="message" className="p-5">{ message }</h4>
            </div>
        </div>

        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}