
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileVideo } from 'lucide-react';

const ClipNode = ({ data }) => {
  return (
    <div className="glass-panel p-3 rounded-lg border border-tube-lightgray min-w-[160px]">
      <div className="flex items-center justify-center gap-2 font-medium text-tube-white mb-2">
        <FileVideo className="w-5 h-5 text-tube-red" />
        <div>{data.label}</div>
      </div>
      <div className="text-xs text-tube-white/70 text-center py-1">
        Select a video source
      </div>
      {/* Only output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-tube-red border-2 border-tube-darkred"
      />
    </div>
  );
};

export default memo(ClipNode);
