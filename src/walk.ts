import { type TSESTree } from "@typescript-eslint/typescript-estree";

import { WalkerBase } from "./walker-base";

type Context = { skip: () => void };
type Handler = (this: Context, node: TSESTree.Node) => void;

class Walker extends WalkerBase {
  private context: Context;
  private _enter: Handler | undefined;
  private _leave: Handler | undefined;

  constructor(enter?: Handler, leave?: Handler) {
    super();
    this.context = { skip: () => this.skip() };
    this._enter = enter;
    this._leave = leave;
  }

  protected override enter(node: TSESTree.Node): void {
    if (this._enter) {
      this._enter.call(this.context, node);
    }
  }

  protected override leave(node: TSESTree.Node): void {
    if (this._leave) {
      this._leave.call(this.context, node);
    }
  }

  start(ast: TSESTree.Node) {
    super.start(ast);
  }
}

export function walk(ast: TSESTree.Node, { enter, leave }: { enter?: Handler; leave?: Handler }) {
  return new Walker(enter, leave).start(ast);
}
