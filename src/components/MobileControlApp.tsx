import React, { useState } from 'react';
import { Smartphone, Play, Send } from 'lucide-react';
import axios from 'axios';

const MobileControlApp: React.FC = () => {
  const [isServiceActive, setIsServiceActive] = useState(false);
  const [projectionContent, setProjectionContent] = useState('');

  const startService = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/mobile/start-service', {
        type: 'prayer_service'
      });
      setIsServiceActive(true);
    } catch (error) {
      console.error('Error starting service:', error);
    }
  };

  const projectContent = async () => {
    if (!projectionContent.trim()) return;
    
    try {
      await axios.post('http://localhost:8000/api/v1/mobile/project-content', {
        type: 'scripture',
        content: projectionContent,
        duration: 30
      });
      setProjectionContent('');
    } catch (error) {
      console.error('Error projecting content:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Smartphone className="h-8 w-8 text-scroll-400 scroll-glow" />
          <h1 className="text-4xl font-scroll font-bold text-white">Mobile Control</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="scroll-card">
            <h3 className="text-xl font-scroll text-white mb-4">Service Control</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-scroll-800/50 rounded-lg border border-scroll-600/30">
                <span className="text-scroll-200">Prayer Service</span>
                <span className={`w-3 h-3 rounded-full ${isServiceActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </div>
              
              <button
                onClick={startService}
                className="w-full sacred-button"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Service
              </button>
            </div>
          </div>
          
          <div className="scroll-card">
            <h3 className="text-xl font-scroll text-white mb-4">Content Projection</h3>
            <div className="space-y-4">
              <textarea
                placeholder="Enter scripture or prayer to project..."
                value={projectionContent}
                onChange={(e) => setProjectionContent(e.target.value)}
                className="w-full h-24 p-3 bg-scroll-800/50 border border-scroll-600/30 rounded-lg text-white placeholder-scroll-400 resize-none"
              />
              
              <button
                onClick={projectContent}
                className="w-full bg-prophetic-500 hover:bg-prophetic-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Send className="h-5 w-5 mr-2" />
                Project to Stage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileControlApp; 