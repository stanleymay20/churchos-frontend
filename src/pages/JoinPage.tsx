import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ScrollLicenseRequest {
  name: string;
  email: string;
  role: string;
  purpose: string;
  country: string;
  ministry: string;
  teamSize: string;
  experience: string;
}

const JoinPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ScrollLicenseRequest>({
    name: '',
    email: '',
    role: '',
    purpose: '',
    country: '',
    ministry: '',
    teamSize: '',
    experience: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send ScrollLicense request to backend
      const response = await fetch('/api/scroll-license/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to thank you page
        navigate('/join/thank-you');
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting ScrollLicense request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sacred Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Sacred Header */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-orange-500 bg-opacity-20">
              <span className="text-2xl">📜</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white font-cinzel">
              Request Sacred Access
            </h2>
            <p className="mt-2 text-sm text-orange-200">
              Join the global prophetic community with CHURCHOS™
            </p>
          </div>

          {/* ScrollLicense Request Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Name */}
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-orange-200 text-white bg-slate-800 bg-opacity-50 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-orange-200 text-white bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Ministry Role */}
              <div>
                <label htmlFor="role" className="sr-only">
                  Ministry Role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-orange-200 text-white bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="">Select Your Ministry Role</option>
                  <option value="intercessor">Intercessor</option>
                  <option value="prophet">Prophet</option>
                  <option value="pastor">Pastor</option>
                  <option value="apostle">Apostle</option>
                  <option value="elder">Elder</option>
                  <option value="deacon">Deacon</option>
                  <option value="worship_leader">Worship Leader</option>
                  <option value="youth_leader">Youth Leader</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-orange-200 text-white bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">Select Your Country</option>
                  <option value="us">United States</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                  <option value="gh">Ghana</option>
                  <option value="ng">Nigeria</option>
                  <option value="il">Israel</option>
                  <option value="sa">Saudi Arabia</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Ministry Name */}
              <div>
                <label htmlFor="ministry" className="sr-only">
                  Ministry/Church Name
                </label>
                <input
                  id="ministry"
                  name="ministry"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-orange-200 text-white bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Ministry/Church Name"
                  value={formData.ministry}
                  onChange={handleInputChange}
                />
              </div>

              {/* Team Size */}
              <div>
                <label htmlFor="teamSize" className="sr-only">
                  Team Size
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-orange-200 text-white bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                >
                  <option value="">Select Team Size</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-20">6-20 people</option>
                  <option value="21-50">21-50 people</option>
                  <option value="51-100">51-100 people</option>
                  <option value="100+">100+ people</option>
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label htmlFor="experience" className="sr-only">
                  Ministry Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-orange-200 text-white bg-slate-800 bg-opacity-50 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  value={formData.experience}
                  onChange={handleInputChange}
                >
                  <option value="">Select Experience Level</option>
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">Intermediate (3-5 years)</option>
                  <option value="advanced">Advanced (6-10 years)</option>
                  <option value="expert">Expert (10+ years)</option>
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="purpose" className="sr-only">
                  Ministry Purpose
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  rows={4}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-orange-200 text-white bg-slate-800 bg-opacity-50 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Describe your ministry purpose and how you plan to use CHURCHOS™..."
                  value={formData.purpose}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Sacred Commitment */}
            <div className="bg-slate-800 bg-opacity-30 rounded-lg p-4 border border-orange-300 border-opacity-30">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Sacred Commitment</h3>
              <p className="text-sm text-orange-200">
                By requesting access to CHURCHOS™, I commit to:
              </p>
              <ul className="text-sm text-orange-200 mt-2 space-y-1">
                <li>• Using technology to enhance, not replace, prophetic ministry</li>
                <li>• Maintaining prayer as the foundation of all activities</li>
                <li>• Building community and strengthening relationships</li>
                <li>• Embracing continuous growth and learning</li>
                <li>• Contributing to the global prophetic community</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting Sacred Request...
                  </div>
                ) : (
                  'Request ScrollLicense Access'
                )}
              </button>
            </div>

            {/* Sacred Information */}
            <div className="text-center">
              <p className="text-xs text-orange-300">
                "For the word of God is living and active, sharper than any two-edged sword." - Hebrews 4:12
              </p>
            </div>
          </form>

          {/* Back to Home */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-orange-300 hover:text-orange-200 text-sm transition-colors duration-200"
            >
              ← Back to CHURCHOS™ Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPage; 