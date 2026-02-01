import React from 'react';

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
      <div className="aspect-[2/3] bg-gray-200 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 flex-1 bg-gray-200 rounded animate-pulse" />
          <div className="w-14 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
