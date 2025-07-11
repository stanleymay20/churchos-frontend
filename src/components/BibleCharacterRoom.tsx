import React, { useState } from 'react';
import axios from 'axios';

interface BibleCharacter {
  id: string;
  name: string;
  description: string;
  personality: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'character';
  timestamp: Date;
}

const BibleCharacterRoom: React.FC = () => {
  const [message, setMessage] = useState('');
  const [character, setCharacter] = useState<string>('jesus');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);

  const characters: BibleCharacter[] = [
    {
      id: 'jesus',
      name: 'Jesus',
      description: 'The Son of God, Savior of the world',
      personality: 'Compassionate, wise, loving, and authoritative'
    },
    {
      id: 'paul',
      name: 'Paul',
      description: 'Apostle to the Gentiles, author of many epistles',
      personality: 'Passionate, bold, scholarly, and mission-driven'
    },
    {
      id: 'esther',
      name: 'Esther',
      description: 'Queen of Persia, saved her people from destruction',
      personality: 'Courageous, wise, strategic, and faithful'
    },
    {
      id: 'david',
      name: 'David',
      description: 'King of Israel, man after God\'s own heart',
      personality: 'Worshipful, repentant, courageous, and poetic'
    }
  ];

  const selectedCharacter = characters.find(c => c.id === character);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/v1/ai-character', {
        message: message,
        character: character
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response,
        sender: 'character',
        timestamp: new Date()
      };

      setConversation(prev => [...prev, characterMessage]);
      setResponse(response.data.response);
    } catch (error) {
      console.error('Error sending message:', error);
      setResponse('I apologize, but I am unable to respond at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setResponse('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 scroll-glow">
            Bible Character Room
          </h1>
          <p className="text-blue-200 text-lg">
            Speak with AI-powered Bible characters and receive divine wisdom
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">Choose Character</h2>
              
              <div className="space-y-4">
                {characters.map((char) => (
                  <div
                    key={char.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      character === char.id
                        ? 'bg-blue-600/50 border-2 border-blue-400'
                        : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                    }`}
                    onClick={() => setCharacter(char.id)}
                  >
                    <h3 className="text-lg font-semibold text-white">{char.name}</h3>
                    <p className="text-blue-200 text-sm mt-1">{char.description}</p>
                    <p className="text-gray-300 text-xs mt-2">{char.personality}</p>
                  </div>
                ))}
              </div>

              {selectedCharacter && (
                <div className="mt-6 p-4 bg-blue-600/20 rounded-lg border border-blue-400/30">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Currently Speaking with: {selectedCharacter.name}
                  </h3>
                  <p className="text-blue-200 text-sm">
                    {selectedCharacter.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Conversation Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 h-[600px] flex flex-col">
              {/* Conversation Header */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/20">
                <h2 className="text-2xl font-semibold text-white">
                  Conversation with {selectedCharacter?.name}
                </h2>
                <button
                  onClick={clearConversation}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Clear Chat
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {conversation.length === 0 ? (
                  <div className="text-center text-gray-400 mt-8">
                    <p className="text-lg">Start a conversation with {selectedCharacter?.name}</p>
                    <p className="text-sm mt-2">Ask questions, seek guidance, or simply chat</p>
                  </div>
                ) : (
                  conversation.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/20 text-white border border-white/30'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/20 text-white border border-white/30 max-w-xs lg:max-w-md p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-white/20 pt-4">
                <div className="flex space-x-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask ${selectedCharacter?.name} a question...`}
                    className="flex-1 p-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !message.trim()}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 self-end"
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Display */}
        {response && (
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-3">Latest Response</h3>
            <div className="bg-white/20 p-4 rounded-lg border border-white/30">
              <p className="text-white leading-relaxed">{response}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibleCharacterRoom; 