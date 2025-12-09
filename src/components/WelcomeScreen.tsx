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
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    // Check if user has already entered the website
    const hasEntered = localStorage.getItem("website_entered");
    
    if (hasEntered) {
      // User has entered before, load music settings but don't auto-play
      // Audio will only play after user interaction (click, touch, etc.)
      loadMusicSettings();
    } else {
      // First time visitor - show welcome screen
      setShowWelcome(true);
      loadMusicSettings();
    }
  }, []);

  // Handle user interaction for returning visitors to start music
  useEffect(() => {
    if (!audio || !musicSettings || !musicSettings.enabled || !musicSettings.music_url || isPlaying) {
      return;
    }

    // Add one-time user interaction listener for returning visitors
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      // Try to start music after user interaction
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Silently handle - user may have blocked autoplay
            console.log("Audio playback requires explicit user interaction:", error);
          });
      }
    };
    
    // Add listeners for user interaction
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });
    
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [audio, musicSettings, isPlaying]);

  const loadMusicSettings = async () => {
    try {
      const response = await fetch("/api/music");
      const data = await response.json();
      
      if (data.enabled && data.music_url) {
        setMusicSettings(data);
        // Initialize audio but don't play yet - will play after user interaction
        initializeAudio(data, false);
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
    
    // Handle audio ended event
    audioElement.addEventListener("ended", () => {
      if (settings.loop && isPlaying) {
        audioElement.currentTime = 0;
        audioElement.play().catch((error) => {
          // Silently handle playback errors
          console.error("Error replaying audio:", error);
        });
      }
    });

    // Handle audio errors
    audioElement.addEventListener("error", (error) => {
      console.error("Audio error:", error);
    });

    setAudio(audioElement);
    
    // Only attempt to play if explicitly requested and after user interaction
    if (play) {
      // Use a promise to handle the play() call properly
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            // Silently handle autoplay errors - user interaction required
            console.log("Audio playback requires user interaction:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleEnterWebsite = () => {
    localStorage.setItem("website_entered", "true");
    setShowWelcome(false);
    
    // Start playing music after user interaction (clicking Enter Website)
    if (musicSettings && musicSettings.enabled && musicSettings.music_url) {
      if (audio) {
        // Audio already initialized, just play it
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Error playing audio after user interaction:", error);
              setIsPlaying(false);
            });
        }
      } else {
        // Initialize and play
        initializeAudio(musicSettings, true);
      }
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

