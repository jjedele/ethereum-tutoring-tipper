const truffleAssert = require('truffle-assertions');

const TUMOracle = artifacts.require('./TUMOracle.sol');
const Tipper = artifacts.require('./Tipping.sol');

contract('Tipping', accounts => {
  it('should handle payments correctly', () => {
    return Tipper.deployed().then(async instance => {
      let tutor = accounts[0];
      let payInTx = await instance.newTutorGroup(tutor, 'maths101', 1, 17);
      let student1 = accounts[1];
      let amount = web3.toWei(1, 'ether');
      let result = await instance.payIn('maths101', 1, { from: student1, value: amount });
      truffleAssert.eventEmitted(result, 'PayedIn', event => {
        return event.newTotal == amount;
      });
    });
  });

  it('should pay the tutor if grade goal is met', async () => {
    let oracle = await TUMOracle.deployed();
    let tipper = await Tipper.deployed();

    let [tutor, student1, student2, student3, ...rest] = accounts;

    // create the tutor group
    let course = 'maths101';
    let group = 1;
    let gradeGoal = 2.0 * 10;
    await tipper.newTutorGroup(tutor, course, group, gradeGoal);

    // let the students pay in
    let tipSize = web3.toWei(1, 'ether');
    await tipper.payIn(course, group, {from: student1, value: tipSize});
    await tipper.payIn(course, group, {from: student2, value: tipSize});
    let result = await tipper.payIn(course, group, {from: student3, value: tipSize});

    // make sure the contract contains all the money
    truffleAssert.eventEmitted(result, 'PayedIn', event => {
      return event.newTotal == tipSize * 3;
    });

    // register the grade
    let achievedGrade = 1.0 * 10;
    await oracle.addGrade(course, group, achievedGrade);

    // resolve the contract
    let balanceBefore = web3.eth.getBalance(tutor);
    await tipper.resolve(course, group);
    let balanceAfter = web3.eth.getBalance(tutor);

    let diff = balanceAfter - balanceBefore;
    // * 0.99 to account for gas cost
    assert(diff >= 3 * tipSize * 0.99);
  });

  it('should refund the students if grade goal is not met', async () => {
    let oracle = await TUMOracle.deployed();
    let tipper = await Tipper.deployed();

    let [tutor, student1, student2, student3, ...rest] = accounts;
    let balancesBefore = {};
    for (let addr of [tutor, student1, student2, student3]) {
      balancesBefore[addr] = web3.fromWei(web3.eth.getBalance(addr), 'ether').toNumber();
    }

    // create the tutor group
    let course = 'maths101';
    let group = 1;
    let gradeGoal = 2.0 * 10;
    await tipper.newTutorGroup(tutor, course, group, gradeGoal);

    // let the students pay in
    let tipSize = web3.toWei(1, 'ether');
    await tipper.payIn(course, group, {from: student1, value: tipSize});
    await tipper.payIn(course, group, {from: student2, value: tipSize});
    let result = await tipper.payIn(course, group, {from: student3, value: tipSize});

    // make sure the contract contains all the money
    truffleAssert.eventEmitted(result, 'PayedIn', event => {
      return event.newTotal == tipSize * 3;
    });

    // register the grade
    let achievedGrade = 3.0 * 10;
    await oracle.addGrade(course, group, achievedGrade);

    // resolve the contract
    await tipper.resolve(course, group);

    // check balances
    let balancesAfter = {};
    for (let addr in balancesBefore) {
      balancesAfter[addr] = web3.fromWei(web3.eth.getBalance(addr), 'ether').toNumber();
    }
    for (let addr in balancesBefore) {
      // account for gas costs
      let diff = Math.abs(balancesBefore[addr] - balancesAfter[addr]);
      assert(diff <= 0.1); 
    }
  });
});
