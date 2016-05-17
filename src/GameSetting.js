import Vue from 'vue';

export default {
  appId: '1414473062148592',
  appUrl: 'https://tap-game.json.tw/',
  maxItemsAmount: 30,
  scoreIncrement: 5,
  scoreDecrement: 5,
  gameDuration: 30,
  timerInterval: 500,
  comments: [
    { score: 100, text: '香蕉、太陽花傻傻分不清楚' },
    { score: 280, text: '你有基本的香蕉、太陽花辨識能力' },
    { score: 500, text: '辨別香蕉、太陽花已成為你的反射動作' },
    { score: Infinity, text: '很會寫程式？' }
  ],
  keyCodes: Vue.directive('on').keyCodes
};
