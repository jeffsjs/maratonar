import React, { Component } from 'react';

import NextEpisode from '../components/next-episode'

class Calcular extends Component {
	render()  {
    const { idSerie } = this.props.match.params;
    return <div> 
      CALCULAR 
      <NextEpisode idSerie={idSerie} />
    </div>
  }
}

export default Calcular;

