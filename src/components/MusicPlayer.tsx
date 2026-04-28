import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music2 } from 'lucide-react';
import { motion } from 'motion/react';
import { DUMMY_TRACKS } from '../types';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleSkip();
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleSkip = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="bg-black border-4 border-white p-6 w-full max-w-md relative overflow-hidden">
      {/* Glitch Overlay */}
      <div className="static-noise absolute inset-0 opacity-10" />
      
      <div className="relative z-10 flex gap-6 items-start">
        {/* Album Art (Low Res Style) */}
        <div className="w-24 h-24 bg-zinc-900 border-2 border-neon-cyan relative flex-shrink-0">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover grayscale brightness-125 contrast-150"
          />
          <div className="absolute inset-0 border border-white/20" />
          <div className="absolute top-1 left-1 w-2 h-2 bg-neon-magenta" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 font-pixel">
          <h3 className="text-[10px] text-neon-cyan mb-2 leading-tight glitch-text" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-[8px] text-zinc-500 uppercase tracking-tighter mb-4">
            ARTIST :: {currentTrack.artist}
          </p>
          <div className="inline-block px-2 py-1 bg-white text-black text-[6px] tracking-widest uppercase mb-2">
            BROADCAST_ACTIVE
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 space-y-6 relative z-10">
        <div className="space-y-2">
          <div className="h-4 w-full bg-zinc-900 border border-white/30 p-0.5 relative">
            <motion.div
              className="h-full bg-neon-magenta"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
            {/* Ticks */}
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-50">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-full w-[1px] bg-white/20" />
              ))}
            </div>
          </div>
          <div className="flex justify-between font-mono text-[8px] text-zinc-500">
            <span>BIT_STREAM_72kbps</span>
            <span className="text-neon-cyan">{currentTrack.duration} // SYNC</span>
          </div>
        </div>

        <div className="flex items-center justify-between font-pixel">
          <button onClick={handlePrev} className="text-[10px] text-white hover:text-neon-cyan border-b-2 border-transparent hover:border-neon-cyan transition-all">
            PREV_
          </button>
          
          <button
            onClick={handlePlayPause}
            className={`px-8 py-2 border-2 ${isPlaying ? 'border-neon-magenta bg-neon-magenta text-black' : 'border-white bg-transparent text-white'} text-[10px] transition-all relative overflow-hidden`}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
            {isPlaying && <div className="absolute inset-0 scanline opacity-30" />}
          </button>

          <button onClick={handleSkip} className="text-[10px] text-white hover:text-neon-magenta border-b-2 border-transparent hover:border-neon-magenta transition-all">
            NEXT_
          </button>
        </div>
      </div>
    </div>
  );
}
