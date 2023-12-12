import React, {useEffect} from "react";
import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);
    
    function handleKeyUp(key) {
        
        {key.key == 'Enter' && loginUser()}
    }

    async function loginUser() {
        //console.log('logging in');
        loginOrCreate(`/api/auth/login`);
    }
    
    async function createUser() {
        //console.log('making user');
        loginOrCreate(`/api/auth/create`);
    }
    
    async function loginOrCreate(endpoint) {
        //console.log('in create/login');
        if (userName === '' || password === '') {
            console.log('no username/password inserted');
            return;
        }
    
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            // Handle errors as needed
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyUp);
        console.log("listening for enter")
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div id="loginControls">
           <div className="input-group mb-3">
             <span className="input-group-text">@</span>
             <input 
                className="form-control" 
                type="text" 
                id="userName" 
                /*value={userName}*/
                onChange={(e) => setUserName(e.target.value)}
                placeholder="your@email.com" />
           </div>
           <div className="input-group mb-3">
             <span className="input-group-text">🔒</span>
             <input 
                className="form-control" 
                type="password" 
                id="userPassword"
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="password" />
           </div>
           <button type="button" className="btn btn-primary" id="lgn-btn" onClick={() => loginUser()}>
             Login
           </button>
           <button type="button" className="btn btn-primary" id="crt-btn" onClick={() => createUser()}>
             Create
           </button>
           <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
         </div>
    );
}