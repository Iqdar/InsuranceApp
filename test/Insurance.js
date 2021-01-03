const Insurance = artifacts.require("./Insurance.sol")

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Insurance', ([user, insuranceTaker]) => {
	let insurance

	before(async () => {
    	insurance = await Insurance.deployed()
	})

	describe('deployment' , async () => {
		it('deploys successfully' , async () => {
			insurance = await Insurance.deployed()
			const address = await insurance.address
			assert.notEqual(address , 0x0)
			assert.notEqual(address , '')
			assert.notEqual(address , null)
			assert.notEqual(address , undefined)
		})
	})

	describe('posts', async () => {
		let result, insuranceTakersCount
		it('create posts', async () => {
			result = await insurance.addInsuranceTaker('Iqdar', '0335-2408742','ACF-212','TOYOTA COROLLA Garande')
			insuranceTakersCount = await insurance.insuranceTakerCount()
			assert.equal(insuranceTakersCount, 1)
			const event = result.logs[0].args
	    	assert.equal(event.id.toNumber(), insuranceTakersCount.toNumber(), 'id is correct')
	    	assert.equal(event.name, 'Iqdar', 'name is correct')
	    	assert.equal(event.contact, '0335-2408742', 'contact is correct')
		    assert.equal(event.carId, 'ACF-212', 'Car ID is correct')
		    assert.equal(event.carName, 'TOYOTA COROLLA Garande', 'Car Name is correct')
		    assert.equal(event.user, user, 'Address is correct')

		    await insurance.addInsuranceTaker('',{from:user}).should.be.rejected;
		})
	})
})