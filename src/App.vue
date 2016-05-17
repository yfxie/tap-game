<template>
  <div id="app" v-bind:class="[blinkClass]">
    <component :is="currentView"></component>
  </div>
</template>

<script>
import Game from './components/Game';
import Welcome from './components/Welcome';

export default {
  name: 'App',
  components: {
    Game,
    Welcome
  },
  data() {
    return {
      blinkClass: '',
      currentView: 'Welcome'
    };
  },
  events: {
    blink(isCorrect) {
      this.blinkClass = isCorrect ? 'correct' : 'incorrect';
      setTimeout(() => { this.blinkClass = ''; }, 300);
    },
    startGame() {
      this.currentView = 'Game';
    }
  }
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "bourbon"
@import "stylesheets/variables"

html
  -ms-touch-action: manipulation
  touch-action: manipulation

html, body
  height: 100%

#app
  background-color: $bgColor
  padding: 15px 0
  height: 100%
  +box-sizing(border-box)
  +display(flex)
  +justify-content(center)
  +align-items(center)
  +transition(background 0.3s ease-out)

  &.correct
    background-color: $greenColor
  &.incorrect
    background-color: $redColor

</style>
