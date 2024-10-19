# vue-admin-dashboard

This template should help get you started developing with Vue 3 in Vite.

## 项目简介 / Project Introduction

`vue-admin-dashboard` 是一个基于 Vue 3 构建的现代化后台管理系统。项目采用了 Vue 3、Vite、Element Plus、TypeScript、Axios 和 Pinia 等技术栈，旨在提供一个高效、灵活的管理系统基础框架。

`vue-admin-dashboard` is a modern admin dashboard system built with Vue 3. The project uses technologies such as Vue 3, Vite, Element Plus, TypeScript, Axios, and Pinia to provide an efficient and flexible foundation for management systems.

项目中使用了 MSW（Mock Service Worker）来拦截和模拟数据响应，方便开发和测试。通过简单的配置修改，`vue-admin-dashboard` 可以快速适应不同的业务需求，成为一个功能强大的后台管理系统。

The project uses MSW (Mock Service Worker) to intercept and simulate data responses, making development and testing easier. With simple configuration modifications, `vue-admin-dashboard` can quickly adapt to different business needs and become a powerful admin dashboard system.

无论是作为学习 Vue 3 及其相关技术栈的示例项目，还是作为实际项目的基础框架，`vue-admin-dashboard` 都是一个理想的选择。

Whether as a sample project for learning Vue 3 and its related technologies or as a foundation for actual projects, `vue-admin-dashboard` is an ideal choice.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## 功能列表 / Features

- 用户管理 / User Management
- 权限控制 / Permission Control
- 数据可视化 / Data Visualization
- 响应式布局 / Responsive Layout

## 技术栈 / Technology Stack

- Vue 3
- Vite
- Element Plus
- TypeScript
- Axios
- Pinia
- MSW (Mock Service Worker)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
