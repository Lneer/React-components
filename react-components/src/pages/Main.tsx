import { Album } from 'components';
import React, { Component } from 'react';
import Pokemon from 'types/pokemon';
import pokemon from '../types/pokemon.json';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <Album data={pokemon as Pokemon[]} page={1} limit={20}></Album>
      </div>
    );
  }
}
