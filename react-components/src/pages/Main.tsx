import Card from 'components/Card/Card';
import React, { Component } from 'react';
import Pokemon from 'types/pokemon';
import pokemon from '../types/pokemon.json';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <Card pokemon={pokemon[1] as Pokemon}></Card>
      </div>
    );
  }
}
