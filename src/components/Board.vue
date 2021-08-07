<template>
  <div id="board">
    <div id="header">
      <button id="play-again-btn" @click="reload">Play Again</button>
      <p>Turn: {{ turnCount }}</p>
    </div>
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
  props: ['size'],
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
    };
  },
  created () {
    this.board = this.makeBoardOfSize(this.size, this.size);
    this.totalCells = this.board.length * this.board[0].length;
  },
  computed: {
    currentWinner () {
      return Object.keys(this.scores).reduce((a, b) => this.scores[a] > this.scores[b] ? a : b);
    }
  },
  methods: {
    reload () {
      window.location.reload();
    },
    changeTurn () {
      this.turn === 'black' ? this.turn = 'white' : this.turn = 'black';
    },
    clickedCell (rowIndex, cellIndex) {
      if (this.board[rowIndex][cellIndex] === null) {
        this.turn === 'black' ? this.board[rowIndex][cellIndex] = 0 : this.board[rowIndex][cellIndex] = 1;
        this.getAffectedCells(rowIndex, cellIndex);
        this.turnCount++;
        this.updateScores();
        if (this.turnCount >= this.totalCells) {
          this.gameOver = true;
          this.$emit('confetti');
          return;
        }
        this.changeTurn();
      }
    },
    updateScores () {
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
    makeBoardOfSize (rows, cols) {
      let board = Array(rows).fill().map(() => Array(cols).fill(null));
      return board;
    },
    getAffectedCells (rowIndex, cellIndex) {
      let allAffectedCells = [];
      let turnInt, i;
      this.turn === 'black' ? turnInt = 0 : turnInt = 1;

      // Right
      /*
      This code block searches for the opposite color to the right, starting at
      the circle that was just placed. It keeps moving to the right until it
      finds the current player's color. If it finds an unplayed cell or reaches
      the edge of the board, before it finds the current player's color, it
      exits and no cells are affected. Otherwise, it will add the affected cells
      to an array to later change their color to the current player's.
      */
      let affectedCells = [];
      for (i = cellIndex; i < this.board.length; i++) {
        let cell = this.board[rowIndex][i];
        if (i === cellIndex) continue;
        if (cell === null || (cell !== turnInt && i === this.board.length - 1)) {
          affectedCells = [];
          break;
        } else if (cell === turnInt) {
          break;
        }
        if (cell !== turnInt) affectedCells.push([rowIndex, i]);
      }
      allAffectedCells = allAffectedCells.concat(affectedCells);

      // Left
      affectedCells = [];
      for (i = cellIndex; i >= 0; i--) {
        let cell = this.board[rowIndex][i];
        if (i === cellIndex) continue;
        if (cell === null || (cell !== turnInt && i === 0)) {
          affectedCells = [];
          break;
        } else if (cell === turnInt) {
          break;
        }
        if (cell !== turnInt) affectedCells.push([rowIndex, i]);
      }
      allAffectedCells = allAffectedCells.concat(affectedCells);

      // Up
      affectedCells = [];
      for (i = rowIndex; i >= 0; i--) {
        let cell = this.board[i][cellIndex];
        if (i === rowIndex) continue;
        if (cell === null || (cell !== turnInt && i === 0)) {
          affectedCells = [];
          break;
        } else if (cell === turnInt) {
          break;
        }
        if (cell !== turnInt) affectedCells.push([i, cellIndex]);
      }
      allAffectedCells = allAffectedCells.concat(affectedCells);

      // Down
      affectedCells = [];
      for (i = rowIndex; i < this.board.length; i++) {
        let cell = this.board[i][cellIndex];
        if (i === rowIndex) continue;
        if (cell === null || (cell !== turnInt && i === this.board.length - 1)) {
          affectedCells = [];
          break;
        } else if (cell === turnInt) {
          break;
        }
        if (cell !== turnInt) affectedCells.push([i, cellIndex]);
      }
      allAffectedCells = allAffectedCells.concat(affectedCells);

      for (let coords of allAffectedCells) {
        // Sets the cell at that coordinate pair to the current player's color
        this.board[coords[0]][coords[1]] = turnInt;
      }

      /*
      // Down & right
      affectedCells = [];
      let j = cellIndex;
      for (i = rowIndex; i < this.board.length; i++) {
        if (i >= this.board.length || j >= this.board.length) break;
        console.log(i + ', ' + j + ' - ' + rowIndex + ', ' + cellIndex);
        let cell = this.board[i][j];
        if (i === rowIndex && j === cellIndex) {
          j++;
          continue;
        };
        if (cell === null || (cell !== turnInt && i === this.board.length - 1 && j === this.board.length - 1)) {
          affectedCells = [];
          break;
        } else if (cell === turnInt) {
          break;
        }
        if (cell !== turnInt) affectedCells.push([i, j]);
        j++;
      }
      allAffectedCells = allAffectedCells.concat(affectedCells);
      */
    }
  }
};
</script>

<style scoped>
#header {
  display: flex;
  width: 30%;
  height: 2em;
  margin: 2em auto;
  line-height: 2em;
}
#header button, #header p {
  width: 50%;
  margin: 0;

}
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
