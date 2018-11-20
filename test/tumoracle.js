var TUMOracle = artifacts.require('./TUMOracle.sol')

contract('TUMOracle', accounts => {

    it('should allow TUM to add a grade for a course', () => {
	return TUMOracle.deployed()
	    .then(async instance => {
		let owner = await instance.owner()
		return instance.addGrade('maths101', 1, 17, {from: owner})
	    }).then(result => {
		assert(result.receipt)
	    })
    })

    it('should prohibit arbitrary accounts to add grades', () => {
	return TUMOracle.deployed()
	    .then(async instance => {
		let owner = await instance.owner()
		let otherAccount = accounts.filter(account => account != owner)[0]
		return instance.addGrade('maths101', 1, 17, {from: otherAccount})
	    }).then(result => {
		assert.fail('Transaction should not succeed.')
	    }).catch(error => {
		assert.include(error.message, 'VM Exception')
	    })
    })

    it('should return stored grades to anyone', () => {
	return TUMOracle.deployed()
	    .then(async instance => {
		let owner = await instance.owner()
		return instance
		    .addGrade('maths101', 1, 17, {from: owner})
		    .then(result => {
			let otherAccount = accounts.filter(account => account != owner)[0]
			return instance.getGrade('maths101', 1, {from: otherAccount})
			    .then(gradeResult => {
				assert.equal(gradeResult.toNumber(), 17)
			    })
		    })
	    })
    })

})
