var TUMOracle = artifacts.require('./TUMOracle.sol')
var Tipper = artifacts.require('./Tipping.sol')

contract('Tipping', accounts => {

    it('it should return tutorgroupId and amount after creating and paying in to a group', () => {
	return Tipper.deployed()
	    .then(async instance => {
        let tutor = accounts[0]
        let tutorGroupId = await instance.newTutorGroup(tutor, 'maths101', 1, 17)
        console.log(tutorGroupId)
        let student1 = accounts[1];web3.toWei(1, 'ether')
        let amount = web3.toWei(1, 'ether')
        let result = await instance.payIn(0, {from: student1, value: amount})
        console.log('%j', result)
        return {instance: instance, args: {tutorGroupId: tutorGroupId, newTotal: amount}}
	    })//.then((args) => utils.assertEvent(args.instance, { event: "PayedIn", logIndex: 1, args: args.args }));

    })

})