import React, { useEffect, useState } from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './Authenticated';
import { AuthState } from './authState';
import './login.css';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main id="main-page">
      <div>
      {authState !== AuthState.Unknown && 
        <div className="ctr-text">
        <h2>Wirdle</h2>
        <p>Can you guess the word?</p></div>}
      {/*if you are authenticated display play & logout */}
      {authState === AuthState.Authenticated && (
        <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
      )}
      {/*if you are unauthenticated display login & create */}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) => {onAuthChange(loginUserName, AuthState.Authenticated);}} 
        />
      )}
      </div>
    </main>
  );
}