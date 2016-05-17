module.exports = {
  root: true,
  extends: 'airbnb/base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {

    'no-unused-vars': 0,
    'comma-dangle': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
