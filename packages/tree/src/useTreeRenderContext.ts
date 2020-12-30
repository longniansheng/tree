import { useContext } from 'react';
import TreeRenderContext, { TreeRenderContextModel } from './TreeRenderContext';

export default function useTreeRenderContext(): TreeRenderContextModel {
  const context = useContext(TreeRenderContext);

  if (!context) {
    throw new Error('组织树渲染上下文获取不到');
  }

  return context;
}
