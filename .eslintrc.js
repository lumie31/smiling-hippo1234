module.exports = {
  env: ["eslint:recommended", "plugin:vue/essential", "@vue/prettier"],

  extends: [
    "plugin:vue/essential",
    "plugin:prettier/recommended",
    "eslint:recommended"
  ],

  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module"
  },

  plugins: ["vue"],

  rules: {},

  root: true,

  env: {
    browser: true,
    es2020: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    parser: "babel-eslint"
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
