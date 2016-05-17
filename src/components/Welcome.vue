<template>
  <div id="game_intro">
    <h1 class="game-name">是香蕉<br>還是太陽花?</h1>
    <img src="../assets/cover.png">
    <p>點擊按鈕或使用鍵盤方向鍵控制，空白鍵為重新開始。</p>
    <button @click="startGame" class="game-start-btn btn">開始遊戲</button>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  methods: {
    startGame() {
      this.$dispatch('startGame');
    }
  }
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "bourbon"
@import "../stylesheets/variables"
@import "../stylesheets/common"

#game_intro
  text-align: center

.game-name
  margin: 0
  padding: 0
  font-size: 3rem
  font-weight: normal
  color: $yellowColor
  line-height: 1.2

.game-start-btn
  padding: 5px 20px
  font-size: 2rem
  background-color: $greenColor
  color: $whiteColor

</style>
