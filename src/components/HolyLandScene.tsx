import React, { useState } from 'react';
import { Globe, MapPin, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const HolyLandScene: React.FC = () => {
  const [currentScene, setCurrentScene] = useState('road-to-emmaus');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const scenes = [
    {
      id: 'road-to-emmaus',
      name: 'Road to Emmaus',
      description: 'Walk with Jesus on the road to Emmaus',
      image: '🏔️',
      triggers: ['narration', 'prophecy', 'verses']
    },
    {
      id: 'garden-of-gethsemane',
      name: 'Garden of Gethsemane',
      description: 'Experience Jesus\' prayer in the garden',
      image: '🌳',
      triggers: ['prayer', 'reflection', 'verses']
    },
    {
      id: 'mount-sinai',
      name: 'Mount Sinai',
      description: 'Stand where Moses received the Law',
      image: '⛰️',
      triggers: ['revelation', 'prophecy', 'verses']
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Globe className="h-8 w-8 text-scroll-400 scroll-glow" />
          <h1 className="text-4xl font-scroll font-bold text-white">Holy Land Scene</h1>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="scroll-card">
              <h3 className="text-xl font-scroll text-white mb-4">3D Bible Environment</h3>
              <div className="bg-black rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {scenes.find(s => s.id === currentScene)?.image}
                  </div>
                  <p className="text-scroll-200">3D Scene Loading...</p>
                  <p className="text-scroll-400 text-sm mt-2">React Three Fiber + WebXR</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Scene Selection</h3>
              <div className="space-y-3">
                {scenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setCurrentScene(scene.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-300 ${
                      currentScene === scene.id
                        ? 'border-scroll-500 bg-scroll-800/50 text-scroll-200'
                        : 'border-scroll-600/30 bg-scroll-800/20 text-scroll-300 hover:border-scroll-500 hover:bg-scroll-800/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{scene.image}</span>
                      <div className="text-left">
                        <h4 className="font-medium">{scene.name}</h4>
                        <p className="text-xs opacity-75">{scene.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Controls</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 rounded-lg bg-scroll-500 hover:bg-scroll-600 text-white transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 rounded-lg bg-scroll-500/20 text-scroll-300 hover:bg-scroll-600/20 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolyLandScene; 