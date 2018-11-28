pragma solidity ^0.4.18;

import "./TUMOracle.sol"; // maybe this is not correct, should call from address instead of import

// NOTES: a student can be in multiple courses but only one group per course.
//mapping (uint8 => mapping(string => uint8)) studentIdToCourseGroup; // [studentId][courseId] -> [groupId]

contract Tipping {

    struct Student {
        string studentName;
        uint8 studentId;
        uint8 courseId;
        uint8 groupId;
        address studentAdd;
    }

    address public owner; // owner is meant to be the tutor
    Student[] studentList; // list of students who have paid in
    mapping (uint => uint8) studentIdToAmount; // student contribution
    mapping (uint8 => mapping (uint8 => uint8)) courseIdGroupIdToPOT; // total in the pot
    uint gradeGoal; // grade threshold for 100% payout - can't use uint8 from global store...

    constructor () public {
        owner = msg.sender;
        goalGrade = 18;
    }

    // allow the tutor to refund everyone
    function refundAll() external {
        require(owner == msg.sender);
    }

    // allows accounts to pay in to the contract
    function payIn(string memory _studentName, uint8 _studentId, uint8 _courseId, uint8 _groupId, address _studentAdd, uint8 _amount) public {
        require(_amount > 0); // must pay in a valid amount
        studentList.push(Student(_studentName, _studentId, _courseId, _groupId, _studentAdd));
        studentIdToAmount[_studentId] = _amount; // add to contribution ledger
        courseIdGroupIdToPot[_couseId][_groupId] += _amount; // add to pot
        // code here for TAKING ether.
    }

    // execute - wait for event msg that grade has
    // been added then pay out the course
    function payOut() internal {
        
    }

    // whatever scaling or payout function related to the 'goalGrade' parameter
    function calcPayoutRatio() internal pure returns (uint) {
        //uint8 actualGrade = TUMOracle.getGrade()
    }


}