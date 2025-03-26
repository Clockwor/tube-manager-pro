
import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ClipNode from './ClipNode';
import TrimNode from './TrimNode';
import OutputNode from './OutputNode';

// Define custom node types
const nodeTypes = {
  clipInput: ClipNode,
  trim: TrimNode,
  output: OutputNode,
};

// Initial nodes setup
const initialNodes = [
  {
    id: 'input-1',
    type: 'clipInput',
    data: { label: 'Video Input' },
    position: { x: 250, y: 25 },
  },
  {
    id: 'trim-1',
    type: 'trim',
    data: { 
      label: 'Trim Video',
      startTime: '00:00:00',
      endTime: '00:01:00'
    },
    position: { x: 250, y: 150 },
  },
  {
    id: 'output-1',
    type: 'output',
    data: { label: 'Clip Output' },
    position: { x: 250, y: 300 },
  },
];

// Initial edges setup
const initialEdges = [
  {
    id: 'e1-2',
    source: 'input-1',
    target: 'trim-1',
    animated: true,
  },
  {
    id: 'e2-3',
    source: 'trim-1',
    target: 'output-1',
    animated: true,
  },
];

const NodeEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden glass-panel">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#444" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            switch (n.type) {
              case 'clipInput': return '#FF6B6B';
              case 'trim': return '#4ECDC4';
              case 'output': return '#FF9F1C';
              default: return '#666';
            }
          }}
          maskColor="rgba(0, 0, 0, 0.2)"
          style={{ backgroundColor: '#222' }}
        />
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;
