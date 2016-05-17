<template>
  <div class="game-result-overlay">
    <div class="game-result-score">{{score}}<span class="game-result-score-unit">分</span></div>
    <div class="game-result-comment">
      {{comment}}
    </div>
    <div class="game-result-actions">
      <button @click="share" class="btn game-share-btn"><i class="fa fa-facebook"></i> 分享測驗結果</button>
      <button @click="restart" class="btn game-result-restart-btn">再玩一次</button>
    </div>
  </div>
</template>

<script>
import GameSetting from '../GameSetting';

export default {
  name: 'Result',
  props: {
    score: Number,
    restart: Function
  },
  computed: {
    comment() {
      const matchedComment = GameSetting.comments.find((comment) => this.score < comment.score);
      return matchedComment.text;
    }
  },
  methods: {
    share() {
      const shareTitle = `${encodeURIComponent(`香蕉與太陽花的測驗分數為：${this.score}分 - ${this.comment}`)}`;
      const shareUrl = `
        http://www.facebook.com/dialog/feed?app_id=${GameSetting.appId}&name=${shareTitle}&link=${GameSetting.appUrl}
      `;
      window.location = shareUrl;
    }
  }
};
</script>

<style lang="sass" rel="stylesheet/sass">
@import "bourbon"
@import "../stylesheets/variables"

.game-result-overlay
  background-color: rgba(0,0,0,.6)
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  +display(flex)
  +align-items(center)
  +justify-content(center)
  +flex-direction(column)
  color: $yellowColor

.game-result-comment
  font-size: 1.5rem
.game-result-score
  font-size: 8rem
.game-result-score-unit
  font-size: .5em

.game-result-actions
  padding: 20px 0

.game-share-btn, .game-result-restart-btn
  font-size: 1.5rem
  padding: 5px 10px
  margin: 0 3px
  color: $whiteColor

.game-share-btn
  background-color: $blueColor

.game-result-restart-btn
  background-color: $greenColor
</style>
