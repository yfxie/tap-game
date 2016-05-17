<template>
  <div v-if="countDown > 0" class="game-countdown-container">
    <div v-for="n in 3" class="game-countdown" v-show="countDown==(n+1)" transition="game-countdown">{{n+1}}</div>
  </div>
  <div id="game_board">
    <div id="game_status_bar">
      <div class="game-score">{{score}}</div>
      <div class="game-time-left">{{timeLeft}}</div>
      <button class="btn game-restart-btn" @click="restart" @keyup.prevent=""><i class="fa fa-refresh"></i></button>
    </div>
    <div id="game_queue">
      <item v-for="item in items" :name="item.name" :line-number="item.lineNumber" transition="game-item"></item>
    </div>
    <div id="game_control_panel">
      <button class="btn game-control-btn" @click="answer('banana')" @keyup.prevent="">香蕉</button>
      <button class="btn game-control-btn" @click="answer('flower')" @keyup.prevent="">太陽花</button>
    </div>
    <result v-if="isGameOver" :score="score" :restart="restart"></result>
  </div>
</template>

<script>
import Item from './Item';
import Result from './Result';
import GameSetting from '../GameSetting';
export default {
  name: 'Game',
  components: {
    Item,
    Result
  },
  data() {
    return {
      countDown: null,
      items: [],
      score: 0,
      timeLeft: GameSetting.gameDuration,
      isPlaying: false,
      isGameOver: false,
      timer: null,
      countDownTimer: null
    };
  },
  created() {
    this.prepareItems();
    this.start();
    window.addEventListener('keydown', this._keydownHandler);
  },
  methods: {
    gameOver() {
      clearInterval(this.timer);
      this.isPlaying = false;
      this.isGameOver = true;
      this.$dispatch('gameOver');
    },
    start() {
      this.countDown = 4;
      clearInterval(this.countDownTimer);
      this.countDownTimer = setInterval(() => {
        this.countDown -= 1;
        if (this.countDown === 0) {
          this.isPlaying = true;
          this.timer = setInterval(this.update, GameSetting.timerInterval);
          clearInterval(this.countDownTimer);
        }
      }, 1000);
    },
    prepareItems() {
      for (let i = 0; i < GameSetting.maxItemsAmount; i++) {
        this._addRandomItem();
      }
    },
    reset() {
      clearInterval(this.timer);
      this.score = 0;
      this.timeLeft = GameSetting.gameDuration;
      this.items = [];
      this.isGameOver = false;
      this.countDown = null;
      this.prepareItems();
    },
    restart() {
      this.reset();
      this.start();
    },
    update() {
      this.timeLeft -= 1;
      if (this.timeLeft === 0) {
        this.gameOver();
      }
    },
    answer(itemName) {
      if (!this.isPlaying) {
        return;
      }

      const item = this._shift();
      const isCorrect = item.name === itemName;

      if (isCorrect) {
        this.score += GameSetting.scoreIncrement;
      } else {
        this.score -= GameSetting.scoreDecrement;
      }

      this.$dispatch('blink', isCorrect);
      this._addRandomItem();
    },
    _shift() {
      return this.items.shift();
    },
    _addRandomItem() {
      const lineNumber = Math.ceil(Math.random() * 3);
      const name = Math.random() > 0.5 ? 'banana' : 'flower';
      const item = { name, lineNumber };
      this.items.push(item);
    },
    _keydownHandler(e) {
      const keyCode = e.which;
      if (keyCode === GameSetting.keyCodes.left) {
        this.answer('banana');
      } else if (keyCode === GameSetting.keyCodes.right) {
        this.answer('flower');
      } else if (keyCode === GameSetting.keyCodes.space) {
        this.restart();
      }
    }
  }
};
</script>
<style lang="sass" rel="stylesheet/sass">
@import "bourbon"
@import "../stylesheets/variables"

#game_board
  width: $boardWidth
  height: 100%
  +display(flex)
  +flex-direction(column)

#game_status_bar
  font-size: 2.5rem
  line-height: 3.5rem
  text-align: center
  +display(flex)
  +flex-flow(row wrap)
  +align-items(center)

  .game-score
    text-align: center
    width: 40%
    background-color: $yellowColor
    color: $whiteColor
    border-radius: 6px

  .game-time-left, .game-restart-btn
    background-color: $darkGreyColor
    color: $whiteColor
    border-radius: 6px
    width: 20%

  .game-time-left
    margin: 0 10px 0 auto

  .game-restart-btn
    padding: 0

#game_queue
  margin: 10px 0
  position: relative
  border-radius: 3px
  background-color: rgba(255,255,255,.6)
  overflow: hidden
  +flex(1)

  @for $i from 1 through 30
    .game-item:nth-child(#{$i})
      bottom: $itemDimension * ($i - 1)

#game_control_panel
  +display(flex)
  +flex-flow(row wrap)
  +justify-content(space-between)

.game-control-btn
  font-size: 1.5rem
  padding: 10px 20px
  background-color: $yellowColor
  color: $whiteColor
  width: 48%


.game-countdown-container
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 1000
  pointer-events: none
  background-color: rgba(255,255,255,.8)
  -webkit-backdrop-filter: saturate(150%) blur(10px)
  font-size: 5rem
  color: $greenColor

.game-countdown
  position: absolute
  top: 50%
  left: 50%
  line-height: 100px
  margin-top: -50px
  margin-left: -50px
  text-align: center
  +size(100px)

.game-countdown-transition
  +transform(scale(10))
  +transition(all .5s)

  @media (max-width: 767px)
    +transform(scale(5))

.game-countdown-enter
  opacity: 0
  +transform(scale(100))

.game-countdown-leave
  opacity: 0
  +transform(translateY(-200%))

</style>
