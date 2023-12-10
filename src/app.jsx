import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './home/login';
import { Play } from './play/play';
import { Stats } from './stats/stats';
import { About } from './about/about';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    return (
        <BrowserRouter>
    <div className='body bg-dark text-light'>
        <header className='container-fluid bg-black text-white'>
            <nav className='navbar fixed-top navbar-dark sticky-top'>
                <div className='navbar-brand'>
                    {/* <img src='https://www.activeliving.ie/content/uploads/2020/04/placeholder-logo-2.png' alt='logo' width='50px'> </img> */}
                    Wordlock
                </div>  
                <menu className='navbar-nav'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to=''>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='play'>Play</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='stats'>Stats</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='about'>About</NavLink>
                    </li>
                </menu>
            </nav>
        </header>

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Play />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className='bg-black p-2 text-white-50'>
            <div className='container-fluid'>
                <span className='text-reset'>Spencer Gardner</span>
                <NavLink className='text-reset' href='https://github.com/Spencer-Gardner/CS_260'>GitHub</NavLink>
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
