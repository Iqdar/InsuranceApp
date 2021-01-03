pragma solidity >=0.4.21 <0.6.0;

contract Insurance{

	uint public insuranceTakerCount = 0;

	mapping(uint => InsuranceTaker) public insuranceTakers;
	mapping(address => Address) public addresses;
	mapping(uint => mapping(uint => InsuranceClaim)) public insuranceClaims;

	struct InsuranceTaker{
		uint id;
		string name;
		string contact;
		string carId;
		string carName;
		uint transactions;
		bool isBanned;
		address payable user;
	}

	struct Address{
		uint insuranceTakerId;
	}

	struct InsuranceClaim{
		string location;
		string description;
		string dateTime;
		string lossInjuries;
		string status;
		uint amountGiven;
	}

	event dataUploaded(
		uint id,
		string name,
		string contact,
		string carId,
		string carName,
		uint transactions,
		bool isBanned,
		address payable user
	);

	event addressUploaded(
		uint insuranceTakerId
	);

	event claimUploaded(
		string location,
		string description,
		string dateTime,
		string lossInjuries,
		string status,
		uint amountGiven
	);

	function addInsuranceTaker (string memory _name, string memory _contact, string memory _carId, string memory _carName, address _address) public {
		require((bytes(_name).length > 0) && (bytes(_contact).length > 0) && (bytes(_carId).length > 0) && (bytes(_carName).length > 0));
		insuranceTakerCount ++;
		insuranceTakers[insuranceTakerCount] = InsuranceTaker(insuranceTakerCount, _name, _contact, _carId, _carName, 0, false, msg.sender);
		addresses[_address] = Address(insuranceTakerCount);
		emit dataUploaded(insuranceTakerCount, _name, _contact, _carId, _carName, 0, false, msg.sender);
		emit addressUploaded(insuranceTakerCount);
	}

	function editInsuranceTaker (uint _id, string memory _name, string memory _contact, string memory _carId, string memory _carName, address _address) public {
		require((_id>0)&& (bytes(_name).length > 0) && (bytes(_contact).length > 0) && (bytes(_carId).length > 0) && (bytes(_carName).length > 0));
		Address memory _user = addresses[_address];
        uint _userId = _user.insuranceTakerId;
		InsuranceTaker memory _insuranceTaker = insuranceTakers[_id];
		if(_userId!=_id){
			addresses[_address] = Address(_id);
			emit addressUploaded(_id);
		}
		if((compareStrings(_insuranceTaker.name,_name)==false)||(compareStrings(_insuranceTaker.contact,_contact)==false)||(compareStrings(_insuranceTaker.carId,_carId)==false)||(compareStrings(_insuranceTaker.carName,_carName)==false)){
			insuranceTakers[_id] = InsuranceTaker(_id,_name,_contact,_carId,_carName, _insuranceTaker.transactions, _insuranceTaker.isBanned, msg.sender);
			emit dataUploaded(_id,_name,_contact,_carId,_carName, _insuranceTaker.transactions, _insuranceTaker.isBanned, msg.sender);
		}
		insuranceTakers[_id] = InsuranceTaker(insuranceTakerCount, _name, _contact, _carId, _carName, 0, false, msg.sender);
		addresses[_address] = Address(insuranceTakerCount);
		emit dataUploaded(insuranceTakerCount, _name, _contact, _carId, _carName, 0, false, msg.sender);
		emit addressUploaded(insuranceTakerCount);
	}

	function addClaim (string memory _location, string memory _description, string memory _dateTime,string memory _lossInjuries) public {
        require((bytes(_location).length > 0) && (bytes(_description).length > 0) && (bytes(_dateTime).length > 0) && (bytes(_lossInjuries).length > 0));
		Address memory _user = addresses[msg.sender];
        uint _userId = _user.insuranceTakerId;
		InsuranceTaker memory _insuranceTaker = insuranceTakers[_userId];
		uint _claimId = _insuranceTaker.transactions + 1;
		insuranceClaims[_userId][_claimId] = InsuranceClaim(_location,_description,_dateTime,_lossInjuries,"Unsolved",0);
		emit claimUploaded(_location,_description,_dateTime,_lossInjuries,"Unsolved",0);
		_insuranceTaker.transactions = _claimId;
		insuranceTakers[_userId] = _insuranceTaker;
		emit dataUploaded(_insuranceTaker.id, _insuranceTaker.name, _insuranceTaker.contact, _insuranceTaker.carId, _insuranceTaker.carName, _claimId, _insuranceTaker.isBanned, msg.sender);
	}

	function banUnban (uint _userId, bool _banUnban) public {
		require(_userId > 0);
		InsuranceTaker memory _insuranceTaker = insuranceTakers[_userId];
		_insuranceTaker.isBanned = _banUnban;
		insuranceTakers[_userId] = _insuranceTaker;
		emit dataUploaded(_insuranceTaker.id, _insuranceTaker.name, _insuranceTaker.contact, _insuranceTaker.carId, _insuranceTaker.carName, _insuranceTaker.transactions, _banUnban, msg.sender);
	}

	function updateClaim(uint _userId, uint _claimId, string memory _status, uint _amountGiven) public {
		InsuranceClaim memory _insuranceClaim = insuranceClaims[_userId][_claimId];
		_insuranceClaim.status = _status;
		_insuranceClaim.amountGiven = _amountGiven;
		insuranceClaims[_userId][_claimId] = _insuranceClaim;
		emit claimUploaded(_insuranceClaim.location, _insuranceClaim.description, _insuranceClaim.dateTime, _insuranceClaim.lossInjuries, _status, _amountGiven);
	}

	function compareStrings (string memory a, string memory b) public view returns (bool) {
		return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
	}

/*	string public name;

	constructor () public{
		name = "Iqdar";
	}*/
}