import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    console.log('Render', this.props);
    if (!this.props.drizzle.drizzleStatus.initialized) {
      return <div>Connecting to Ethereum...</div>;
    } else {
      return (
        <div>
          Connected to Ethereum. Accounts:{' '}
          {Object.keys(this.props.drizzle.accountBalances).map(acc => (
            <div>{acc}</div>
          ))}
        </div>
      );
    }
  }
}

export default App;
