# tsestree-walker

Simple utility for walking an AST in the [TSESTree](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/typescript-estree) format.

This is a ported and feature-reduced version of [estree-walker](https://github.com/Rich-Harris/estree-walker).

## Installation

### npm

```bash
npm i @mkx419/tsestree-walker
```

### pnpm

```bash
pnpm add @mkx419/tsestree-walker
```

## Usage

### walk

```js
import { walk } from "@mkx419/tsestree-walker";
import { parse } from "@typescript-eslint/typescript-estree";

const ast = parse(sourceCode);

walk(ast, {
  enter(node) {
    //
  },
  leave(node) {
    //
  },
});
```

### WalkerBase

```js
import { WalkerBase } from "@mkx419/tsestree-walker";
import { parse } from "@typescript-eslint/typescript-estree";

class CustomWalker extends WalkerBase {
  constructor() {
    super();
  }

  enter(node) {
    //
  }

  leave(node) {
    //
  }

  start(ast) {
    super.start(ast);
  }
}

const ast = parse(sourceCode);

new CustomWalker().start(ast);
```
