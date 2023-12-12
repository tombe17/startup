import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Authenticated(props) {
    const navigate = useNavigate();

    function handleKeyUp(key) {
        {key.key == 'Enter' && navigate('/play')}
    }

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .catch(() => {
                //logout failed
            })
            .finally(() => {
                localStorage.removeItem('userName');
                props.onLogout();
            });
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
        <div id="playControls">
           <div id="playerName" >Hello, {props.userName.split('@')[0]}</div>
           <button type="button" className="btn btn-primary" id="ply-btn" onClick={() => navigate('/play')}>
             Play
           </button>
           <button type="button" className="btn btn-primary" id="lgt-btn" onClick={() => logout()}>
            Logout
           </button>
         </div>
    );
}