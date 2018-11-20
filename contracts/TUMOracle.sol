pragma solidity ^0.4.18;

contract TUMOracle {

  //struct TutoringGroup {
  //  string courseId;
  //  uint8 groupId;
  //}

  address public owner;

  // Solidity does not support floats, uint value is avg grade * 10 
  mapping(string => mapping(uint8 => uint8)) grades;

  constructor () public {
    owner = msg.sender;
  }

  function addGrade(string courseId, uint8 groupId, uint8 grade) public {
    require(msg.sender == owner);
    require(grade >= 10 && grade <= 50);
    grades[courseId][groupId] = grade;
  }

  function getGrade(string courseId, uint8 groupId) public view returns (uint8) {
    uint8 grade = grades[courseId][groupId];
    require(grade > 0);
    return grade;
  }

}
