import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar'
import InsuranceTakersTable from './InsuranceTakersTable'
import Insurance from '../abis/Insurance.json'
import InsuranceTakerForm from './InsuranceTakerForm';
import Homepage from './Homepage.js'
import InsuranceTakerCards from './InsuranceTakerCards';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      const handle = this.props.match.params;
      
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Insurance.networks[networkId]
    if(networkData){
      const insurance = web3.eth.Contract(Insurance.abi, networkData.address)
      this.setState({ insurance })
      const accountId = await insurance.methods.addresses(this.state.account).call()
      const user = await insurance.methods.insuranceTakers(accountId).call()
      const userName = user.name;
      this.setState({accountUser : userName})
      console.log(accountId)
      console.log(userName)
      console.log(this.state.account)
      if(this.state.account==='0x934f333E1105771537570Be602FC65C2DA6048D1'){
        const insurance = web3.eth.Contract(Insurance.abi, networkData.address)
        this.setState({ insurance })
        const insuranceTakersCount = await insurance.methods.insuranceTakerCount().call()
        this.setState({insuranceTakersCount})
        for (var i = 1; i <= insuranceTakersCount; i++) {
          const insuranceTaker = await insurance.methods.insuranceTakers(i).call()
          this.setState({
            insuranceTakers: [...this.state.insuranceTakers, insuranceTaker]
          })
        }
        this.setState({loading:false})
      }

      else if(this.state.account==='0x78Ad9b1d59cFA40BcaB15B3DBd41Fd2f58187977'){
        const insurance = web3.eth.Contract(Insurance.abi, networkData.address)
        this.setState({ insurance })
        const insuranceTakersCount = await insurance.methods.insuranceTakerCount().call()
        this.setState({insuranceTakersCount})
        for (var i = 1; i <= insuranceTakersCount; i++) {
          const insuranceTaker = await insurance.methods.insuranceTakers(i).call()
          this.setState({
            insuranceTakers: [...this.state.insuranceTakers, insuranceTaker]
          })
          const totalClaims = insuranceTaker.transactions;
          for(var j = 1; j <= totalClaims; j++){
            const claim = await insurance.methods.claims(i,j).call()
            this.setState({claims: [...this.state.claims, claim]})
          }
        }
        this.setState({loading:false})
        console.log(this.state.claims)
      }

      else if(this.state.accountUser!==''){
        const insurance = web3.eth.Contract(Insurance.abi, networkData.address)
        this.setState({ insurance })
        const insuranceTakerIdCheck = await insurance.methods.addresses(this.state.account).call()
        console.log(insuranceTakerIdCheck)
        const userId = window.web3.utils.hexToNumberString(insuranceTakerIdCheck)
        console.log(userId)
        const userInsuranceTaker = await insurance.methods.insuranceTakers(userId).call()
        this.setState({userInsuranceTaker})
        const totalClaims = window.web3.utils.hexToNumberString(userInsuranceTaker.transactions);
        for(var j = 1; j <= totalClaims; j++){
          const claim = await insurance.methods.insuranceClaims(userId,j).call()
          this.setState({claims: [...this.state.claims, claim]})
        }
        this.setState({loading:false})
        console.log(userInsuranceTaker)
        console.log(totalClaims)
        console.log(this.state.claims)
      }

      else{
        window.alert("Register Yourself");
      }
    } 
    else{
      window.alert("Insurance contract not deployed to the current network");
    }
  }

  addInsuranceTaker(name,contact,carId,carName,address) {
    this.setState({ loading: true })
    this.state.insurance.methods.addInsuranceTaker(name,contact,carId,carName,address).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      console.log('Success')
      this.setState({ loading: false })
    })
  }

  editInsuranceTaker(id, name, contact, carId, carName, address){
    console.log('app.js')
    this.setState({ loading: true })
    this.state.insurance.methods.editInsuranceTaker(id,name,contact,carId,carName,address).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      console.log('Edited')
      this.setState({ loading: false })
    })
  }

  addClaim(location, description, dateTime, lossInjuries){
    this.setState({ loading: true })
    this.state.insurance.methods.addClaim(location,description,dateTime,lossInjuries).send({from: this.state.account})
    .once('receipt', (receipt) => {
      console.log('claim Added')
      this.setState({loading: false })
    })
  }

  banUnban(id, _banUnban){
    this.setState({ loading: true })
    this.state.insurance.methods.banUnban(id,_banUnban).send({from: this.state.account})
    .once('receipt', (receipt) => {
      console.log('done')
      this.setState({loading: false })
    })
  }

  constructor(props){
    super(props)
    this.state = {
      account:'',
      accountUser:'',
      insurance : null,
      insuranceTakersCount : 0,
      insuranceTakers: [],
      userInsuranceTaker:null,
      claims: [],
      loading: true
    }
    this.addInsuranceTaker = this.addInsuranceTaker.bind(this);
    this.editInsuranceTaker = this.editInsuranceTaker.bind(this);
    this.addClaim = this.addClaim.bind(this);
    this.banUnban = this.banUnban.bind(this);
  }

  render() {
    if (this.state.account === '0x934f333E1105771537570Be602FC65C2DA6048D1'){
      return (
        <div>
          <Navbar account={this.state.account} user={'New Registration'} />
          { this.state.loading
            ? <div>
              <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
              </div>
            : 
            <div>
              <InsuranceTakerForm addInsuranceTaker={this.addInsuranceTaker}/>
              <InsuranceTakersTable insuranceTakers={this.state.insuranceTakers} banUnban={this.banUnban} editInsuranceTaker={this.editInsuranceTaker} account={this.state.account}/>
            </div>
          } 
        </div>
      );
    }

    if(this.state.account==='0x78Ad9b1d59cFA40BcaB15B3DBd41Fd2f58187977'){
      return(
        <div>
          <Navbar account={this.state.account} user={'Claim Dealer'}/>
          <p>Claim Registrar</p>
        </div>
      );
    }
    if(this.state.accountUser===''){
      return(
        <div>
        </div>
      );
    }
    console.log(this.state.account)
    return(
      <div>        
        <Homepage Name={this.state.accountUser}/>
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : 
          <div>
            {this.state.userInsuranceTaker.isBanned?
              alert('You are Banned')
            :
              <div>
                <p>&nbsp;</p>
                <InsuranceTakerCards addClaim={this.addClaim} account={this.state.account} claims={this.state.claims}/>
              </div>
            }
            </div>
        } 
      </div>
    );
  }
}

export default App;
