import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { areEqual } from 'react-window';
import type { TreeNodeType } from '@sinoui/tree-models';
import useTreeRenderContext from './useTreeRenderContext';

interface Props {
  data: TreeNodeType[];
  index: number;
  style?: React.CSSProperties;
}

const Row = React.memo(function Row(props: Props) {
  const { data: items, index, style } = props;

  const { isDragDisabled, indents, renderTreeNode } = useTreeRenderContext();

  const item = items[index];
  return (
    <Draggable
      draggableId={item.id}
      index={index}
      key={item.id}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => {
        const { style: dragStyle, ...rest } = provided.draggableProps;
        const transitions: string[] =
          dragStyle && dragStyle.transition
            ? [dragStyle.transition, 'padding-left 0.5s']
            : ['padding-left 0.5s'];

        const transition = transitions.join(', ');
        return (
          <div
            ref={provided.innerRef}
            {...rest}
            style={{
              ...dragStyle,
              ...style,
              transition,
              paddingLeft: `${indents[item.id] * 24}px`,
            }}
            {...provided.dragHandleProps}
          >
            {renderTreeNode(item)}
          </div>
        );
      }}
    </Draggable>
  );
}, areEqual);

export default Row;
