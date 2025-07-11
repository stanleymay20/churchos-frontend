import React, { useState, useRef } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  MessageSquare,
  Upload,
  ScrollText
} from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface PrayerSession {
  id: string;
  title: string;
  stream_url: string;
  is_live: boolean;
  participants_count: number;
}

interface PrayerLog {
  id: string;
  user_name: string;
  prayer_text: string;
  timestamp: string;
}

const ScrollPrayerPortal: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [prayerText, setPrayerText] = useState('');
  const [sessionTitle] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Fetch active prayer sessions
  const { data: activeSessions } = useQuery<PrayerSession[]>({
    queryKey: ['prayerSessions'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/v1/prayer-sessions');
      return response.data;
    },
    refetchInterval: 5000,
  });

  // Fetch prayer logs
  const { data: prayerLogs } = useQuery<PrayerLog[]>({
    queryKey: ['prayerLogs'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/v1/prayer-logs');
      return response.data;
    },
    refetchInterval: 3000,
  });

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      setIsStreaming(true);
      
      // Start stream on backend
      await axios.post('http://localhost:8000/api/v1/start-stream', {
        title: sessionTitle || 'Sacred Prayer Session',
        description: 'Live intercession and prayer'
      });
      
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  const logPrayer = async () => {
    if (!prayerText.trim()) return;
    
    try {
      await axios.post('http://localhost:8000/api/v1/log-prayer', {
        prayer_text: prayerText,
        session_id: 'current_session'
      });
      
      setPrayerText('');
    } catch (error) {
      console.error('Error logging prayer:', error);
    }
  };

  const uploadDecree = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/upload-decree', {
        decree_text: prayerText,
        type: 'prophetic_decree'
      });
      
      setPrayerText('');
    } catch (error) {
      console.error('Error uploading decree:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <ScrollText className="h-8 w-8 text-scroll-400 scroll-glow" />
            <h1 className="text-4xl font-scroll font-bold text-white">
              Scroll Prayer Portal
            </h1>
          </div>
          <p className="text-scroll-200 font-prophetic">
            Sacred livestream and intercession room for divine communication
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Video Area */}
          <div className="lg:col-span-2">
            <div className="scroll-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-scroll text-white">Sacred Livestream</h3>
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${isStreaming ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-scroll-300">
                    {isStreaming ? 'LIVE' : 'OFFLINE'}
                  </span>
                </div>
              </div>
              
              {/* Video Display */}
              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                {!isStreaming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center">
                      <Video className="h-12 w-12 text-scroll-400 mx-auto mb-2" />
                      <p className="text-scroll-200">Ready to start sacred stream</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stream Controls */}
              <div className="flex items-center justify-center space-x-4">
                {!isStreaming ? (
                  <button
                    onClick={startStream}
                    className="sacred-button"
                  >
                    <Video className="h-5 w-5 mr-2" />
                    Start Sacred Stream
                  </button>
                ) : (
                  <>
                    <button
                      onClick={toggleMute}
                      className={`p-3 rounded-full ${
                        isMuted ? 'bg-red-500/20 text-red-300' : 'bg-scroll-500/20 text-scroll-300'
                      }`}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={toggleVideo}
                      className={`p-3 rounded-full ${
                        !isVideoOn ? 'bg-red-500/20 text-red-300' : 'bg-scroll-500/20 text-scroll-300'
                      }`}
                    >
                      {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={stopStream}
                      className="p-3 rounded-full bg-red-500/20 text-red-300"
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Prayer Log and Controls */}
          <div className="space-y-6">
            {/* Prayer Input */}
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Prayer & Decrees</h3>
              <textarea
                value={prayerText}
                onChange={(e) => setPrayerText(e.target.value)}
                placeholder="Enter your prayer or prophetic decree..."
                className="w-full h-32 p-3 bg-scroll-800/50 border border-scroll-600/30 rounded-lg text-white placeholder-scroll-400 resize-none"
              />
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={logPrayer}
                  className="flex-1 sacred-button"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Log Prayer
                </button>
                <button
                  onClick={uploadDecree}
                  className="flex-1 bg-sacred-500 hover:bg-sacred-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Decree
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Active Sessions</h3>
              <div className="space-y-3">
                {activeSessions?.map((session) => (
                  <div key={session.id} className="bg-scroll-800/50 rounded-lg p-3 border border-scroll-600/30">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{session.title}</h4>
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                        {session.participants_count} participants
                      </span>
                    </div>
                    <p className="text-sm text-scroll-300 mt-1">
                      {session.is_live ? 'LIVE' : 'Scheduled'}
                    </p>
                  </div>
                ))}
                {(!activeSessions || activeSessions.length === 0) && (
                  <p className="text-scroll-400 text-center py-4">No active sessions</p>
                )}
              </div>
            </div>

            {/* Recent Prayers */}
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Recent Prayers</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {prayerLogs?.map((log) => (
                  <div key={log.id} className="bg-prophetic-800/50 rounded-lg p-3 border border-prophetic-600/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{log.user_name}</span>
                      <span className="text-xs text-prophetic-400">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-prophetic-300">{log.prayer_text}</p>
                  </div>
                ))}
                {(!prayerLogs || prayerLogs.length === 0) && (
                  <p className="text-prophetic-400 text-center py-4">No prayers logged yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPrayerPortal; 