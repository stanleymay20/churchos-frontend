import React, { useState } from 'react';
import { Radio, Play, Users, MessageSquare } from 'lucide-react';
import axios from 'axios';

const GoLiveWithHeaven: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [streamTitle, setStreamTitle] = useState('');

  const topics = [
    {
      id: 'warfare_prayer',
      name: 'Warfare Prayer',
      description: 'Spiritual warfare and intercession',
      duration: 60
    },
    {
      id: 'open_heaven_ghana',
      name: 'Open Heaven: Ghana',
      description: 'Prophetic intercession for Ghana',
      duration: 90
    },
    {
      id: 'revival_fire',
      name: 'Revival Fire',
      description: 'Calling for revival and awakening',
      duration: 120
    },
    {
      id: 'prophetic_worship',
      name: 'Prophetic Worship',
      description: 'Worship and prophetic flow',
      duration: 75
    }
  ];

  const startLivestream = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/go-live/start', {
        title: streamTitle || 'Sacred Livestream',
        topic: selectedTopic
      });
    } catch (error) {
      console.error('Error starting livestream:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Radio className="h-8 w-8 text-scroll-400 scroll-glow" />
          <h1 className="text-4xl font-scroll font-bold text-white">Go Live With Heaven</h1>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="scroll-card">
              <h3 className="text-xl font-scroll text-white mb-4">Sacred Livestream</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Stream Title"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  className="w-full p-3 bg-scroll-800/50 border border-scroll-600/30 rounded-lg text-white placeholder-scroll-400"
                />
                
                <div className="grid gap-4 md:grid-cols-2">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        selectedTopic === topic.id
                          ? 'border-scroll-500 bg-scroll-800/50 text-scroll-200'
                          : 'border-scroll-600/30 bg-scroll-800/20 text-scroll-300 hover:border-scroll-500 hover:bg-scroll-800/30'
                      }`}
                    >
                      <h4 className="font-medium mb-1">{topic.name}</h4>
                      <p className="text-xs opacity-75 mb-2">{topic.description}</p>
                      <span className="text-xs bg-scroll-500/20 text-scroll-300 px-2 py-1 rounded">
                        {topic.duration} min
                      </span>
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={startLivestream}
                  className="w-full sacred-button"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Sacred Livestream
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Intercessor Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-prophetic-800/50 rounded-lg border border-prophetic-600/30">
                  <Users className="h-5 w-5 text-prophetic-400" />
                  <span className="text-prophetic-200">Prayer Team Alerted</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-prophetic-800/50 rounded-lg border border-prophetic-600/30">
                  <MessageSquare className="h-5 w-5 text-prophetic-400" />
                  <span className="text-prophetic-200">Prophets Notified</span>
                </div>
              </div>
            </div>
            
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Scheduled Streams</h3>
              <div className="space-y-3">
                <div className="p-3 bg-scroll-800/50 rounded-lg border border-scroll-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">Morning Prayer</h4>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                      Today
                    </span>
                  </div>
                  <p className="text-sm text-scroll-300">6:00 AM - 7:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoLiveWithHeaven; 