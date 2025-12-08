"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";

interface MusicSettings {
  enabled: boolean;
  music_url: string;
  volume: number;
  loop: boolean;
}

export default function WelcomeScreen() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [musicSettings, setMusicSettings] = useState<MusicSettings | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Check if user has already entered the website
    const hasEntered = localStorage.getItem("website_entered");
    
    if (hasEntered) {
      // User has entered before, check if music should play
      loadMusicSettings(true);
      return;
    }

    // First time visitor - show welcome screen
    setShowWelcome(true);
    loadMusicSettings(false);
  }, []);

  const loadMusicSettings = async (autoPlay: boolean) => {
    try {
      const response = await fetch("/api/music");
      const data = await response.json();
      
      if (data.enabled && data.music_url) {
        setMusicSettings(data);
        
        if (autoPlay) {
          // Auto-play for returning visitors (they've already interacted)
          initializeAudio(data, true);
        }
        // For first-time visitors, music will start after they click "Enter Website"
      }
    } catch (error) {
      console.error("Error loading music settings:", error);
    }
  };

  const initializeAudio = (settings: MusicSettings, play: boolean = false) => {
    if (!settings.music_url) return;

    const audioElement = new Audio(settings.music_url);
    audioElement.volume = settings.volume;
    audioElement.loop = settings.loop;
    
    audioElement.addEventListener("ended", () => {
      if (settings.loop) {
        audioElement.currentTime = 0;
        audioElement.play();
      }
    });

    setAudio(audioElement);
    
    if (play) {
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const handleEnterWebsite = () => {
    localStorage.setItem("website_entered", "true");
    setShowWelcome(false);
    
    if (musicSettings) {
      initializeAudio(musicSettings, true);
    }
  };

  const togglePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audio) return;
    
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Welcome Screen */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#002147] via-[#003370] to-[#002147] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center px-6 max-w-2xl"
            >
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
              >
                Welcome to SR INTERNATIONAL
              </motion.h1>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-200 mb-12"
              >
                Empowering the Next Generation
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleEnterWebsite}
                className="bg-[#FEC301] text-[#002147] px-12 py-4 rounded-lg font-bold text-xl hover:bg-white transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <Play size={24} />
                Enter Website
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player Controls (floating) */}
      {audio && !showWelcome && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-2xl p-4 flex items-center gap-3"
        >
          <button
            onClick={togglePlayPause}
            className="w-12 h-12 rounded-full bg-[#002147] text-white flex items-center justify-center hover:bg-[#003370] transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-1 h-4 bg-white mr-0.5"></div>
                <div className="w-1 h-4 bg-white"></div>
              </div>
            ) : (
              <Play size={20} fill="white" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </motion.div>
      )}
    </>
  );
}

