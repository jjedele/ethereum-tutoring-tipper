contract Event {

    event AmountIncreased(uint32 tutorGroupId, uint newTotal);

    function payIn(uint32 _tutorGroupId) public payable {
        TutorGroup storage t = tutorGroupIdToTutorGroup[_tutorGroupId];
        Student storage s = t.numStudentToStudent[t.numStudents++];
        s.addr = msg.sender;
        s.amount = msg.value;
        t.amount += s.amount;
        emit AmountIncreased(_tutorGroupId, t.amount);
    }

}
