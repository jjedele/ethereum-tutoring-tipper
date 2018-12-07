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
        uint32 tutorGroupId; // ID for specific TG
        uint8 gradeGoal; // grade threshold

        uint numStudents; // index/number of students who funded the group
        uint amount; // total amount of funding
        bool resolved; // each tutor group can only be PAID/RESOLVED once.

        mapping (uint => Student) numStudentToStudent; // maps the index of funder to Student
    }

    // State variable for numGroups - will also be tutorGroupId
    uint32 numGroups;
    
    // interface for the grade results
    address tumOracle;

    // Mapping for TutorGroup datatypes
    mapping (uint => TutorGroup) tutorGroupIdToTutorGroup;

    event PayedIn(uint32 tutorGroupId, uint newTotal);

    // Creates a tutorGroup
    function newTutorGroup(address _tutor, string _courseId, uint8 _groupdId, uint8 _gradeGoal) public returns (uint32) {
        uint32 tutorGroupId = numGroups++;
        TutorGroup storage t = tutorGroupIdToTutorGroup[tutorGroupId];
        // populate TutorGroup object
        t.tutor = _tutor;
        t.courseId = _courseId;
        t.groupId = _groupdId;
        t.gradeGoal = _gradeGoal;
        t.resolved = false;
        return (tutorGroupId);
    }

    function payIn(uint32 _tutorGroupId) public payable {
        TutorGroup storage t = tutorGroupIdToTutorGroup[_tutorGroupId];
        Student storage s = t.numStudentToStudent[t.numStudents++];
        s.addr = msg.sender;
        s.amount = msg.value;
        t.amount += s.amount;
        emit PayedIn(_tutorGroupId, t.amount);
    }

    function resolve(uint32 _tutorGroupId) public { // possible change modifier to something more restrictive
        TutorGroup storage t = tutorGroupIdToTutorGroup[_tutorGroupId];
        require (
            t.resolved == false,
            "Group already resolved"    
        );

        TUMOracle oracle = TUMOracle(tumOracle);
        uint8 grade = oracle.getGrade(t.courseId, t.groupId);
        if (grade <= t.gradeGoal) {
            t.tutor.transfer(t.amount); // send the money to tutor
        } else {
            for (uint i = 0; i < t.numStudents; i++) {
                Student storage s = t.numStudentToStudent[i];
                s.addr.transfer(s.amount);
            }
        }

        t.resolved = true; // paid 
    }

}