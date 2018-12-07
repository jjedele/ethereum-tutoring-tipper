pragma solidity ^0.4.18;

import "./TUMOracle.sol";

contract Tipping {

    constructor (address _tumOracle) public {
        tumOracle = _tumOracle;
    }

    struct Student {
        address addr; // address of funder/student
        uint amount; // amount contributed
    }

    struct TutorGroup {
        address tutor; // address to be paid out
        string courseId; // property of the actual group
        uint8 groupId; // property of the actual group
        uint8 tutorGroupId; // ID for specific TG
        uint8 gradeGoal; // grade threshold

        uint numStudents; // index/number of students who funded the group
        uint amount; // total amount of funding

        mapping (uint => Student) numStudentToStudent; // maps the index of funder to Student
    }

    // State variable for numGroups - will also be tutorGroupId
    uint numGroups;
    
    // interface for the grade results
    address tumOracle;

    // Mapping for TutorGroup datatypes
    mapping (uint => TutorGroup) tutorGroupIdToTutorGroup;

    // Creates a tutorGroup
    function newTutorGroup(address _tutor, string _courseId, uint8 _groupdId, uint8 _gradeGoal) public {
        tutorGroupId = numGroups++;
        TutorGroup t = tutorGroupIdToTutorGroup[tutorGroupId];
        // populate TutorGroup object
        t.tumContract = _tumContract;
        t.tutor = _tutor;
        t.courseId = _courseId;
        t.groupId = _groupdId;
        t.gradeGoal = _gradeGoal;
    }

    function payIn(uint8 _tutorGroupId) public payable {
        TutorGroup t = tutorGroupIdToTutorGroup[_tutorGroupId];
        Student s = t.numStudentToStudent[t.numStudents++];
        s.addr = msg.sender;
        s.amount = msg.value;
        t.amount += s.amount;
    }


}