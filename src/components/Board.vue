<template>
  <div id="board">
    <h1>Welcome to Reversi</h1>
    <div id="main-board">
      <table>
        <tr v-for="(row, rowIndex) in board" :key="rowIndex">
          <td v-for="(square, sqIndex) in row" :key="sqIndex" @click="clickedCell(rowIndex, sqIndex)">
            {{ square }}
          </td>
        </tr>
      </table>
    </div>
    <p>It's {{ turn }}'s turn.</p>
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
      }
    }
  },
  created () {
    this.board = this.makeBoardOfSize(8, 8);
  },
  methods: {
    changeTurn() {
      this.turn == 'black' ? this.turn = 'white' : this.turn = 'black';
    },
    clickedCell(rowIndex, sqIndex) {
      if (this.board[rowIndex][sqIndex] === 'x') {
        this.turn == 'black' ? this.board[rowIndex][sqIndex] = 0 : this.board[rowIndex][sqIndex] = 1;
        this.updateScores();
        this.changeTurn();
      }
    },
    updateScores() {
      let flattened = this.board.flat();
      let blackScore = 0;
      let whiteScore = 0;
      for (var cell of flattened) {
        if (cell !== 'x') {
          cell === 0 ? blackScore++ : whiteScore++;
        }
      }
      this.scores.black = blackScore;
      this.scores.white = whiteScore;
    },
    makeBoardOfSize(rows, cols) {
      let board = Array(rows).fill().map(() => Array(cols).fill('x'));
      return board;
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

table {
  margin: 0 auto;
  width: 20%;
  font-weight: bold;
}
</style>
