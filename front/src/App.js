import React, { Component } from 'react';
import './App.css';

import { drizzleConnect } from "drizzle-react";
import { ContractData, ContractForm } from "drizzle-react-components";

class App extends Component {
  state = { 
    payeeAccount: null,
    payeeAmount: null
  }

  setPayeeAccount = e => {
    const payeeAccount = e.target.value
    this.setState({ payeeAccount })
  }

  setPayeeAmount = e => {
    const payeeAmount = e.target.value
    this.setState({ payeeAmount })
  }

  render() {
    const { drizzleStatus, accounts } = this.props;

    if (drizzleStatus.initialized) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Tutoring Tipper</h1>
            <p />
            <h3>Create Tutoring Group</h3>
            <div className="App-intro">
              <ContractForm
                contract="Tipping"
                method="newTutorGroup"
                labels={["Tutor Address", "Course ID", " Group ID", "Grade Goal"]}
              />
            </div>
          </header>
          <p />
          <h3>Add a Payee</h3>
    
          <p>
          Payee Account: <input type="text" onChange={this.setPayeeAccount} />
          {/* this.state.payeeAccount */}
          <br />
          <br />
          Payee Amount: <input type="text" onChange={this.setPayeeAmount} />
          {/* this.state.payeeAmount */}
          </p>
          <div className="App-intro">
              <ContractForm
                contract="Tipping"
                method="payIn"
                sendArgs={{from: this.state.payeeAccount, value: this.state.payeeAmount}}
                labels={["Course ID", "Group ID"]}
              />
          {/* Currently No Error handling on amount, course, or group
          will crash with bad address though */}
          </div>
          <br />
          <hr />
          <p />
          <h3>Add Grade through Oracle</h3>

          <div className="App-intro">
              <ContractForm
                contract="TUMOracle"
                method="addGrade"
                labels={["Course ID", "Group ID", "Grade"]}
              />
          </div>
          {/* Add resolve button here */}
        </div>
      );
    }

    return <div>Loading dapp...</div>
  }
}



const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    Tipping: state.contracts.Tipping,
    TUMOracle: state.contracts.TUMOracle
  };
};

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;