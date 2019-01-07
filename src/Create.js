import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { DrizzleContext } from 'drizzle-react';
import web3 from 'web3';

class Create extends Component {
  handleSubmit(drizzle, op) {
    console.log(drizzle);
    
    // common to all op
    let courseId = this.courseIdInput.value;
    let groupId = parseInt(this.groupIdInput.value);
    let stackId = null;

    let contract = drizzle.contracts['Tipping'];
    console.log(contract);

    if (op === "TG") {
      let tutor = this.tutorInput.value;
      let grade = parseFloat(this.gradeInput.value);

      stackId = contract.methods['newTutorGroup'].cacheSend(
        tutor,
        courseId,
        groupId,
        grade
      )
    } else {
      let account = this.accountInput.value;
      let amount = web3.toWei(this.amountInput.value, 'ether');

      stackId = contract.methods['payIn'].cacheSend(
        courseId,
        groupId,
        {from: account, value: amount}
      )
    }
   
    console.log(stackId);
    
  }

  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => (
          <div>
          <h3>Create a Tutor Group Contract</h3>
          <form>
            <FormGroup controlId="createTG">
              <ControlLabel>Tutor Address</ControlLabel>
              <FormControl
                name="tutor"
                type="text"
                inputRef={input => (this.tutorInput = input)}
              />
              <ControlLabel>Course ID</ControlLabel>
              <FormControl
                name="courseID"
                type="text"
                inputRef={input => (this.courseIdInput = input)}
              />
              <ControlLabel>Group</ControlLabel>
              <FormControl
                name="groupID"
                type="text"
                inputRef={input => (this.groupIdInput = input)}
              />
              <ControlLabel>Grade Goal</ControlLabel>
              <FormControl
                name="grade"
                type="text"
                inputRef={input => (this.gradeInput = input)}
              />
            </FormGroup>
            <Button onClick={() => this.handleSubmit(drizzleContext.drizzle, "TG")}>
              Create Contract
            </Button>
          </form>
          <br />
          <p />
          <h3>Pay In to a Tutor Group</h3>
          <form>
            <FormGroup controlId="createPayIn">
              <ControlLabel>Course ID</ControlLabel>
              <FormControl
                name="courseID"
                type="text"
                inputRef={input => (this.courseIdInput = input)}
              />
              <ControlLabel>Group</ControlLabel> 
              <FormControl
                name="groupID"
                type="text"
                inputRef={input => (this.groupIdInput = input)}
              />
              <ControlLabel>Student Account</ControlLabel>
              <FormControl
                name="account"
                type="text"
                inputRef={input => (this.accountInput = input)}
              />
              <ControlLabel>Amount</ControlLabel>
              <FormControl
                name="amount"
                type="text"
                inputRef={input => (this.amountInput = input)}
              />
            </FormGroup>
            <Button onClick={() => this.handleSubmit(drizzleContext.drizzle, "PAY")}>
              Pay In
            </Button>
          </form>
          </div>
        )}
      </DrizzleContext.Consumer>
    );
  }
}

export default Create;
