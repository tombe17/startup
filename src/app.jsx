import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { AuthState } from './login/authState';
import { PageState } from './login/pageState';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const currentPage = PageState.Home;
    const [activePage, setActivePage] = React.useState(currentPage);

  return (
    <BrowserRouter>
    <>
    <header>
        <nav>
            <div className="container-fluid">
            <a id="navHead" href="#">Wirdle</a>
                <div className="container-fluid">
                    <ul>
                        <li>
                            <NavLink 
                                className="navbar" to='' 
                                id={activePage === PageState.Home ? 'active-link' : ''} 
                                onClick={() => setActivePage(PageState.Home)}>Home</NavLink>
                        </li>
                        {authState === AuthState.Authenticated && (
                        <li>
                            <NavLink 
                                className="navbar" to='play'
                                id={activePage === PageState.Play ? 'active-link' : ''} 
                                onClick={() => setActivePage(PageState.Play)}>Play</NavLink>
                        </li>
                        )}
                        {authState === AuthState.Authenticated && (
                        <li>
                            <NavLink 
                                className="navbar" to='scores'
                                id={activePage === PageState.Scores ? 'active-link' : ''} 
                                onClick={() => setActivePage(PageState.Scores)}>Scores</NavLink>
                        </li>
                        )}
                        <li>
                            <NavLink 
                                className="navbar" to='about'
                                id={activePage === PageState.About ? 'active-link' : ''} 
                                onClick={() => setActivePage(PageState.About)}>About</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  
    <Routes>
        <Route 
            path='/' 
            element={
            <Login 
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                }} 
                />} exact />
        <Route path='/play' element={<Play userName={userName} />} />
        <Route path='/scores' element={<Scores />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
    </Routes>

  <footer>
      <div className="text-reset">Thomas Bellows</div>
      <a href="https://github.com/tombe17/startup">GitHub</a>
  </footer>
  </>
  </BrowserRouter>
  );
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;