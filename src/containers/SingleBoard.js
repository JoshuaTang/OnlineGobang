import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Board from './Board';
import {sideWon} from '../actions/index';
import {GRID_WIDTH, CELL_WIDTH} from '../constants/Grid';

class SingleBoard extends Board {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  nextAIStep() {
    let myScore = [];
    let computerScore = [];
    let maxScore = 0;
    let x = 0, y = 0;
    for (let i = 0; i < GRID_WIDTH; i++) {
      myScore[i] = [];
      computerScore[i] = [];
      for (let j = 0; j < GRID_WIDTH; j++) {
        myScore[i][j] = 0;
        computerScore[i][j] = 0;
      }
    }
    for (let i = 0; i < GRID_WIDTH; i++) {
      for (let j = 0; j < GRID_WIDTH; j++) {
        if (this.chessBoard[i][j] === 0) {
          for (let k = 0; k < this.count; k++) {
            if (this.wins[i][j][k]) {
              if (this.myWin[k] === 1) {
                myScore[i][j] += 200;
              } else if (this.myWin[k] === 2) {
                myScore[i][j] += 400;
              } else if (this.myWin[k] === 3) {
                myScore[i][j] += 2000;
              } else if (this.myWin[k] === 4) {
                myScore[i][j] += 10000;
              }

              // Please note that here, the scores determined for otherWin are
              // higher than those of myWin.
              if (this.otherWin[k] === 1) {
                computerScore[i][j] += 220;
              } else if (this.otherWin[k] === 2) {
                computerScore[i][j] += 420;
              } else if (this.otherWin[k] === 3) {
                computerScore[i][j] += 2100;
              } else if (this.otherWin[k] === 4) {
                computerScore[i][j] += 20000;
              }
            }
          }

          // Try to find the position of highest score

          if (myScore[i][j] > maxScore) {
            maxScore = myScore[i][j];
            x = i;
            y = j;
          } else if (myScore[i][j] === maxScore) {
            if (computerScore[i][j] > computerScore[x][y]) {
              x = i;
              y = j;
            }
          }
          if (computerScore[i][j] > maxScore) {
            maxScore = computerScore[i][j];
            x = i;
            y = j;
          } else if (computerScore[i][j] === maxScore) {
            if (myScore[i][j] > myScore[x][y]) {
              x = i;
              y = j;
            }
          }
        }
      }
    }

    return [x, y];
  }

  computerAI() {
    let [x, y] = this.nextAIStep();
    this.drawPiece(x, y, false);
    this.chessBoard[x][y] = 2;
    for (let k = 0; k < this.count; k++) {
      if (this.wins[x][y][k]) {
        this.otherWin[k]++;
        this.myWin[k] = 6;
        if (this.otherWin[k] === 5) {
          this.props.sideWon('White', false);
          this.gameOver = true;
        }
      }
    }
    if (!this.gameOver) {
      this.myTurn = !this.myTurn;
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.gameOver || !this.myTurn) {
      return;
    }
    console.log(e.nativeEvent.offsetX);
    let i = Math.floor(e.nativeEvent.offsetX / CELL_WIDTH);
    let j = Math.floor(e.nativeEvent.offsetY / CELL_WIDTH);

    if (this.chessBoard[i][j] === 0) {
      this.drawPiece(i, j, true);
      this.chessBoard[i][j] = 1;
      for (let k = 0; k < this.count; k++) {
        if (this.wins[i][j][k]) {
          this.myWin[k]++;
          this.otherWin[k] = 6;  // I add a piece to this position, so computer can never win here.
          if (this.myWin[k] === 5) {
            this.props.sideWon('Black', true);
            this.gameOver = true;
          }
        }
      }

      if (!this.gameOver) {
        this.myTurn = !this.myTurn;
        this.computerAI();
      }
    }
  }

  render() {
    return (
      <Board onClick={ this.handleClick }/>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.mode
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sideWon
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard);
