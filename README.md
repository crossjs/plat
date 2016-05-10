# plat
[![dependencies](https://david-dm.org/crossjs/plat.svg?style=flat-square)](https://david-dm.org/crossjs/plat)
[![devDependency Status](https://david-dm.org/crossjs/plat/dev-status.svg?style=flat-square)](https://david-dm.org/crossjs/plat#info=devDependencies)

> A plat<del>form</del> built with koa and vue

## 技术栈

- koa
- vue (with vuex, vue-router)
- mongodb
- webpack
- postcss
- karma

## 设计原则

- 单向数据流
- 组件间通过事件传递数据
- 使用 mixins 实现复用
- 向 vue@2 靠拢

## 阅读顺序

- src/vx: vuex 相关配置
- src/components: 一些通用的 UI 组件

## 使用说明

``` bash
# start mongo
mongod -dbpath path/to/data/db

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# serve with mocking
npm run dev:mock

# clean
npm run clean

# build for production with minification
npm run compile

# run server in production
npm start

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 接口模拟

见 apis 目录

## 常见问题

- do NOT use `@import` in scoped css
- node@5.7.0 did NOT work for the `path.parse` issue

## 兼容性

移动浏览器
