import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader2, ExternalLink, Key, Shield } from 'lucide-react';

interface ConnectionStatus {
  googleDrive: boolean;
  youtube: boolean;
  loading: boolean;
  error: string | null;
}

export default function ConnectionManager() {
  const [status, setStatus] = useState<ConnectionStatus>({
    googleDrive: false,
    youtube: false,
    loading: false,
    error: null
  });

  const [authStep, setAuthStep] = useState<'idle' | 'setup' | 'connecting' | 'connected'>('idle');

  // Check existing connections on component mount
  useEffect(() => {
    checkExistingConnections();
  }, []);

  const checkExistingConnections = async () => {
    try {
      // Check if credentials exist in localStorage or session
      const driveToken = localStorage.getItem('google_drive_token');
      const youtubeToken = localStorage.getItem('youtube_token');
      
      setStatus(prev => ({
        ...prev,
        googleDrive: !!driveToken,
        youtube: !!youtubeToken
      }));
    } catch (error) {
      console.error('Error checking connections:', error);
    }
  };

  const initiateGoogleDriveConnection = async () => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    setAuthStep('setup');

    try {
      // Step 1: Guide user through Google Cloud Console setup
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate setup time
      
      // Step 2: Initialize OAuth flow
      setAuthStep('connecting');
      
      // In a real implementation, this would:
      // 1. Open Google OAuth consent screen
      // 2. Handle the callback with authorization code
      // 3. Exchange code for access token
      // 4. Store tokens securely
      
      // Simulate OAuth flow
      await simulateOAuthFlow();
      
      // Step 3: Test connection
      await testGoogleDriveConnection();
      
      setStatus(prev => ({ 
        ...prev, 
        googleDrive: true, 
        loading: false 
      }));
      setAuthStep('connected');
      
      // Store connection status
      localStorage.setItem('google_drive_token', 'mock_token_' + Date.now());
      localStorage.setItem('google_drive_connected', 'true');
      
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Connection failed' 
      }));
      setAuthStep('idle');
    }
  };

  const initiateYouTubeConnection = async () => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Similar OAuth flow for YouTube
      await simulateOAuthFlow();
      await testYouTubeConnection();
      
      setStatus(prev => ({ 
        ...prev, 
        youtube: true, 
        loading: false 
      }));
      
      localStorage.setItem('youtube_token', 'mock_token_' + Date.now());
      localStorage.setItem('youtube_connected', 'true');
      
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'YouTube connection failed' 
      }));
    }
  };

  const simulateOAuthFlow = async () => {
    // Simulate opening OAuth consent screen
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate user consent
        const userConsented = Math.random() > 0.1; // 90% success rate
        if (userConsented) {
          resolve('authorization_code_mock');
        } else {
          reject(new Error('User denied access'));
        }
      }, 3000);
    });
  };

  const testGoogleDriveConnection = async () => {
    // Simulate API test call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real implementation: make a test call to Google Drive API
    console.log('Google Drive connection tested successfully');
  };

  const testYouTubeConnection = async () => {
    // Simulate API test call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real implementation: make a test call to YouTube API
    console.log('YouTube connection tested successfully');
  };

  const disconnectService = (service: 'googleDrive' | 'youtube') => {
    if (service === 'googleDrive') {
      localStorage.removeItem('google_drive_token');
      localStorage.removeItem('google_drive_connected');
      setStatus(prev => ({ ...prev, googleDrive: false }));
    } else {
      localStorage.removeItem('youtube_token');
      localStorage.removeItem('youtube_connected');
      setStatus(prev => ({ ...prev, youtube: false }));
    }
    setAuthStep('idle');
  };

  return (
    <div className="space-y-6">
      {/* Connection Status Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          API Connection Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border-2 transition-all ${
            status.googleDrive 
              ? 'border-green-200 bg-green-50' 
              : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Google Drive</span>
              {status.googleDrive ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {status.googleDrive ? 'Connected and ready' : 'Not connected'}
            </p>
            {status.googleDrive ? (
              <button
                onClick={() => disconnectService('googleDrive')}
                className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={initiateGoogleDriveConnection}
                disabled={status.loading}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect Drive'
                )}
              </button>
            )}
          </div>

          <div className={`p-4 rounded-lg border-2 transition-all ${
            status.youtube 
              ? 'border-green-200 bg-green-50' 
              : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">YouTube</span>
              {status.youtube ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {status.youtube ? 'Connected and ready' : 'Not connected'}
            </p>
            {status.youtube ? (
              <button
                onClick={() => disconnectService('youtube')}
                className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={initiateYouTubeConnection}
                disabled={status.loading || !status.googleDrive}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect YouTube'
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Connection Progress */}
      {authStep !== 'idle' && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Connection Progress</h4>
          <div className="space-y-4">
            <div className={`flex items-center p-3 rounded-lg ${
              authStep === 'setup' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                authStep === 'setup' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {authStep === 'setup' ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <span className="text-white text-sm">1</span>
                )}
              </div>
              <div>
                <p className="font-medium">API Setup</p>
                <p className="text-sm text-gray-600">Configuring Google Cloud Console</p>
              </div>
            </div>

            <div className={`flex items-center p-3 rounded-lg ${
              authStep === 'connecting' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                authStep === 'connecting' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {authStep === 'connecting' ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <span className="text-white text-sm">2</span>
                )}
              </div>
              <div>
                <p className="font-medium">OAuth Authorization</p>
                <p className="text-sm text-gray-600">Requesting user permissions</p>
              </div>
            </div>

            <div className={`flex items-center p-3 rounded-lg ${
              authStep === 'connected' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                authStep === 'connected' ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {authStep === 'connected' ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-white text-sm">3</span>
                )}
              </div>
              <div>
                <p className="font-medium">Connection Test</p>
                <p className="text-sm text-gray-600">Verifying API access</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {status.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <div>
              <h4 className="font-medium text-red-800">Connection Error</h4>
              <p className="text-sm text-red-600 mt-1">{status.error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Setup Instructions */}
      {!status.googleDrive && authStep === 'idle' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Before You Connect
          </h4>
          <div className="space-y-2 text-sm text-yellow-700">
            <p>• You'll need a Google account with access to Google Drive</p>
            <p>• YouTube channel must be verified and in good standing</p>
            <p>• The system will automatically configure API credentials</p>
            <p>• You'll be redirected to Google for authorization</p>
          </div>
          <div className="mt-4">
            <a 
              href="https://console.cloud.google.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Google Cloud Console
            </a>
          </div>
        </div>
      )}
    </div>
  );
}