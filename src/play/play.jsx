import React from 'react';

import { Players } from './players';
import { Game } from './Game';

export function Play(props) {
  return (
    <main>
        <Players userName={props.userName}/>
        <Game userName={props.userName} />
    </main>
  );
}