# Настройка module SCSS
##### Источник1 (не помог): https://medium.com/@ryoldash/customize-webpack-config-of-react-app-created-with-create-react-app-7a78c7849edc
##### Источник2 (ПОМОГ): https://stackoverflow.com/questions/50747062/load-css-module-in-reactjs-typescript-and-react-rewired

## 1. install packages
##### npm i -D react-app-rewired
##### npm i -D codebandits/react-app-rewire-css-modules sass-loader node-sass
## 2. add config-overrides.js:
```
const rewireCssModules = require('react-app-rewire-css-modules');
module.exports = function override(config, env){
    config = rewireCssModules(config, env);
    return config;
};
```
### 3. add global.d.ts:
```
declare module '*.css'
declare module '*.scss'
```
### 4. modification in package.json file in “scripts” section:
```
// package.json
"scripts": {
 -   "start":"react-scripts-ts start",
 +   "start": "react-app-rewired start --scripts-version react-scripts-ts",
 -   "build" "react-scripts-ts build",
 +   "build": "react-app-rewired build --scripts-version react-scripts-ts",
 -   "test": "react-scripts-ts test --env=jsdom",
 +   "test": "react-app-rewired test --env=jsdom --scripts-version react-scripts-ts",
     "eject": "react-scripts-ts eject"
  }
```


