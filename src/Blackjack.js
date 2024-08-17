import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Hand from './Hand';
import update from 'immutability-helper';
import './Blackjack.css';

class Blackjack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: 'ARE YOU READY?',
      deck_id: '',
      playerHand: [],
      dealerHand: [],
      inProgress: true,
      splitHand: [],
      hasSplit: false,
      activeHand: 'playerHand' 
    };
  }

  
  componentDidMount = () => {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => {
        const newState = {
          deck_id: response.data.deck_id
        };

        this.setState(newState, this.deckHasBeenShuffled);
      });
  }

  deckHasBeenShuffled = () => {
    this.dealInitialCards(2, 'playerHand');
    this.dealInitialCards(2, 'dealerHand');
  }

  dealInitialCards = async (numOfCards, whichHand) => {
    await axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=${numOfCards}`)
      .then(resp => {
        const newState = {
          [whichHand]: resp.data.cards
        };
        this.setState(newState);
      });
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.inProgress) {
      return;
    }

    const playerHandTotal = this.totalHand('playerHand');
    const splitHandTotal = this.totalHand('splitHand');
    const { activeHand, hasSplit } = this.state;

    if (activeHand === 'playerHand' && playerHandTotal > 21 && prevState.activeHand !== 'splitHand') {
      this.setState({
        gameStatus: 'Player Busted!',
        activeHand: hasSplit ? 'splitHand' : activeHand,
        inProgress: hasSplit 
      });
    } else if (activeHand === 'splitHand' && splitHandTotal > 21 && prevState.activeHand !== 'playerHand') {
      this.setState({
        gameStatus: 'Split Hand Busted!',
        inProgress: false
      });
    }
  }

  dealCards = async (numOfCards, whichHand) => {
    if (!this.state.inProgress) {
      return;
    }

    await axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=${numOfCards}`)
      .then(resp => {
        const newState = {
          [whichHand]: update(this.state[whichHand], {
            $push: resp.data.cards
          })
        };
        this.setState(newState);
      });
  }

  hit = () => {
    this.dealCards(1, this.state.activeHand);
  }

  stand = async () => {
    if (this.state.activeHand === 'playerHand' && this.state.hasSplit) {
      this.setState({ activeHand: 'splitHand' });
    } else {
      await this.endGame();
    }
  }

  endGame = async () => {
    while (this.totalHand('dealerHand') < 17) {
      await this.dealCards(1, 'dealerHand');
    }

    const playerTotal = this.totalHand('playerHand');
    const splitTotal = this.state.hasSplit ? this.totalHand('splitHand') : 0;
    const dealerTotal = this.totalHand('dealerHand');

    let gameStatus = '';

    gameStatus += this.getHandResult(playerTotal, dealerTotal, 'Player');

    if (this.state.hasSplit) {
      gameStatus += this.getHandResult(splitTotal, dealerTotal, 'Split Hand');
    }

    this.setState({
      inProgress: false,
      gameStatus: gameStatus
    });
  }

  getHandResult = (handTotal, dealerTotal, handName) => {
    if (handTotal > 21) {
      return `${handName} Busted! `;
    } else if (dealerTotal > 21 || handTotal > dealerTotal) {
      return `${handName} Wins! `;
    } else if (handTotal < dealerTotal) {
      return `Dealer Wins against ${handName}! `;
    } else {
      return `${handName} Ties with Dealer! `;
    }
  }

  split = () => {
    const { playerHand } = this.state;
    const splitCard = playerHand.pop();

    this.setState({
      playerHand: [playerHand[0]],
      splitHand: [splitCard],
      hasSplit: true
    }, () => {
      this.dealCards(1, 'playerHand');
      this.dealCards(1, 'splitHand');
    });
  }

  switchHand = () => {
    this.setState(prevState => ({
      activeHand: prevState.activeHand === 'playerHand' ? 'splitHand' : 'playerHand'
    }));
  }

  canSplit = () => {
    const { playerHand } = this.state;
    return playerHand.length === 2 && playerHand[0].value === playerHand[1].value;
  }

  totalHand = whichHand => {
    let total = 0;
    let acesCount = 0;
    this.state[whichHand].forEach(card => {
      const values = {
        ACE: 11,
        KING: 10,
        QUEEN: 10,
        JACK: 10
      };
      total += (values[card.value] || parseInt(card.value, 10)); 
      if (card.value === 'ACE') acesCount++;
    });
    while (total > 21 && acesCount > 0) {
      total -= 10;
      acesCount--;
    }
    return total;
  }

  get hideButtons() {
    return this.state.inProgress ? '' : 'hidden';
  }

  _newGame = event => {
    document.location.reload();
  }

  renderHand = (hand, handName, totalClass) => {
    const isActive = handName === this.state.activeHand;
    const titleClass = isActive ? 'active-hand-title' : 'inactive-hand-title';

    const title = this.state.activeHand === 'playerHand' ? 
      (handName === 'playerHand' ? 'Your Cards:' : 'Your Split Cards:') :
      (handName === 'playerHand' ? 'Your Split Cards:' : 'Your Cards:');

    return (
      <div className={`hand-container ${isActive ? 'active-hand' : ''}`}>
        <p className={titleClass}>
          {title}
        </p>
        <p className={`${totalClass} ${titleClass}`}>{this.totalHand(handName)}</p>
        <div className={handName}>
          <Hand cards={hand} />
        </div>
        <div className="split-buttons">
          <button
            className={`split ${this.hideButtons}`}
            onClick={this.split}
            disabled={!this.canSplit() || this.state.hasSplit}
          >
            Split
          </button>
          <button
            className={`switchHand ${this.hideButtons}`}
            onClick={this.switchHand}
            disabled={!this.state.hasSplit}
          >
            Switch
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="blackjack-page">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container px-5">
            <a className="navbar-brand" href="index.html">React Blackjack</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link active" to="/blackjack">Play</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <h1 className="top-section"> </h1>
        <div className="center">
          <p className="game-status">{this.state.gameStatus}</p>
        </div>
        <div className="center">
          <button className="reset hidden">Play Again!</button>
        </div>

        <div className="game-area">
        <div className="left">
          <button className={`hit ${this.hideButtons}`} onClick={this.hit}>
            Hit
          </button>
          {this.state.hasSplit ? (
            <>
              {this.state.activeHand === 'playerHand' ? (
                <>
                  {this.renderHand(this.state.playerHand, 'playerHand', 'player-total')}
                  {this.renderHand(this.state.splitHand, 'splitHand', 'split-total')}
                </>
              ) : (
                <>
                  {this.renderHand(this.state.splitHand, 'splitHand', 'split-total')}
                  {this.renderHand(this.state.playerHand, 'playerHand', 'player-total')}
                </>
              )}
            </>
          ) : (
            this.renderHand(this.state.playerHand, 'playerHand', 'player-total')
          )}
          </div>

          <div className="right">
            <button className={`stand ${this.hideButtons}`} onClick={this.stand}>
              Stand
            </button>
            <p className="active-hand-title">Dealer Cards:</p>
            <p className="dealer-total active-hand-title">{this.totalHand('dealerHand')}</p>
            <div className="dealer-hand">
              <Hand cards={this.state.dealerHand} />
            </div>
          </div>
        </div>
        <div className="new-game">
          <button onClick={this._newGame} className="reset">
            New Game
          </button>
          </div>
          </div>
    );
  }
}

export default Blackjack;