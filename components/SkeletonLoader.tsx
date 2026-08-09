import React from 'react';

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border-2 border-[var(--line)] overflow-hidden bg-[var(--surface)] hover:border-[var(--line-strong)] transition">
      <div className="aspect-[2/3] bg-gradient-to-r from-[var(--surface-raised)] to-[var(--surface-elevated)] animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-[var(--surface-raised)] rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gradient-to-r from-[var(--accent-soft)] to-[var(--surface-elevated)] rounded w-full animate-pulse" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 flex-1 bg-[var(--surface-raised)] rounded animate-pulse" />
          <div className="w-14 h-8 bg-gradient-to-r from-[var(--accent-soft)] to-[var(--surface-elevated)] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
