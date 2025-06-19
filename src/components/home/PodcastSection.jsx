import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

// Import the audio files
import thePresenceOfGod from '../../assets/audio/The-Presence-of-God-in-Covid19.mp3';
import usingAnger from '../../assets/audio/Using-anger.mp3';
import whoIsALeader from '../../assets/audio/Who-Is-A-True-Leader.m4a';

const PodcastSection = () => {
  // State for the audio player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentPodcastIndex, setCurrentPodcastIndex] = useState(0);
  
  // Ref for the audio element
  const audioRef = useRef(null);
  
  // List of podcasts
  const podcasts = [
    {
      id: 1,
      title: "The Presence of God in Covid-19",
      description: "Brother Ishmael Tetteh discusses the spiritual significance of the pandemic and finding divine presence during challenging times.",
      file: thePresenceOfGod,
      duration: ""
    },
    {
      id: 2,
      title: "Using Anger Constructively",
      description: "Learn how to transform anger into a catalyst for positive change and personal growth.",
      file: usingAnger,
      duration: ""
    },
    {
      id: 3,
      title: "Who Is A True Leader?",
      description: "Brother Ishmael explores the qualities of authentic leadership and how to embody these principles in everyday life.",
      file: whoIsALeader,
      duration: ""
    }
  ];

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle next podcast
  const playNextPodcast = () => {
    const nextIndex = (currentPodcastIndex + 1) % podcasts.length;
    setCurrentPodcastIndex(nextIndex);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Handle previous podcast
  const playPreviousPodcast = () => {
    const prevIndex = (currentPodcastIndex - 1 + podcasts.length) % podcasts.length;
    setCurrentPodcastIndex(prevIndex);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Handle time update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Handle loading metadata
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Handle end of audio
  const handleEnded = () => {
    playNextPodcast();
  };

  // Handle seeking
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // Format time in MM:SS
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Set up audio when component mounts or when podcast changes
  useEffect(() => {
    if (audioRef.current) {
      // Set the source
      audioRef.current.src = podcasts[currentPodcastIndex].file;
      audioRef.current.load();
      
      // If it was playing before, play the new podcast
      if (isPlaying) {
        audioRef.current.play();
      }
      
      // Set volume
      audioRef.current.volume = volume;
    }
  }, [currentPodcastIndex]);

  // Select a specific podcast to play
  const selectPodcast = (index) => {
    setCurrentPodcastIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Conscious Insights Podcast
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gain wisdom and transformation through Brother Ishmael Tetteh's teachings. 
            Listen to our latest episodes exploring consciousness, spiritual growth, and purposeful living.
          </p>
        </div>

        {/* Audio player */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <audio 
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />
          
          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold text-green-600">{currentPodcastIndex + 1}</span>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {podcasts[currentPodcastIndex].title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {podcasts[currentPodcastIndex].description}
              </p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mb-4">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={(currentTime / duration) * 100 || 0} 
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={playPreviousPodcast}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <SkipBack size={20} className="text-gray-700" />
              </button>
              <button 
                onClick={togglePlayPause}
                className="p-4 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
              >
                {isPlaying ? 
                  <Pause size={24} /> : 
                  <Play size={24} className="ml-1" />
                }
              </button>
              <button 
                onClick={playNextPodcast}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <SkipForward size={20} className="text-gray-700" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Volume2 size={18} className="text-gray-600" />
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume * 100} 
                onChange={handleVolumeChange}
                className="w-20 md:w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        {/* Podcast list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast, index) => (
            <div 
              key={podcast.id}
              onClick={() => selectPodcast(index)}
              className={`p-6 rounded-lg cursor-pointer transition-all hover:shadow-md
                ${currentPodcastIndex === index ? 'bg-green-50 border-2 border-green-200' : 'bg-white border border-gray-200'}
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{podcast.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{podcast.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{podcast.description}</p>
              <button 
                className={`mt-4 flex items-center ${currentPodcastIndex === index && isPlaying ? 'text-green-600' : 'text-gray-700'}`}
              >
                {currentPodcastIndex === index && isPlaying ? 
                  <><Pause size={16} /> <span className="ml-1">Now Playing</span></> : 
                  <><Play size={16} className="ml-1" /> <span className="ml-1">Listen Now</span></>
                }
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastSection;