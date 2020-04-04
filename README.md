# eslint-traverse

> Create a sub-traversal of an AST node in your ESLint plugin

- Very fast
- Supports "Skipping" & "Stopping" (See below)
- Provides AST ancestor information for every node (Babel-style "Path" object)

## Install

```sh
npm install --save eslint-traverse
```

## Example

```js
import traverse from "eslint-traverse"

export default function(context) {
  return {
    FunctionDeclaration(node) {
      traverse(context, node, path => {
        console.log(path)
        // Path {
        //   node: Node,
        //   parent: Node | null,
        //   parentKey: string | null
        //   parentPath: Path | null
        // }

        if (path.node.type === "FunctionDeclaration") {
          return traverse.SKIP
        }
      })
    }
  }
}
```

## Skipping

If you want to completely ignore a branch of the AST, without visiting any of its
children, you can return `traverse.SKIP` from the visitor.

```js
traverse(context, node, path => {
  if (path.node.type === "FunctionDeclaration") {
    return traverse.SKIP
  }
  // ...
})
```

## Stopping

If you want to stop the traversal completely, without visiting any more nodes
anywhere in the AST, you can return `traversal.STOP` from the visitor.

```js
traverse(context, node, path => {
  if (path.node.type === "Identifier" && path.node.name === "THING_I_WAS_SEARCHING_FOR") {
    return traverse.STOP
  }
  // ...
})
```
