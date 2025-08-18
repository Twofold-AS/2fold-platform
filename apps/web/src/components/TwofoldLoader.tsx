'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TwofoldLoaderProps {
  onDone: () => void;
  minTime?: number;
}

export default function TwofoldLoader({ onDone, minTime = 2000 }: TwofoldLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading');

  // Animert loading tekst
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Loading...') return 'Loading';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Timer for minimum visningstid
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Vent på exit-animasjon før onDone
      setTimeout(onDone, 600);
    }, minTime);

    return () => clearTimeout(timer);
  }, [minTime, onDone]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          {/* Logo animasjon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            {/* Twofold logo/ikon */}
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                className="w-24 h-24 border-4 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner rotating element */}
              <motion.div
                className="absolute inset-4 bg-white rounded-full flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <span className="text-black font-bold text-xl">T</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Loading tekst */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white text-xl font-medium tracking-wide"
          >
            {loadingText}
          </motion.div>

          {/* Twofold branding */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-4 text-white/60 text-sm tracking-wider"
          >
            TWOFOLD — The Fold
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.8, duration: minTime / 1000 - 0.8 }}
            className="mt-8 h-0.5 bg-white/30 max-w-xs"
          >
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: minTime / 1000 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}