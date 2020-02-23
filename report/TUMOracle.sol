pragma solidity ^0.4.18;

contract TUMOracle {

  address public owner;

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
