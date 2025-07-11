import React, { useState } from 'react';
import { FileText, Save, Eye, Image, Type, Music } from 'lucide-react';
import axios from 'axios';

const ScrollComposer: React.FC = () => {
  const [slideTitle, setSlideTitle] = useState('');
  const [slideContent, setSlideContent] = useState('');
  const [slideType, setSlideType] = useState('scripture');

  const slideTypes = [
    { id: 'scripture', name: 'Scripture', icon: Type },
    { id: 'worship', name: 'Worship', icon: Music },
    { id: 'image', name: 'Image', icon: Image }
  ];

  const saveSlide = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/save-scroll', {
        title: slideTitle,
        content: slideContent,
        type: slideType
      });
    } catch (error) {
      console.error('Error saving slide:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <FileText className="h-8 w-8 text-scroll-400 scroll-glow" />
          <h1 className="text-4xl font-scroll font-bold text-white">Scroll Composer</h1>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="scroll-card">
            <h3 className="text-xl font-scroll text-white mb-4">Create Sacred Slide</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Slide Title"
                value={slideTitle}
                onChange={(e) => setSlideTitle(e.target.value)}
                className="w-full p-3 bg-scroll-800/50 border border-scroll-600/30 rounded-lg text-white placeholder-scroll-400"
              />
              
              <div className="flex space-x-2">
                {slideTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSlideType(type.id)}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        slideType === type.id
                          ? 'border-scroll-500 bg-scroll-800/50 text-scroll-200'
                          : 'border-scroll-600/30 bg-scroll-800/20 text-scroll-300 hover:border-scroll-500 hover:bg-scroll-800/30'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  );
                })}
              </div>
              
              <textarea
                placeholder="Enter slide content..."
                value={slideContent}
                onChange={(e) => setSlideContent(e.target.value)}
                className="w-full h-32 p-3 bg-scroll-800/50 border border-scroll-600/30 rounded-lg text-white placeholder-scroll-400 resize-none"
              />
              
              <div className="flex space-x-2">
                <button onClick={saveSlide} className="sacred-button">
                  <Save className="h-5 w-5 mr-2" />
                  Save Slide
                </button>
                <button className="bg-prophetic-500 hover:bg-prophetic-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Eye className="h-5 w-5 mr-2" />
                  Preview
                </button>
              </div>
            </div>
          </div>
          
          <div className="scroll-card">
            <h3 className="text-xl font-scroll text-white mb-4">Slide Preview</h3>
            <div className="bg-white rounded-lg p-6 text-black min-h-64">
              <h2 className="text-2xl font-bold mb-4">{slideTitle || 'Slide Title'}</h2>
              <p className="text-lg">{slideContent || 'Slide content will appear here...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollComposer; 