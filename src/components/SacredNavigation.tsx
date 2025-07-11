import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Heart, 
  Users, 
  Globe, 
  FileText, 
  Shield, 
  Smartphone, 
  Radio,
  ScrollText,
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react';

// Define user role types for TypeScript
type UserRole = 'Deacon' | 'Elder' | 'Apostle' | 'Nation Seer';

interface SacredNavigationProps {
  currentUser?: {
    name: string;
    role: UserRole;
    permissions: string[];
  };
  onLogout?: () => void;
}

const SacredNavigation: React.FC<SacredNavigationProps> = ({ 
  currentUser = { name: 'Prophet Sarah', role: 'Nation Seer', permissions: [] },
  onLogout 
}) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define navigation items with role requirements
  const navItems = [
    { 
      path: '/', 
      label: 'Scroll Dashboard', 
      icon: Home,
      requiredRole: 'Deacon' as UserRole,
      requiredPermission: 'view_prophecies'
    },
    { 
      path: '/prayer-portal', 
      label: 'Prayer Portal', 
      icon: Heart,
      requiredRole: 'Deacon' as UserRole,
      requiredPermission: 'join_prayer_sessions'
    },
    { 
      path: '/bible-characters', 
      label: 'Bible Characters', 
      icon: Users,
      requiredRole: 'Elder' as UserRole,
      requiredPermission: 'access_bible_characters'
    },
    { 
      path: '/holy-land', 
      label: 'Holy Land', 
      icon: Globe,
      requiredRole: 'Elder' as UserRole,
      requiredPermission: 'view_holy_land'
    },
    { 
      path: '/composer', 
      label: 'Scroll Composer', 
      icon: FileText,
      requiredRole: 'Apostle' as UserRole,
      requiredPermission: 'create_scroll_compositions'
    },
    { 
      path: '/seal', 
      label: 'Scroll Seal', 
      icon: Shield,
      requiredRole: 'Apostle' as UserRole,
      requiredPermission: 'manage_users'
    },
    { 
      path: '/mobile-control', 
      label: 'Mobile Control', 
      icon: Smartphone,
      requiredRole: 'Apostle' as UserRole,
      requiredPermission: 'start_livestreams'
    },
    { 
      path: '/go-live', 
      label: 'Go Live', 
      icon: Radio,
      requiredRole: 'Apostle' as UserRole,
      requiredPermission: 'start_livestreams'
    },
  ];

  // Role hierarchy for permission checking
  const roleHierarchy: Record<UserRole, number> = {
    'Deacon': 1,
    'Elder': 2,
    'Apostle': 3,
    'Nation Seer': 4
  };

  // Check if user has access to a navigation item
  const hasAccess = (item: typeof navItems[0]): boolean => {
    const userRoleLevel = roleHierarchy[currentUser.role];
    const requiredRoleLevel = roleHierarchy[item.requiredRole];
    
    // Check role level
    if (userRoleLevel < requiredRoleLevel) {
      return false;
    }
    
    // Check specific permission if required
    if (item.requiredPermission && !currentUser.permissions.includes(item.requiredPermission)) {
      return false;
    }
    
    return true;
  };

  // Filter navigation items based on user permissions
  const accessibleNavItems = navItems.filter(hasAccess);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-scroll-900/95 to-sacred-900/95 backdrop-blur-md border-b border-scroll-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ScrollText className="h-8 w-8 text-scroll-400 scroll-glow" />
                <span className="text-xl font-scroll font-bold text-white">
                  CHURCHOS™
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {accessibleNavItems.map((item) => {
                  const Icon = item.icon;
                  
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium 
                        transition-all duration-300 transform hover:scale-105
                        ${isActive
                          ? 'bg-scroll-600/30 text-scroll-200 border border-scroll-500/50 shadow-scroll-500/25'
                          : 'text-gray-300 hover:text-scroll-200 hover:bg-scroll-800/30 hover:border-scroll-600/30'
                        }
                      `}
                      onClick={closeMobileMenu}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* User Info and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-scroll-300">{currentUser.name}</p>
                  <span className="exousia-badge">
                    {currentUser.role}
                  </span>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-2 text-scroll-300 hover:text-scroll-200 hover:bg-scroll-800/30 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-300 hover:text-scroll-200 p-2 rounded-lg hover:bg-scroll-800/30 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-scroll-900/95 backdrop-blur-md border-b border-scroll-500/30">
          <div className="px-4 py-4 space-y-2">
            {/* User Info Mobile */}
            <div className="flex items-center space-x-3 p-3 bg-scroll-800/50 rounded-lg border border-scroll-600/30 mb-4">
              <User className="h-5 w-5 text-scroll-400" />
              <div className="flex-1">
                <p className="text-sm text-scroll-200 font-medium">{currentUser.name}</p>
                <span className="exousia-badge text-xs">
                  {currentUser.role}
                </span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 text-scroll-300 hover:text-scroll-200 hover:bg-scroll-700/30 rounded transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Mobile Navigation Links */}
            {accessibleNavItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium 
                    transition-all duration-300
                    ${isActive
                      ? 'bg-scroll-600/30 text-scroll-200 border border-scroll-500/50'
                      : 'text-gray-300 hover:text-scroll-200 hover:bg-scroll-800/30'
                    }
                  `}
                  onClick={closeMobileMenu}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default SacredNavigation; 