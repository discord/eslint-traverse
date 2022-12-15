"use strict"

const SKIP = Symbol("skip")
const STOP = Symbol("stop")

function traverse(context, node, visitor) {
  let allVisitorKeys = context.getSourceCode().visitorKeys
  let queue = []

  queue.push({
    node,
    parent: null,
    parentKey: null,
    parentPath: null
  })

  while (queue.length) {
    let currentPath = queue.shift()

    let result = visitor(currentPath)
    if (result === STOP) break
    if (result === SKIP) continue
    
    let currentNode = currentPath.node
    if (currentNode == null) continue

    let visitorKeys = allVisitorKeys[currentNode.type]
    if (!visitorKeys) continue

    for (let visitorKey of visitorKeys) {
      let child = currentNode[visitorKey]

      if (!child) {
        continue
      } else if (Array.isArray(child)) {
        for (let item of child) {
          if (item == null) continue
          queue.push({
            node: item,
            parent: currentNode,
            parentKey: visitorKey,
            parentPath: currentPath,
          })
        }
      } else {
        queue.push({
          node: child,
          parent: currentNode,
          parentKey: visitorKey,
          parentPath: currentPath,
        })
      }
    }
  }
}

module.exports = traverse
module.exports.SKIP = SKIP
module.exports.STOP = STOP
