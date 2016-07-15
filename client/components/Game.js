import React from 'react';
import Square from './Square';

/* eslint-disable jsx-quotes, react/prop-types, no-underscore-dangle */

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [], theGame: {} };
    this.load = this.load.bind(this);
    this.refresh = this.refresh.bind(this);
    this.move = this.refresh.bind(this);
  }

  componentDidMount() {
    fetch('//localhost:3333/games')
    .then(r => r.json())
    .then(j => {
      this.setState({ games: j.games });
      // console.log('this.state.players', this.state.players);
    });
  }

  load(e) {
    const gameId = this.refs.games.value;
    console.log('in the load - gameId:', gameId);
    // const body = JSON.stringify({ player1Id, player2Id });
    fetch(`//localhost:3333/games/${gameId}`,
     { method: 'get', headers: { 'Content-Type': 'application/json' } })
    .then(r => {
      r.json();
      console.log('response from for the game:', r);
      this.setState({ theGame: r });
    });
  //  .then(() => this.refresh());
    e.preventDefault();
  }
  refresh() {
    // fetch('//localhost:3333/home');
  }

  move(e) {
  //   const gameId = this.refs.games.value;
  //   console.log('in the load - gameId:', gameId);
  //   // const body = JSON.stringify({ player1Id, player2Id });
  //   fetch(`//localhost:3333/games/${gameId}`,
  //    { method: 'get', headers: { 'Content-Type': 'application/json' } })
  //   .then(r => {
  //     r.json();
  //     console.log('response from for the game:', r);
  //     this.setState({ theGame: r });
  //   });
  // //  .then(() => this.refresh());
    e.preventDefault();
  }

  render() {
    const row1 = [];
    let s = 0;
    for (s = 1; s < 9; s++) {
      row1.push(<Square key={s} />);
    }

    return (
      <div>
        <h1>Play Game</h1>
        <form>
          <div className='form-group'>
            <label>Available Games</label>
            <select className='form-control' ref='games'>
              {this.state.games.map((g, i) =>
                <option key={i}value={g._id}>{g.dateCreated}</option>)}
            </select>
          </div>
          <button className='btn btn-primary' onClick={this.load}>Load Game</button>
        </form>
        <h2>Game Board</h2>
        <form>
          <div className='form-group'>
           {row1}
          </div>
          <div className='form-group'>
           {row1}
          </div>
          <div className='form-group'>
           {row1}
          </div>
          <div className='form-group'>
           {row1}
          </div>
          <div className='form-group'>
           {row1}
          </div>
          <div className='form-group'>
           {row1}
          </div>
          <div className='form-group'>
           {row1}
          </div>
          <div className='form-group'>
           {row1}
          </div>
          <button className='btn btn-primary' onClick={this.move}>Move</button>
        </form>
      </div>
    );
  }


}
export default Game;
