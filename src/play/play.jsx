import React from 'react';
import { Game } from './game'

export function Play(props) {
  return (
    <main>
    <Game userName={props.userName} />
  </main>
  );
}