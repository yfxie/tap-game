<template>
  <div class="game-item game-item-line-1" v-bind:class="classObject">
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    name: String,
    lineNumber: Number
  },
  data() {
    return {
      classObject: {
        [`game-item-${this.name}`]: true,
        [`game-item-line-${this.lineNumber}`]: true
      }
    };
  },
  computed: {
    isBanana() {
      return this.name === 'banana';
    },
    isFlower() {
      return this.name === 'flower';
    }
  }
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "bourbon"
@import "../stylesheets/variables"

.game-item
  background-size: cover
  width: $itemDimension
  height: $itemDimension
  position: absolute

.game-item-banana
  background-image: url(../assets/banana.png)
.game-item-flower
  background-image: url(../assets/flower.png)
.game-item-line-1
  left: $itemGutter
.game-item-line-2
  left: $itemGutter * 3 + $itemDimension
.game-item-line-3
  left: $itemGutter * 5 + $itemDimension * 2

.game-item-transition
  bottom: 1000px
  +transition(opacity .3s linear, bottom .35s ease-out)

.game-item-enter
  opacity: 0

.game-item-leave
  opacity: 0
  bottom: -$itemDimension
  +transition(opacity .1s ease-out, bottom .1s ease-out)

</style>
