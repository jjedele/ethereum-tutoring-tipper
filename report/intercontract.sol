import "./TUMOracle.sol";

contract Tipping {
  
    // interface for the grade results
    address tumOracle;

    constructor (address _tumOracle) public {
        tumOracle = _tumOracle;
    }

    function resolve(string _course, uint8 _group) public {
        TutorGroup storage t = tutorGroups[_course][_group];
        TUMOracle oracle = TUMOracle(tumOracle);
        uint8 grade = oracle.getGrade(_course, _group);
        if (grade <= t.gradeGoal) {
        ...
    }
}
