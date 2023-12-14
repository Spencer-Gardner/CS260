import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div>
        <div id="playControls" className="card border-dark text-center p-5">
            <h3 id="user">{ props.userName }</h3>
            <div className="container-fluid pt-2">
                <div className="row gx-2">
                  <div className="col">
                    <Button variant="outline-dark" className="px-4 my-2" onClick={() => navigate('/play')}>
                        Play
                    </Button>
              </div>
                <div className="col">
                    <Button variant="outline-dark" className="px-4 my-2" onClick={() => logout()}>
                        Logout
                    </Button>
                </div>                  
              </div>
            </div>
        </div>
    </div>
  ); 
}