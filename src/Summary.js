import React, { Component } from 'react';
import { DrizzleContext } from 'drizzle-react';

class Summary extends Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          console.log('Drizzle Context', drizzleContext);
          const { drizzle, drizzleState } = drizzleContext;
          return (
            <div>
              <h3>Accounts:</h3>
              <ul>
                {Object.keys(drizzleState.accountBalances).map(acc => (
                  <li key={acc}>{acc}</li>
                ))}
              </ul>
              <h3>Contracts:</h3>
              <ul>
                {Object.keys(drizzle.contracts).map(con => (
                  <li key={con}>{con}</li>
                ))}
              </ul>
            </div>
          );
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default Summary;
