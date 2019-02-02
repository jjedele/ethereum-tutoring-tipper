import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { DrizzleContext } from 'drizzle-react';

class AdminForm extends Component {
  handleSubmit(drizzle, op) {
    
    let courseId = this.courseIdInput.value;
    let groupId = parseInt(this.groupIdInput.value);
    let grade = parseFloat(this.gradeInput.value);
    let stackId = null;

    let contract = drizzle.contracts['TUMOracle'];
    console.log(contract);
    console.log("courseID " + courseId);
    console.log("groupID " + groupId);

    // let encodedGrade = parseInt(10 * grade);
    if (op === "submit") {
        console.log("submitting");
        console.log("final grade " + grade);
        stackId = contract.methods['addGrade'].cacheSend(
        courseId,
        groupId,
        grade
      );
    } else {
        console.log("resolving");
        contract = drizzle.contracts['Tipping'];
        stackId = contract.methods['resolve'].cacheSend(
        courseId,
        groupId
      );
    }
    console.log(stackId);
    
  }

  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => (
          <form>
            <FormGroup controlId="adminForm">
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
              <ControlLabel>Grade</ControlLabel>
              <FormControl
                name="grade"
                type="text"
                inputRef={input => (this.gradeInput = input)}
              />
            </FormGroup>
            <Button onClick={() => this.handleSubmit(drizzleContext.drizzle, "submit")}>
              Submit
            </Button>
            <Button onClick={() => this.handleSubmit(drizzleContext.drizzle, "resolve")}>
              Resolve
            </Button>
          </form>
        )}
      </DrizzleContext.Consumer>
    );
  }
}

export default AdminForm;
