import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Bookmark, Download, X } from 'lucide-react';

interface BatchActionsProps {
  selectedCount: number;
  onCopyAll: () => void;
  onBookmarkAll: () => void;
  onExport: () => void;
  onClear: () => void;
}

export const BatchActions = ({
  selectedCount,
  onCopyAll,
  onBookmarkAll,
  onExport,
  onClear
}: BatchActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom">
      <div className="bg-card border border-border rounded-lg shadow-lg px-4 py-3 flex items-center gap-4">
        <Badge variant="secondary" className="px-3 py-1">
          {selectedCount} seçildi
        </Badge>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onCopyAll}>
            <Copy className="h-4 w-4 mr-2" />
            Tümünü Kopyala
          </Button>
          
          <Button size="sm" variant="outline" onClick={onBookmarkAll}>
            <Bookmark className="h-4 w-4 mr-2" />
            Kaydet
          </Button>
          
          <Button size="sm" variant="outline" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
        
        <div className="h-6 w-px bg-border" />
        
        <Button size="sm" variant="ghost" onClick={onClear}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
