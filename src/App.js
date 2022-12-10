import './App.css';
import lottery from './lottery';
import { Component } from 'react';
import web3 from './web3';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    // no need to specify address in this call
    // as the provider from metamask's web3 already has the account address
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance })
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'waiting for transaction...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({  message: 'you have been entered!'});

  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'waiting for transaction...'});

    await lottery.methods.pickWinner().send({from: accounts[0]})

    this.setState({ message: 'a winner has been picked'});
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          this contract is managed by {this.state.manager}. There are {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether
        </p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value})}
            />
            <button>Enter</button>
          </div>
        </form>

        <hr/>

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr/>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
