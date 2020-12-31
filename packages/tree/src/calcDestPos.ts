import { TreeNodeType } from '@sinoui/tree-models';

function calcDestPos(nodes: TreeNodeType[], destNode: TreeNodeType) {
  return nodes
    .filter((node) => node.parent?.id === destNode.parent?.id)
    .findIndex((node) => node.id === destNode.id);
}

export default function calcParentAndDestPos(
  nodes: TreeNodeType[],
  sourceIndex: number,
  destIndex: number,
) {
  const down = sourceIndex < destIndex;

  let parentId = nodes[destIndex].parent?.id;
  // 默认添加在头部
  let pos = -1;

  if (down) {
    // 拖动到子节点的头部
    if (
      nodes[destIndex + 1] &&
      nodes[destIndex + 1].level > nodes[destIndex].level
    ) {
      parentId = nodes[destIndex].id;
      pos = 0;
      // 拖动到子节点的尾部
    } else if (
      nodes[destIndex + 1] &&
      nodes[destIndex + 1].level < nodes[destIndex].level
    ) {
      pos = nodes[destIndex].parent?.children?.length ?? 0;
    } else {
      pos = calcDestPos(nodes, nodes[destIndex]);
    }
  } else {
    pos = calcDestPos(nodes, nodes[destIndex]);
  }

  return {
    parentId,
    pos,
  };
}
