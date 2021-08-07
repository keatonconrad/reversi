<template>
  <div id="app">
    <canvas id="confetti"></canvas>
    <Board @confetti="renderConfetti" />
  </div>
</template>

<script>
import Board from './components/Board.vue'
import ConfettiGenerator from 'confetti-js';

export default {
  name: 'App',
  components: {
    Board
  },
  methods: {
    renderConfetti() {
      var confettiSettings = {
        'target': 'confetti',
        'max': '300',
        'size': '1',
        'animate': true,
        'props': ['square','triangle','line'],
        'colors': [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
        'clock': '25',
        'rotate': true,
        'respawn': false
      };
      var confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#confetti {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
