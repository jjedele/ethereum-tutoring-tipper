import React, { Component } from 'react';
import { PageHeader, Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';
import AdminForm from './AdminForm';
import Summary from './Summary';
import Create from './Create';
import './App.css';

const Status = () => <h2>Contract Status</h2>;

class App extends Component {

  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { initialized } = drizzleContext;

          if (!initialized) {
            return <b>Loading...</b>;
          }

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

                <Route path="/" exact component={Summary} />
                <Route path="/create/" component={Create} />
                <Route path="/status/" component={Status} />
                <Route path="/admin/" component={AdminForm} />
              </div>
            </Router>
          );
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default App;
