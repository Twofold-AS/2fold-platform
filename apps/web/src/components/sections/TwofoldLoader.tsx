'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TwofoldLoaderProps {
  onDone: () => void;
  minTime?: number;
  showSkip?: boolean;
}

export default function TwofoldLoader({ onDone, minTime = 2500, showSkip = false }: TwofoldLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing",
    "Loading assets",
    "Preparing experience", 
    "Almost ready"
  ];

  // Simulate loading progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  // Cycle through loading texts
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => clearInterval(textInterval);
  }, [loadingTexts.length]);

  // Handle completion
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDone, 800);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onDone]);

  // Ensure minimum time
  useEffect(() => {
    const minTimer = setTimeout(() => {
      if (progress >= 100) {
        setIsVisible(false);
        setTimeout(onDone, 800);
      }
    }, minTime);

    return () => clearTimeout(minTimer);
  }, [minTime, onDone, progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-full bg-white"
                style={{ left: `${(i + 1) * 5}%` }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  x: [0, Math.random() * 20 - 10]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute h-px w-full bg-white"
                style={{ top: `${(i + 1) * 6.67}%` }}
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  y: [0, Math.random() * 10 - 5]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Skip button (optional) */}
          {showSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => {
                setIsVisible(false);
                setTimeout(onDone, 300);
              }}
              className="absolute top-8 right-8 text-white/50 hover:text-white text-sm tracking-wide transition-colors duration-300"
            >
              SKIP
            </motion.button>
          )}

          {/* Central loading content */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Main logo/shape animation */}
            <motion.div
              className="relative mb-16"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Morphing shape container */}
              <div className="relative w-24 h-24">
                {/* Outer rotating ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner morphing shape */}
                <motion.div
                  className="absolute inset-3 bg-white"
                  animate={{
                    borderRadius: [
                      "50%", 
                      "20% 80% 20% 80%", 
                      "80% 20% 80% 20%", 
                      "50%"
                    ],
                    rotate: [0, 90, 180, 360],
                    scale: [1, 0.9, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Pulsing core */}
                <motion.div
                  className="absolute inset-6 bg-black rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Orbiting particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: "-4px",
                    marginLeft: "-4px"
                  }}
                  animate={{
                    rotate: 360,
                    x: [0, 50 * Math.cos(i * 2.094), 0],
                    y: [0, 50 * Math.sin(i * 2.094), 0]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>

            {/* Progress indicator */}
            <div className="mb-8 w-64">
              {/* Progress bar */}
              <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{
                    x: [-32, 256]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Progress percentage */}
              <motion.div
                className="mt-3 text-center text-white/60 text-sm font-mono"
                key={Math.floor(progress)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {Math.floor(progress)}%
              </motion.div>
            </div>

            {/* Loading text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentText}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-white text-xl font-light tracking-wide"
              >
                {loadingTexts[currentText]}
              </motion.div>
            </AnimatePresence>

            {/* Brand/company identifier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-12 text-white/40 text-sm tracking-[0.3em] uppercase"
            >
              TWOFOLD — The Fold
            </motion.div>
          </div>

          {/* Corner details */}
          <motion.div
            className="absolute bottom-8 left-8 text-white/30 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            v2.0.1
          </motion.div>

          <motion.div
            className="absolute bottom-8 right-8 text-white/30 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            {new Date().getFullYear()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}