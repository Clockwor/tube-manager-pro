
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Scissors } from 'lucide-react';

const TrimNode = ({ data }) => {
  return (
    <div className="glass-panel p-3 rounded-lg border border-tube-lightgray min-w-[180px]">
      <div className="flex items-center justify-center gap-2 font-medium text-tube-white mb-2">
        <Scissors className="w-5 h-5 text-tube-white" />
        <div>{data.label}</div>
      </div>
      <div className="text-xs text-tube-white/70 mb-1">Start Time:</div>
      <input 
        type="text" 
        className="w-full p-1 mb-2 bg-tube-gray/50 border border-tube-lightgray/30 rounded text-xs" 
        defaultValue={data.startTime} 
      />
      <div className="text-xs text-tube-white/70 mb-1">End Time:</div>
      <input 
        type="text" 
        className="w-full p-1 bg-tube-gray/50 border border-tube-lightgray/30 rounded text-xs" 
        defaultValue={data.endTime} 
      />
      
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-tube-lightgray border-2 border-tube-gray"
      />
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-tube-lightgray border-2 border-tube-gray"
      />
    </div>
  );
};

export default memo(TrimNode);
