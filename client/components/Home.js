import React from 'react';

/* eslint-disable jsx-quotes, react/prop-types, no-underscore-dangle */

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };
    this.create = this.create.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    fetch('//localhost:3333/players')
    .then(r => r.json())
    .then(j => {
      this.setState({ players: j.players });
      // console.log('this.state.players', this.state.players);
    });
  }

  create(e) {
    const player1Id = this.refs.player1.value;
    const player2Id = this.refs.player2.value;
    console.log('player1Id:', player1Id);
    console.log('player2Id:', player2Id);
    console.log('refs.player1:', this.refs.player1);
    const body = JSON.stringify({ player1Id, player2Id });
    fetch('//localhost:3333/games',
     { method: 'post', body, headers: { 'Content-Type': 'application/json' } })
    .then(r => {
      r.json();
      console.log('response from server:', r);
    })
    .then(() => 'http://localhost:3333/game');
//    .then(() => this.refresh());
    e.preventDefault();
  }
  refresh() {
    // fetch('//localhost:3333/home');
  }

  render() {
    return (
      <div>
        <h1>Welcome to Checkers</h1>
        <form>
          <div className='form-group'>
            <label>Player 1</label>
            <select className='form-control' ref='player1'>
              {this.state.players.map((p, i) => <option key={i}value={p._id}>{p.name}</option>)}
            </select>
          </div>
          <div className='form-group'>
            <label>Player 2</label>
            <select className='form-control' ref='player2'>
              {this.state.players.map((p, i) => <option key={i}value={p._id}>{p.name}</option>)}
            </select>
          </div>
          <button className='btn btn-primary' onClick={this.create}>Start New Game</button>
        </form>
      </div>
    );
  }


}
export default Home;
