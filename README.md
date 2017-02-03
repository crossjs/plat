<p align="center">
  <img src="https://cdn.rawgit.com/crossjs/plato/master/src/assets/logo.svg" alt="PLATO"><br>
  <sub>Based on Vue 2.x</sub>
</p>
<p align="center">
  <a href="https://travis-ci.org/crossjs/plato"><img src="https://img.shields.io/travis/crossjs/plato.svg?style=flat-square" alt="Travis"></a>
  <a href="https://coveralls.io/github/crossjs/plato"><img src="https://img.shields.io/coveralls/crossjs/plato.svg?style=flat-square" alt="Coveralls"></a>
  <a href="https://david-dm.org/crossjs/plato"><img src="https://img.shields.io/david/crossjs/plato.svg?style=flat-square" alt="dependencies Status"></a>
  <a href="https://david-dm.org/crossjs/plato?type=dev"><img src="https://img.shields.io/david/dev/crossjs/plato.svg?style=flat-square" alt="devDependencies Status"></a>
</p>
<p align="center">
  a Boilerplate for [mobile] SPAs using vue, vuex, vue-router<br>
  Check out <a href="http://plato.crossjs.com/#/demo"><b>Demonstrations</b></a> and UI <a href="https://github.com/crossjs/components"><b>Components</b></a>
</p>
<p align="center">
  <img src="doc/DESIGN.png" alt="Framework Design">
</p>

## Usage

[![Join the chat at https://gitter.im/platojs/Lobby](https://badges.gitter.im/platojs/Lobby.svg)](https://gitter.im/platojs/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

```bash
# install dependencies
npm install

# start a mocking server at localhost:3001
npm run mock

# serve with hot reload at localhost:3000
npm run dev

# eslint, stylelint, unit and e2e test
npm test

# compile files for production with minification
npm run compile

# test, clean, and compile
npm run build

# serve dist, like production
npm start

# generate demo site and push to gh-pages
npm run docs

# push modifications to github
npm run push
```

## Features

- Core
  - [system](https://github.com/crossjs/system)
  - [util](https://github.com/crossjs/util)
  - [components](https://github.com/crossjs/components)
  - [directives](https://github.com/crossjs/directives)
  - Vue
    - [Vue](https://github.com/vuejs/vue)
    - [Vue-Router](https://github.com/vuejs/vue-router)
    - [Vuex](https://github.com/vuejs/vuex)
    - [Vuex-Actions](https://github.com/weinot/vuex-actions) (for async actions)
    - [Vuex-PersistedState](https://github.com/robinvdvleuten/vuex-persistedstate) (for data persistence)
    - [Vuex-LocalStorage](https://github.com/crossjs/vuex-localstorage) (for cache and persistence)
  - Modules
    - [I18n](src/modules/i18n)
    - [Persist](src/modules/persist)
    - [Validator](src/modules/validator)
- Build
  - [Webpack](http://webpack.github.io/)
- Linters
  - [ESLint](http://eslint.org/)
  - [stylelint](http://stylelint.io/)
- Tests
  - [Karma](https://karma-runner.github.io/)
  - [Mocha](https://mochajs.org/)
  - [Nightwatch](http://nightwatchjs.org/)
  - [Selenium-Server](https://github.com/eugeneware/selenium-server)
- Transformers
  - [PostCSS](http://postcss.org/) (for css next)
    - [postcss-rtl](https://github.com/vkalinichev/postcss-rtl)
    - [postcss-flexible](https://github.com/crossjs/postcss-flexible) (for [lib.flexible](https://github.com/amfe/lib-flexible))
    - ...
  - [Babel](https://babeljs.io/) (for es6)

## Components

- Core
  - [x] Avatar
  - [x] Badge
  - [x] Form
    - [x] Button
    - [x] Checkbox (Switcher)
    - [x] Textfield (text, email, password, url, number, search, etc)
    - [x] Multiline
    - [x] Password (with showing password toggle)
  - [x] Icon
  - [x] Image
  - [x] Modal
  - [x] Picker
  - [x] Progress
  - [x] Range
  - [x] Scroller (with pulling up and down)
  - [x] Slider
  - [x] Spinner
  - [x] Swiper
  - [x] Toast
- Misc
  - [x] Paginator
  - [x] Uploader

## Scaffolding

Use [Vue-cli](https://github.com/vuejs/vue-cli) to get a clean and clear copy without demonstrations

```bash
$ npm install -g vue-cli
$ vue init crossjs/plato#template <project-name>
```

## Browser Support

### Framework

- IE 9+
- Chrome
- Safari
- Firefox
- ...

### UI Components

- Android 4+
- iOS 7+

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/crossjs/plato/releases).

## Appendix

- [Troubleshooting](doc/TROUBLESHOOTING.md)
- [Style Guide](doc/STYLEGUIDE.md)
- [Developing Guide](doc/DEVELOPING.md)
- [Contributing Guide](doc/CONTRIBUTING.md)

## License

[MIT](http://opensource.org/licenses/MIT)
