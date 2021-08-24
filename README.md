# SWAPJS

當前由 SWAP Developer Team 維護，主要以 SWAP 計算相關通用函式集。

## ｜ SWAP 是什麼？

We are [SWAP. 自由工作者的財務管理平台](https://swap.work/)

## ｜線上文件

[@yosgo/swapjs docs](https://yosgo-open-source.github.io/swapjs/)

## ｜安裝

`npm`

```bash
npm install @yosgo/swapjs
```

`yarn`

```bash
yarn add @yosgo/swapjs
```

## ｜新增函式

```
- src
  |- echo
    |- __tests__
      |- echo-test.js
    |- index.ts
```

每個函式都需要有一個 `__tests__` 資料夾，放置上層的函式測試內容，測試檔案不需要被 `typescript` 編譯，所以直接命名為 `.js` 即可。

## ｜交付標準

此交付標準格式源自於 [Angular Commit Message Guidelines](https://gist.github.com/brianclements/841ea7bffdb01346392c#file-commit-formatting-md)

```
build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
ci: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
docs: Documentation only changes
feat: A new feature
fix: A bug fix
perf: A code change that improves performance
refactor: A code change that neither fixes a bug nor adds a feature
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
test: Adding missing tests or correcting existing tests
```

`example`

```
fix(tax-amount): 修正稅務計算錯誤問題

發現 50 的 tax 函式計算錯誤，調整為正確公式。
```

## ｜核心開發者

[@Whien](https://github.com/madeinfree)
[@Logan](https://github.com/clothe09986)
