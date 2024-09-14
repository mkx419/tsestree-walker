import { type TSESTree } from "@typescript-eslint/typescript-estree";

export class WalkerBase {
  private shouldSkip: boolean;

  constructor() {
    this.shouldSkip = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected enter(node: TSESTree.Node): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected leave(node: TSESTree.Node): void {}

  protected skip() {
    this.shouldSkip = true;
  }

  private visit<_Node extends TSESTree.Node>(node: _Node) {
    if (node) {
      const _shouldSkip = this.shouldSkip;
      this.shouldSkip = false;

      this.enter(node);

      const skipped = this.shouldSkip;
      this.shouldSkip = _shouldSkip;

      if (skipped) {
        return;
      }

      for (const key in node) {
        const value = node[key];

        if (value && typeof value === "object") {
          if (Array.isArray(value)) {
            for (const item of value as unknown[]) {
              if (isNode(item)) {
                this.visit(item);
              }
            }
          } else if (isNode(value)) {
            this.visit(value);
          }
        }
      }

      this.leave(node);
    }
  }

  protected start(ast: TSESTree.Node) {
    this.visit(ast);
  }
}

function isNode(value: unknown): value is TSESTree.Node {
  return (
    value !== null && typeof value === "object" && "type" in value && typeof value.type === "string"
  );
}
