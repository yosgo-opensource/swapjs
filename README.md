# SWAPJS

#### SWAP utility libraries

[SWAP. Freelancer's online tax manager.](https://swap.work/)

## Documentation

[@yosgo/swapjs docs](https://yosgo-open-source.github.io/swapjs/)

## Install

```
> yarn add @yosgo/swapjs
```

## How to create new Function

example

```
- src
  |- echo
    |- __tests__
      |- echo-test.js
    |- index.ts
```

Test is important for the open-source, we add one test directory named `__tests__` with all utils implement file directory.

All tests file didn't needed compiled by `typescript`, so just use `.js` extend name and then we ignore it from tsconfig.

## Commit Standard

```
[feat]: 新增/修改功能 (feature)。
[fix]: 修補 bug (bug fix)。
[docs]: 文件 (documentation)。
[style]: 格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)。
[refactor]: 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
[perf]: 改善效能 (A code change that improves performance)。
[test]: 增加測試 (when adding missing tests)。
[chore]: 建構程序或輔助工具的變動 (maintain)。
[revert]: 撤銷回覆先前的 commit 例如：revert: type(scope): subject (回覆版本：xxxx)。
```
