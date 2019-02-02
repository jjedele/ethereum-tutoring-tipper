import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { DrizzleContext } from 'drizzle-react';
import web3 from 'web3';

class Create extends Component {
  // constructor(props) {
  //   super(props)
  //   this.contracts = DrizzleContext.drizzle.contracts;
  //   console.log(this.contracts)
  //   this.tgIndex = this.contracts.Tipping.tgNum.cacheCall();
  // }
  handleSubmit(drizzle, op) {

    //console.log(drizzle);
    
    // common to all op
    let create_courseId = this.create_courseIdInput.value;
    let create_groupId = this.create_groupIdInput.value;
    let pay_courseId = this.pay_courseIdInput.value;
    let pay_groupId = this.pay_groupIdInput.value;
    let stackId = null;

   

    let contract = drizzle.contracts['Tipping'];
    // console.log(contract);
    // // contract.then(async instance => {
    // //   let v = await instance.tgNum();
    // //   console.log(v);
    // // })
    // console.log(contract.address);
    // let v = this.props.Tipping.tgNum[this.tgIndex].value;
    // console.log({v});

    if (op === "TG") {
      let tutor = this.tutorInput.value;
      let grade = parseFloat(this.gradeInput.value);
      console.log("make tutorgroup");
      console.log("create courseId " + create_courseId);
      console.log("create groupId " + create_groupId);
      console.log("gradeGoal " + grade);

      stackId = contract.methods['newTutorGroup'].cacheSend(
        tutor,
        create_courseId,
        create_groupId,
        grade
      )
    } else {
      let account = this.accountInput.value;
      let amount = web3.utils.toWei(this.amountInput.value, 'ether');
      console.log("paying in");
      console.log("pay courseId " + pay_courseId);
      console.log("pay groupId " + pay_groupId);
      console.log("account " + account);
      console.log("amount " + amount);
      stackId = contract.methods['payIn'].cacheSend(
        pay_courseId,
        pay_groupId,
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
                inputRef={input => (this.create_courseIdInput = input)}
              />
              <ControlLabel>Group</ControlLabel>
              <FormControl
                name="groupID"
                type="text"
                inputRef={input => (this.create_groupIdInput = input)}
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
                inputRef={input => (this.pay_courseIdInput = input)}
              />
              <ControlLabel>Group</ControlLabel> 
              <FormControl
                name="groupID"
                type="text"
                inputRef={input => (this.pay_groupIdInput = input)}
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
