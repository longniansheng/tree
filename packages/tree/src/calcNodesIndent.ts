import type { TreeNodeType } from '@sinoui/tree-models';

interface Options {
  useExpandIconToNodeIcon?: boolean;
  hiddenNodeIcon?: boolean;
  hideSelectedButtonIcon?: boolean;
  multiple?: boolean;
  nodeIcon?:
    | React.ReactNode
    | ((treeNode: TreeNodeType) => React.ReactNode | undefined);
}

/**
 * 计算树节点的缩进
 *
 * @param {TreeNodeType[]} allNodes
 * @param {Options} props
 * @returns
 */
function calcNodesIndent(allNodes: TreeNodeType[], _props: Options) {
  const indents: {
    [id: string]: number;
  } = {};
  const relativeIndents: {
    [id: string]: number;
  } = {};

  const getChildren = (item: TreeNodeType) => {
    const children = !item.leaf
      ? allNodes.filter((node) => node.parent && node.parent.id === item.id)
      : undefined;

    return children;
  };

  function inner(nodes: TreeNodeType[]) {
    const containsExpandedIcon = nodes.some((item) => !item.leaf);

    nodes.forEach((item) => {
      const relativeIndent =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (item.level === 0 ? 0 : relativeIndents[item.parent!.id]) +
        (item.level > 0 ? 0.7 : 0);
      relativeIndents[item.id] = relativeIndent;
      let indent = relativeIndent;

      if (containsExpandedIcon && item.leaf) {
        indent += 1;
      } else if (!containsExpandedIcon && item.leaf) {
        indent += 0.8;
      }

      indents[item.id] = indent;

      const children = getChildren(item);
      if (children && children.length > 0) {
        inner(children);
      }
    });
  }

  inner(allNodes.filter((node) => node.level === 0));

  return indents;
}

export default calcNodesIndent;
