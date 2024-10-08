module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off", // 禁止接口名称必须以 I 开头
    "@typescript-eslint/explicit-function-return-type": "off", // 禁止函数必须显式返回类型
    "@typescript-eslint/explicit-module-boundary-types": "off", // 禁止模块必须显式返回类型
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
  },
};
