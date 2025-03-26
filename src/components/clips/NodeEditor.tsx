
import React, { useCallback, useState } from 'react';
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
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSave = () => {
    setIsSaving(true);
    
    // Save the current flow state to localStorage
    const flow = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    
    try {
      localStorage.setItem('savedFlow', JSON.stringify(flow));
      
      toast({
        title: "Flow Saved",
        description: "Your node configuration has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving flow:', error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your node configuration.",
        variant: "destructive",
      });
    }
    
    setIsSaving(false);
  };

  return (
    <div className="relative h-[500px] w-full rounded-xl overflow-hidden glass-panel">
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-tube-gray/80 hover:bg-tube-gray flex items-center gap-2 text-tube-white py-2 px-3 rounded-md text-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Flow'}
        </button>
      </div>
      
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
