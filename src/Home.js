import React, { Component } from 'react';
import './Home.css';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Modal from 'react-modal';

import web3store from "./Web3Store.js";

const contractAddress = "0x8c79ec3f260b067157b0a7db0bb465f90b87f8f1";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customAmount: 5,
      showValueModal: false,
      web3available: typeof web3 !== 'undefined'
    };

    window.addEventListener('load', function() {
      if (typeof web3 !== 'undefined') {
        this.setState({"web3available": true});
      }
    }.bind(this))
  }
  fund(etherAmount) {
    if(etherAmount < 0.01) {
      return this.setState({showValueModal: true});
    }
    let web3 = window.web3;
    web3.eth.getAccounts((error, accounts) => {
      if(accounts.length > 0){
        this.setState({web3available: true});
        const account = accounts[0];

        web3.eth.sendTransaction(
          {"from": account, "to": contractAddress, "value": web3.toWei(etherAmount, "ether")},
          (err, transactionHash) => {
            if(!err) {
              web3store.addTransaction({type: 'stake', hash: transactionHash, mined: false});
            }
          }
        );
      }
      else {
        this.setState({web3available: false});
      }
    });
  }

  handleCustomAmount(e) {
    let value = e.target.value;
    this.setState({customAmount: value});
  }

  noWeb3() {
    if(!this.state.web3available) {
      return <div className="no-web3"><p>To fund StakeTree using the buttons below you need have <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">MetaMask</a> installed. If you have MetaMask installed, try unlocking it before trying again. Otherwise send ether to this address, <code>{contractAddress}</code>, using your preffered wallet.</p></div>;
    }
    return "";
  }

  closeModal() {
    this.setState({showValueModal: false});
  }

  render() {
    const noWeb3 = this.noWeb3();

    const customAmount = this.state.customAmount > 0 ? this.state.customAmount : 10;

    return (
      <div className="container">
        <Modal
          isOpen={this.state.showValueModal}
          className={{
            base: 'modal'
          }}
          onRequestClose={this.closeModal.bind(this)}
        >
          <h2>So sorry!</h2>
          <p>The minimum funding amount is set to 0.01 ether at present. Try a bigger amount.</p>
        </Modal>

        <div className="row content">
          <div className="four columns">
            <div className="featurette">
              <h3>Total Stake (eth): 243456</h3>
              </div>
          </div>

          <div className="four columns">
            <div className="featurette">
            <a href="#Coc">
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>#CoinHODLER Council</button>
            </a>
            </div>
          </div>

          <div className="four columns">
            <div className="featurette">
              <a href="#Profile">
              <button className="btn custom-value-button">My Profile</button>
              </a>
            </div>
          </div>

        </div>

        <hr />
        
        <h4>Projects</h4>

        <div className="row content">
          <div className="four columns">
            <div className="featurette">
              <h4>Dress for Sansa</h4>
              <p>It's her birthday</p>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Fund It!</button>
              <input step="0.1" min="0.01" placeholder="Custom amount?" className="custom-value-input" type="number" onChange={this.handleCustomAmount.bind(this)} />
            </div>
          </div>
          <div className="four columns">
            <div className="featurette">
              <h4>Chain for Drogo</h4>
              <p>A strong chain made of Vellarian Steel is required</p>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Fund It!</button>
              <input step="0.1" min="0.01" placeholder="Custom amount?" className="custom-value-input" type="number" onChange={this.handleCustomAmount.bind(this)} />
            </div>
          </div>
          <div className="four columns">
            <div className="featurette">
              <h4>King's Banquet</h4>
              <p>People wanting to enjoy a recent victory</p>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Fund It!</button>
              <input step="0.1" min="0.01" placeholder="Custom amount?" className="custom-value-input" type="number" onChange={this.handleCustomAmount.bind(this)} />

            </div>
          </div>
        </div>

        <div className="row content">
          <div className="four columns">
            <div className="featurette">
              <h4>Leash for my Reek</h4>
              <p>Don't dare ask why</p>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Fund It!</button>
              <input step="0.1" min="0.01" placeholder="Custom amount?" className="custom-value-input" type="number" onChange={this.handleCustomAmount.bind(this)} />

            </div>
          </div>
          <div className="four columns">
            <div className="featurette">
              <h4>Encyclopaedia for Jon Snow</h4>
              <p>Because we know, he knows nothing</p>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Fund It!</button>
              <input step="0.1" min="0.01" placeholder="Custom amount?" className="custom-value-input" type="number" onChange={this.handleCustomAmount.bind(this)} />

            </div>
          </div>
          <div className="four columns">
            <div className="featurette">
              <h4>Wildfire for Cersie</h4>
              <p>For rapid, unscheduled, disassembly of her Tower</p>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Fund It!</button>
              <input step="0.1" min="0.01" placeholder="Custom amount?" className="custom-value-input" type="number" onChange={this.handleCustomAmount.bind(this)} />

            </div>
          </div>
        </div>

        <hr />

        <a name="Profile">
        <h3>My Profile</h3>
        </a>

        <div className="row content">
          <div className="four columns">
            <div className="featurette">
            <img src={ require('./mimw.jpeg') } />
              </div>
          </div>
          <div className="four columns">
            <div className="featurette">
            <h4>About</h4>
            <Table celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>John of Doe</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Title</Table.Cell>
                  <Table.Cell>Member - Council of #Hodlers</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Balance</Table.Cell>
                  <Table.Cell>700</Table.Cell>
                </Table.Row>
              </Table.Body>
              </Table>
            </div>
          </div>
          <div className="four columns">
            <div className="featurette">
              <h4>Actions</h4>


  <Table celled>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Lend/Borrow</Table.Cell>
        <Table.Cell>Powered by Dharma</Table.Cell>
        <Table.Cell>
        <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>View Orders</button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Complete/Create Tasks</Table.Cell>
        <Table.Cell>powered by Bounties.network</Table.Cell>
        <Table.Cell>
        <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>View tasks</button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Stake to Counil</Table.Cell>
        <Table.Cell>TCR</Table.Cell>
        <Table.Cell>
        <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Stake</button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
    </Table>
              </div>
          </div>
        </div>

      <hr />
      <h3>Council of #HODLERS registry</h3>
      <a name="Coc">
      <div class="three column doubling ui grid">
          <Table celled>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell width={10}>Name</Table.HeaderCell>
            <Table.HeaderCell width={10}>Title</Table.HeaderCell>
            <Table.HeaderCell width={10}>Responsibility</Table.HeaderCell>
            <Table.HeaderCell width={10}>Stake (eth)</Table.HeaderCell>
            <Table.HeaderCell width={10}>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>Cerebrus Snape</Label>
            </Table.Cell>
            <Table.Cell>Grand Master</Table.Cell>
            <Table.Cell>Overall governance</Table.Cell>
            <Table.Cell>5000</Table.Cell>
            <Table.Cell>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Vote</button>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Challenge</button>
              </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>John Doe</Label>
            </Table.Cell>
            <Table.Cell>Master of Coins</Table.Cell>
            <Table.Cell>Monetary policies</Table.Cell>
            <Table.Cell>700</Table.Cell>
            <Table.Cell>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Vote</button>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Challenge</button>
              </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>Brendon Khalifa</Label>
            </Table.Cell>
            <Table.Cell>Master of War</Table.Cell>
            <Table.Cell>Territory attack/defense</Table.Cell>
            <Table.Cell>200</Table.Cell>
            <Table.Cell>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Vote</button>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Challenge</button>
              </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Label ribbon>Electra Flaura</Label>
            </Table.Cell>
            <Table.Cell>Master of Whisperers</Table.Cell>
            <Table.Cell>Spying logistics</Table.Cell>
            <Table.Cell>50</Table.Cell>
            <Table.Cell>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Vote</button>
              <button className="btn custom-value-button" onClick={this.fund.bind(this, customAmount)}>Challenge</button>
              </Table.Cell>
          </Table.Row>

        </Table.Body>
        </Table>
      </div>
    </a>
      </div>

    );
  }
}

export default Home;
