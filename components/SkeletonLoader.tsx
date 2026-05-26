import React from 'react';

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border-2 border-gray-200 overflow-hidden bg-white hover:border-yellow-300 transition">
      <div className="aspect-[2/3] bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gradient-to-r from-yellow-100 to-gray-100 rounded w-full animate-pulse" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 flex-1 bg-gray-200 rounded animate-pulse" />
          <div className="w-14 h-8 bg-gradient-to-r from-yellow-100 to-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
