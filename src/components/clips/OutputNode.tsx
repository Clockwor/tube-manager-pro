
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Film } from 'lucide-react';

const OutputNode = ({ data }) => {
  return (
    <div className="glass-panel p-3 rounded-lg border border-tube-lightgray min-w-[160px]">
      <div className="flex items-center justify-center gap-2 font-medium text-tube-white mb-2">
        <Film className="w-5 h-5 text-tube-red" />
        <div>{data.label}</div>
      </div>
      <div className="flex flex-col gap-2">
        <button className="bg-tube-red hover:bg-tube-darkred text-white py-1 px-3 rounded-md text-xs font-medium transition-colors">
          Export Clip
        </button>
      </div>
      
      {/* Only input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-tube-red border-2 border-tube-darkred"
      />
    </div>
  );
};

export default memo(OutputNode);
