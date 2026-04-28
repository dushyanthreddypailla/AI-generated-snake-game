import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Shield, Radio, Terminal } from 'lucide-react';

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-4 selection:bg-neon-magenta selection:text-white">
      {/* Glitch Infrastructure */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="static-noise absolute inset-0 mix-blend-overlay opacity-30" />
        <div className="scanline" />
        
        {/* Artifacts */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-neon-cyan/20 animate-pulse" />
        <div className="absolute top-2/3 left-0 w-full h-[2px] bg-neon-magenta/10" />
      </div>

      {/* Cryptic Header */}
      <header className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center mb-12 px-4 gap-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white flex items-center justify-center relative">
               <Shield className="text-black" size={24} />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-cyan animate-ping" />
            </div>
            <h1 className="text-2xl font-pixel leading-none glitch-text" data-text="NEON_RHYTHM_v2.0">
              NEON_RHYTHM_v2.0
            </h1>
          </div>
          <p className="font-pixel text-[8px] text-zinc-600 tracking-[0.4em] uppercase">SYSTEM_ARCH :: VOID_OS</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-8 font-pixel text-[7px] uppercase tracking-widest text-zinc-400 border-l border-white/20 pl-8"
        >
           <div className="flex flex-col gap-1">
             <span className="text-neon-lime">UPLINK_STATUS</span>
             <span className="text-white">ESTABLISHED_</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-neon-magenta">WAVE_SYNC</span>
             <span className="text-white">LOCKED_0x4F2</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-zinc-600">KERNEL_CLOCK</span>
             <span className="text-white">28:05:14:00</span>
           </div>
        </motion.div>
      </header>

      {/* Main Terminal: Snake Game */}
      <main className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full border border-white/10 -m-4 pointer-events-none" />
          <motion.div
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.1 }}
          >
            <SnakeGame />
          </motion.div>
        </div>
      </main>

      {/* Uplink Hub: Music Player */}
      <footer className="w-full flex justify-center mt-16 z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md relative"
        >
          <div className="absolute -top-4 left-0 w-full flex justify-center">
            <span className="font-pixel text-[6px] bg-glitch-bg px-4 text-zinc-500 tracking-[0.5em] z-10 border-x border-white/20 uppercase">
              AUDIO_INTERFACE_PROXY
            </span>
          </div>
          <MusicPlayer />
          
          {/* Footer Metadata */}
          <div className="mt-8 flex justify-between font-pixel text-[6px] text-zinc-700 tracking-tighter">
             <span>ERROR_LOG: [VOID]</span>
             <span>BUFFER_SIZE: 1024KB</span>
             <span>MEMORY_LEAK_DETECTED: FALSE</span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

