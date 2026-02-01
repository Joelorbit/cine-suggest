import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface TrailerModalProps {
  trailerKey: string | null;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ trailerKey, onClose }) => {
  useEffect(() => {
    if (!trailerKey) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = 'unset';
    };
  }, [trailerKey, onClose]);

  if (!trailerKey) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1 bg-black/60 text-white rounded-full hover:bg-black transition"
        >
          <X size={16} />
        </button>

        {/* Trailer iframe */}
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Trailer"
        />
      </div>
    </div>
  );
};
