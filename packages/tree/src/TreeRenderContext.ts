import React from 'react';
import { TreeNodeType } from '@sinoui/tree-models';

export interface TreeRenderContextModel {
  indents: { [id: string]: number };

  isDragDisabled?: boolean;

  renderTreeNode: (node: TreeNodeType) => React.ReactNode | null;
}

const TreeRenderContext = React.createContext<TreeRenderContextModel | null>(
  null,
);

export default TreeRenderContext;
