import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Bookmark, ExternalLink, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title: string;
  description?: string;
  score?: number;
  scoreLabel?: string;
  tags?: string[];
  onCopy?: () => void;
  onBookmark?: () => void;
  onView?: () => void;
  onRate?: (rating: number) => void;
  rating?: number;
  isSelected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ContentCard = ({
  title,
  description,
  score,
  scoreLabel = 'Score',
  tags = [],
  onCopy,
  onBookmark,
  onView,
  onRate,
  rating = 0,
  isSelected = false,
  onClick,
  children
}: ContentCardProps) => {
  const getScoreStyle = (value: number) => {
    if (value >= 80) return 'score-excellent';
    if (value >= 60) return 'score-good';
    return 'score-poor';
  };

  return (
    <Card 
      className={cn(
        "group hover:border-primary/50 transition-all duration-200 cursor-pointer",
        isSelected && "border-primary ring-2 ring-primary/20"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 space-y-4">
        {/* Header with Score */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            )}
          </div>
          
          {score !== undefined && (
            <Badge variant="outline" className={cn("px-3 py-1 font-bold", getScoreStyle(score))}>
              {scoreLabel}: {score}
            </Badge>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Custom Content */}
        {children}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex gap-2">
            {onCopy && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onCopy(); }}>
                <Copy className="h-4 w-4" />
              </Button>
            )}
            {onBookmark && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onBookmark(); }}>
                <Bookmark className="h-4 w-4" />
              </Button>
            )}
            {onView && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onView(); }}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Rating */}
          {onRate && (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRate(star);
                  }}
                  className="p-0.5 hover:scale-110 transition-transform"
                >
                  <Star
                    className={cn(
                      "h-4 w-4",
                      star <= rating 
                        ? "fill-[hsl(var(--warning))] text-[hsl(var(--warning))]" 
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
