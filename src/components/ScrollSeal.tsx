import React, { useState } from 'react';
import { Shield, Users, Key, Lock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ScrollSeal: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      name: 'Deacon',
      level: 1,
      permissions: ['view_prophecies', 'create_basic_prophecies', 'join_prayer_sessions'],
      color: 'text-blue-400'
    },
    {
      name: 'Elder',
      level: 2,
      permissions: ['view_prophecies', 'create_prophecies', 'manage_prayer_sessions', 'access_bible_characters', 'view_holy_land'],
      color: 'text-purple-400'
    },
    {
      name: 'Apostle',
      level: 3,
      permissions: ['view_prophecies', 'create_prophecies', 'manage_prayer_sessions', 'access_bible_characters', 'view_holy_land', 'create_scroll_compositions', 'manage_users', 'start_livestreams'],
      color: 'text-orange-400'
    },
    {
      name: 'Nation Seer',
      level: 4,
      permissions: ['view_prophecies', 'create_prophecies', 'manage_prayer_sessions', 'access_bible_characters', 'view_holy_land', 'create_scroll_compositions', 'manage_users', 'start_livestreams', 'manage_roles', 'access_all_modules', 'prophetic_oversight'],
      color: 'text-red-400'
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Shield className="h-8 w-8 text-scroll-400 scroll-glow" />
          <h1 className="text-4xl font-scroll font-bold text-white">Scroll Seal</h1>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="scroll-card">
            <h3 className="text-xl font-scroll text-white mb-4">EXOUSIA Access Control</h3>
            <div className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.name}
                  className="p-4 border border-scroll-600/30 rounded-lg bg-scroll-800/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-medium ${role.color}`}>{role.name}</h4>
                    <span className="text-xs bg-scroll-500/20 text-scroll-300 px-2 py-1 rounded">
                      Level {role.level}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {role.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-scroll-400" />
                        <span className="text-sm text-scroll-300">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Current Access</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-sacred-800/50 rounded-lg border border-sacred-600/30">
                  <Key className="h-5 w-5 text-sacred-400" />
                  <span className="text-sacred-200">Nation Seer</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-sacred-800/50 rounded-lg border border-sacred-600/30">
                  <Users className="h-5 w-5 text-sacred-400" />
                  <span className="text-sacred-200">Full System Access</span>
                </div>
              </div>
            </div>
            
            <div className="scroll-card">
              <h3 className="text-lg font-scroll text-white mb-4">Role Assignment</h3>
              <div className="space-y-3">
                <select className="w-full p-3 bg-scroll-800/50 border border-scroll-600/30 rounded-lg text-white">
                  <option value="">Select User</option>
                  <option value="user1">Prophet Sarah</option>
                  <option value="user2">Pastor Michael</option>
                  <option value="user3">Worship Leader David</option>
                </select>
                <select className="w-full p-3 bg-scroll-800/50 border border-scroll-600/30 rounded-lg text-white">
                  <option value="">Select Role</option>
                  <option value="deacon">Deacon</option>
                  <option value="elder">Elder</option>
                  <option value="apostle">Apostle</option>
                  <option value="nation_seer">Nation Seer</option>
                </select>
                <button className="w-full sacred-button">
                  Assign Role
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSeal; 