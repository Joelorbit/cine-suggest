import React, { useEffect } from 'react';
import { X, Sparkles, Film, Wand2, Heart, Github, Globe } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-3 sm:px-4 py-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-5 right-3 sm:right-5 p-2 rounded-full hover:bg-gray-100 transition z-10"
        >
          <X size={18} />
        </button>

        <div className="p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-8">
          <header>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight pr-8 sm:pr-0">
              About CineSuggest
            </h2>
            <p className="mt-2 text-gray-500 text-xs sm:text-sm max-w-md leading-relaxed">
              A modern catalogue for discovering films through mood,
              atmosphere, and emotional texture.
            </p>
          </header>

          <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <Feature
              icon={<Wand2 size={16} className="sm:w-[18px] sm:h-[18px]" />}
              title="Mood-First Discovery"
              text="Describe a feeling, a moment, or a cinematic atmosphere — CineSuggest responds with films that resonate emotionally, not just by genre."
            />

            <Feature
              icon={<Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" />}
              title="AI-Curated Taste"
              text="Powered by Groq's Llama 3.3 70B, trained to understand tone, rhythm, and cinematic language."
            />

            <Feature
              icon={<Film size={16} className="sm:w-[18px] sm:h-[18px]" />}
              title="Complete Context"
              text="Metadata, posters, and trailers are sourced from TMDB so every recommendation is immediately watch-ready."
            />
          </div>

          <footer className="pt-5 sm:pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <p className="text-xs text-gray-500">
                Built with <Heart size={12} className="inline text-red-500 mx-1" /> by{' '}
                <span className="text-black font-medium">Eyuel</span>
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Joelorbit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://eyuelgetachew.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Portfolio"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

const Feature = ({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="flex gap-4">
    <div className="mt-1 text-black">{icon}</div>
    <div>
      <h4 className="font-medium text-black mb-1">{title}</h4>
      <p>{text}</p>
    </div>
  </div>
);
