import React from 'react';

/* eslint-disable jsx-quotes, react/prop-types */

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { types: [] };
    this.create = this.create.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  create(e) {
    const name = this.refs.name.value;
    console.log('the name:', name);
    const body = JSON.stringify({ name });
    fetch('//localhost:3333/players',
     { method: 'post', body, headers: { 'Content-Type': 'application/json' } })
    .then(r => {
      r.json();
      console.log('response from server:', r);
    })
    .then(() => this.refresh());
    e.preventDefault();
  }
  refresh() {
    fetch('//localhost:3333/player');
  }

  render() {
    return (
      <div>
        <h1>Register a New Player</h1>
        <form>
          <div className='form-group'>
            <label>Name</label>
            <input className='form-control' ref='name' type='text' />
          </div>
          <button className='btn btn-primary' onClick={this.create}>Register</button>
        </form>
      </div>
    );
  }


}
export default Player;
