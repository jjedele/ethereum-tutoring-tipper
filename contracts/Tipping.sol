pragma solidity ^0.4.18;

import "./TUMOracle.sol";

contract Tipping {
  
    // interface for the grade results
    address tumOracle;
    uint8 public tgNum; // iteration over groups 1/3

    mapping(string => mapping(uint8 => TutorGroup)) tutorGroups;
    mapping(uint8 => TutorGroup) tgNumToTg; // iteration over groups 2/3
    
    constructor (address _tumOracle) public {
        tumOracle = _tumOracle;
        tgNum = 0;
    }

    struct Contribution {
        address addr; // address of funder/student
        uint amount; // amount contributed
    }

    struct TutorGroup {
        address tutor; // address to be paid out
        uint8 gradeGoal; // grade threshold

        uint amount; // total amount of funding

        uint8 nContributions;
        mapping(uint8 => Contribution) contributions;

        bool resolved; // each tutor group can only be PAID/RESOLVED once.
    }

    event PayedIn(string course, uint8 group, uint newTotal);

    function getTgNum() public view returns(uint8) {
        return tgNum;
    }

    function newTutorGroup(address _tutor, string _course, uint8 _group, uint8 _gradeGoal) public {
        TutorGroup storage tg = tutorGroups[_course][_group];
        tgNumToTg[tgNum++] = tg; // iteration over groups 3/3
	    // TODO check that not exist
        tg.tutor = _tutor;
        tg.gradeGoal = _gradeGoal;
        tg.amount = 0;
        tg.nContributions = 0;
        tg.resolved = false;
    }

    function payIn(string _course, uint8 _group) public payable {
        TutorGroup storage t = tutorGroups[_course][_group];
        Contribution storage c = t.contributions[t.nContributions++];
        c.addr = msg.sender;
        c.amount = msg.value;
        t.amount += c.amount;
        emit PayedIn(_course, _group, t.amount);
    }

    function resolve(string _course, uint8 _group) public {
        TutorGroup storage t = tutorGroups[_course][_group];
        require (
            t.resolved == false,
            "Group already resolved"    
        );

        TUMOracle oracle = TUMOracle(tumOracle);
        uint8 grade = oracle.getGrade(_course, _group);
        if (grade <= t.gradeGoal) {
            t.tutor.transfer(t.amount); // send the money to tutor
        } else {
            for (uint8 i = 0; i < t.nContributions; i++) {
                Contribution storage s = t.contributions[i];
                s.addr.transfer(s.amount);
            }
        }

        t.resolved = true; // paid 
    }

}
