import React, { Component } from 'react';
import { PageHeader, Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const Index = () => <h2>Home</h2>;
const Create = () => <h2>Create Contract</h2>;
const Status = () => <h2>Contract Status</h2>;
const Admin = () => <h2>TUM Admin</h2>;

class App extends Component {
  indexComponent() {
    if (this.props.drizzle.drizzleStatus.initialized) {
      return (
        <ul>
          {Object.keys(this.props.drizzle.accountBalances).map(acc => (
            <li>{acc}</li>
          ))}
        </ul>
      );
    } else {
      return <div>Connecting to Ethereum...</div>;
    }
  }

  render() {
    console.log('Render', this.props);
    return (
      <Router>
        <div>
          <PageHeader>Ethereum Tutoring Tipper</PageHeader>
          <Navbar>
            <Nav>
              <NavItem eventKey={1} href="/create">
                Contract Creation
              </NavItem>
              <NavItem eventKey={2} href="/status">
                Contract Status
              </NavItem>
              <NavItem eventKey={3} href="/admin">
                TUM Admin
              </NavItem>
            </Nav>
          </Navbar>

          <Route path="/" exact component={this.indexComponent.bind(this)} />
          <Route path="/create/" component={Create} />
          <Route path="/status/" component={Status} />
          <Route path="/admin/" component={Admin} />
        </div>
      </Router>
    );
  }
}

export default App;
