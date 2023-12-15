import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Login } from './home/login';
import { Play } from './play/play';
import { Stats } from './stats/stats';
import { About } from './about/about';
import { AuthState } from './home/authState';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className="body">
                <header className="container-fluid bg-black text-white">
                    <nav className="navbar navbar-dark fixed-top sticky-top">
                        <div className="navbar-brand">
                            <img src="/logo.png" alt="logo" width="40px"></img>
                            Wordlock
                        </div>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="">Home</NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="play">Play</NavLink>
                                </li>
                            )}
                            {authState === AuthState.Authenticated && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="stats">Stats</NavLink>
                                </li>
                            )}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="about">About</NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>

        <Routes>
            <Route path='/' element={
                <Login
                    userName={userName}
                    authState={authState}
                    onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                    }}
            />
            } exact />
            <Route path='/play' element={<Play />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-black text-white-50 p-2 fixed-bottom">
            <div className="container-fluid">
                <span className="text-reset">Spencer Gardner</span>
                <a className="text-reset" href="https://github.com/Spencer-Gardner/CS_260">GitHub</a>
            </div>
        </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }

  export default App;