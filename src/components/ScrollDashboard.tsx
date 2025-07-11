import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Clock, 
  AlertTriangle, 
  Users, 
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  ScrollText
} from 'lucide-react';
import axios from 'axios';

interface Prophecy {
  id: string;
  message: string;
  timestamp: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  role: 'Deacon' | 'Elder' | 'Apostle' | 'Nation Seer';
  status: 'pending' | 'in-progress' | 'completed';
}

interface ScrollCycle {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  participants: number;
  prophecies: number;
  status: 'active' | 'completed' | 'scheduled';
}

interface DashboardData {
  prophecies: Prophecy[];
  scrollCycles: ScrollCycle[];
  currentUser: {
    name: string;
    role: string;
    permissions: string[];
  };
}

const ScrollDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch dashboard data from backend
  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ['scrollDashboard'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/scroll-dashboard');
      return response.data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 10000,
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ScrollText className="h-12 w-12 text-scroll-400 animate-spin mx-auto mb-4" />
          <p className="text-scroll-200 font-prophetic">Loading Sacred Scrolls...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-200">Error loading dashboard data</p>
        </div>
      </div>
    );
  }

  const criticalProphecies = dashboardData?.prophecies.filter(p => p.urgency === 'critical') || [];
  const activeCycles = dashboardData?.scrollCycles.filter(c => c.status === 'active') || [];
  const pendingAssignments = dashboardData?.prophecies.filter(p => p.status === 'pending') || [];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-scroll font-bold text-white mb-2">
                Scroll Dashboard
              </h1>
              <p className="text-scroll-200 font-prophetic">
                Sacred Time: {currentTime.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-scroll-300">
                Welcome, {dashboardData?.currentUser.name}
              </p>
              <span className="exousia-badge">
                {dashboardData?.currentUser.role}
              </span>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        {criticalProphecies.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-scroll text-red-200">Critical Prophecies</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {criticalProphecies.map((prophecy) => (
                <div key={prophecy.id} className="prophetic-alert border-red-400">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-white font-medium mb-2">{prophecy.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-red-200">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(prophecy.timestamp).toLocaleTimeString()}</span>
                        </span>
                        <span className="exousia-badge">{prophecy.role}</span>
                      </div>
                    </div>
                    <Zap className="h-5 w-5 text-red-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Scroll Cycles */}
          <div className="scroll-card">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-scroll-400" />
              <h3 className="text-xl font-scroll text-white">Active Scroll Cycles</h3>
            </div>
            <div className="space-y-4">
              {activeCycles.map((cycle) => (
                <div key={cycle.id} className="bg-scroll-800/50 rounded-lg p-4 border border-scroll-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{cycle.name}</h4>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                      Active
                    </span>
                  </div>
                  <div className="text-sm text-scroll-300 space-y-1">
                    <p>Start: {new Date(cycle.startTime).toLocaleTimeString()}</p>
                    <p>Participants: {cycle.participants}</p>
                    <p>Prophecies: {cycle.prophecies}</p>
                  </div>
                </div>
              ))}
              {activeCycles.length === 0 && (
                <p className="text-scroll-400 text-center py-4">No active scroll cycles</p>
              )}
            </div>
          </div>

          {/* Time-Sensitive Assignments */}
          <div className="scroll-card">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-6 w-6 text-prophetic-400" />
              <h3 className="text-xl font-scroll text-white">Time-Sensitive Assignments</h3>
            </div>
            <div className="space-y-4">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="bg-prophetic-800/50 rounded-lg p-4 border border-prophetic-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{assignment.assignedTo}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      assignment.urgency === 'high' ? 'bg-orange-500/20 text-orange-300' :
                      assignment.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {assignment.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-prophetic-300 mb-2">{assignment.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="exousia-badge">{assignment.role}</span>
                    <span className="text-xs text-prophetic-400">
                      {new Date(assignment.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {pendingAssignments.length === 0 && (
                <p className="text-prophetic-400 text-center py-4">No pending assignments</p>
              )}
            </div>
          </div>

          {/* Role-Based Access */}
          <div className="scroll-card">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-sacred-400" />
              <h3 className="text-xl font-scroll text-white">EXOUSIA Access</h3>
            </div>
            <div className="space-y-4">
              {dashboardData?.currentUser.permissions.map((permission, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-sacred-800/50 rounded-lg border border-sacred-600/30">
                  <div className="w-2 h-2 bg-sacred-400 rounded-full"></div>
                  <span className="text-sm text-sacred-200">{permission}</span>
                </div>
              ))}
              <div className="mt-6 p-4 bg-gradient-to-r from-exousia-600/20 to-exousia-700/20 rounded-lg border border-exousia-500/30">
                <h4 className="font-medium text-white mb-2">Current Role</h4>
                <p className="text-exousia-200">{dashboardData?.currentUser.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Prophecies */}
        <div className="mt-8">
          <div className="flex items-center space-x-2 mb-4">
            <ScrollText className="h-6 w-6 text-scroll-400" />
            <h3 className="text-2xl font-scroll text-white">Recent Prophecies</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dashboardData?.prophecies.slice(0, 6).map((prophecy) => (
              <div key={prophecy.id} className="scroll-card">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    prophecy.urgency === 'critical' ? 'bg-red-500/20 text-red-300' :
                    prophecy.urgency === 'high' ? 'bg-orange-500/20 text-orange-300' :
                    prophecy.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {prophecy.urgency}
                  </span>
                  <span className="exousia-badge">{prophecy.role}</span>
                </div>
                <p className="text-white mb-3">{prophecy.message}</p>
                <div className="flex items-center justify-between text-sm text-scroll-300">
                  <span>{prophecy.assignedTo}</span>
                  <span>{new Date(prophecy.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollDashboard; 