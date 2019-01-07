import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { DrizzleContext } from 'drizzle-react';

class AdminForm extends Component {
  handleSubmit(drizzle) {
    console.log(drizzle);
    let courseId = this.courseIdInput.value;
    let groupId = parseInt(this.groupIdInput.value);
    let grade = parseFloat(this.gradeInput.value);

    let contract = drizzle.contracts['TUMOracle'];
    console.log(contract);

    // let encodedGrade = parseInt(10 * grade);

    let stackId = contract.methods['addGrade'].cacheSend(
      courseId,
      groupId,
      grade
    );
    console.log(stackId);

    // Add auto-resolve on grade submit
    contract = drizzle.contracts['Tipping'];
    stackId = contract.methods['resolve'].cacheSend(
      courseId,
      groupId
    );
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
            <Button onClick={() => this.handleSubmit(drizzleContext.drizzle)}>
              Submit and Resolve
            </Button>
          </form>
        )}
      </DrizzleContext.Consumer>
    );
  }
}

export default AdminForm;
