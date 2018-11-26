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
	
	it('should allow TUM to overwrite a grade for a course if a grade already exists', () => {
	return TUMOracle.deployed()
		.then(async instance => {
		let owner = await instance.owner()
		await instance.addGrade('phil202', 2, 28, {from: owner})
		let originalGrade = await instance.getGrade('phil202', 2, {from: owner})
		await instance.addGrade('phil202', 2, 39, {from: owner})
		let newGrade = await instance.getGrade('phil202', 2, {from: owner})
		// compare first and second grades added
		assert.notEqual(originalGrade, newGrade)
		// make sure second grade added is correct
		assert.equal(newGrade, 39)
		})
	})

})
