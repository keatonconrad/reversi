<template>
  <div id="board">
    <h1>Welcome to Reversi</h1>
    <div id="main-board">
      <table>
        <tr v-for="(row, rowIndex) in board" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex" @click="clickedCell(rowIndex, cellIndex)">
            <div class="circle" :class="{ black: cell === 0, white: cell === 1, hide: cell === null}"></div>
          </td>
        </tr>
      </table>
    </div>
    <p>It's {{ turn }}'s turn.</p>
    <p v-if="gameOver">Game over! The winner is <strong>{{ currentWinner }}</strong>!</p>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      board: undefined,
      turn: 'black',
      scores: {
        'black': 0,
        'white': 0
      },
      turnCount: 0,
      gameOver: false,
      totalCells: undefined
    }
  },
  created () {
    this.board = this.makeBoardOfSize(8, 8);
    this.totalCells = this.board.length * this.board[0].length;
  },
  computed: {
    currentWinner() {
      return Object.keys(this.scores).reduce((a, b) => this.scores[a] > this.scores[b] ? a : b);
    },
  },
  methods: {
    changeTurn() {
      this.turn == 'black' ? this.turn = 'white' : this.turn = 'black';
    },
    clickedCell(rowIndex, cellIndex) {
      if (this.board[rowIndex][cellIndex] === null) {
        this.turn == 'black' ? this.board[rowIndex][cellIndex] = 0 : this.board[rowIndex][cellIndex] = 1;
        this.turnCount++;
        this.updateScores();
        if (this.turnCount >= this.totalCells) {
          this.gameOver = true;
          return;
        }
        this.changeTurn();
      }
    },
    updateScores() {
      let flattened = this.board.flat();
      let blackScore = 0;
      let whiteScore = 0;
      for (var cell of flattened) {
        if (cell !== null) {
          cell === 0 ? blackScore++ : whiteScore++;
        }
      }
      this.scores.black = blackScore;
      this.scores.white = whiteScore;
    },
    makeBoardOfSize(rows, cols) {
      let board = Array(rows).fill().map(() => Array(cols).fill(null));
      return board;
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
p {
  margin-top: 3em;
}
table {
  margin: 0 auto;
  font-weight: bold;
  background-color: #ccc;
}
td {
  border: 1px solid white;
  width: 2em;
  height: 2em;
  padding: 0.5em;
}
table td .circle {
  width: 2em;
  height: 2em;
  border-radius: 2em;
  background-color: #ccc;
}
.circle.black {
  background-color: black;
}
.circle.white {
  background-color: white;
}
.circle.hide {
  display: none;
}
</style>
