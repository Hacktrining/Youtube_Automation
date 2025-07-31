import React, { useState } from 'react';
import { 
  Settings, 
  Youtube, 
  HardDrive, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Key,
  Shield,
  Monitor,
  Folder,
  Play,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [copiedText, setCopiedText] = useState('');
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    { id: 'prerequisites', title: 'Prerequisites', description: 'Install required software', completed: false, current: true },
    { id: 'google-console', title: 'Google Cloud Console', description: 'Create project and enable APIs', completed: false, current: false },
    { id: 'credentials', title: 'API Credentials', description: 'Generate OAuth credentials', completed: false, current: false },
    { id: 'youtube-setup', title: 'YouTube Setup', description: 'Configure YouTube API access', completed: false, current: false },
    { id: 'drive-setup', title: 'Google Drive Setup', description: 'Configure Drive API access', completed: false, current: false },
    { id: 'local-config', title: 'Local Configuration', description: 'Set up Windows environment', completed: false, current: false },
    { id: 'testing', title: 'Testing', description: 'Verify all connections', completed: false, current: false }
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const markStepComplete = (stepIndex: number) => {
    const newSteps = [...setupSteps];
    newSteps[stepIndex].completed = true;
    if (stepIndex < newSteps.length - 1) {
      newSteps[stepIndex].current = false;
      newSteps[stepIndex + 1].current = true;
      setCurrentStep(stepIndex + 1);
    }
    setSetupSteps(newSteps);
  };

  const renderPrerequisites = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Windows System Requirements
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded border">
            <span>Windows 10/11 (64-bit)</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded border">
            <span>Internet Connection</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded border">
            <span>Google Account</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Required Software Downloads
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Node.js (Latest LTS)</h4>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
            <p className="text-sm text-gray-600">Required for running the automation tool</p>
            <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono">
              https://nodejs.org/en/download/
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Git for Windows</h4>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
            <p className="text-sm text-gray-600">Version control and command line tools</p>
            <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono">
              https://git-scm.com/download/win
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Visual Studio Code (Optional)</h4>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
            <p className="text-sm text-gray-600">Code editor for configuration files</p>
            <div className="mt-2 p-2 bg-gray-100 rounded text-sm font-mono">
              https://code.visualstudio.com/download
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Installation Verification</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-medium mb-2">Open Command Prompt and run:</p>
            <div className="flex items-center justify-between p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
              <span>node --version</span>
              <button 
                onClick={() => copyToClipboard('node --version')}
                className="text-gray-400 hover:text-white"
              >
                {copiedText === 'node --version' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-medium mb-2">Verify npm installation:</p>
            <div className="flex items-center justify-between p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
              <span>npm --version</span>
              <button 
                onClick={() => copyToClipboard('npm --version')}
                className="text-gray-400 hover:text-white"
              >
                {copiedText === 'npm --version' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoogleConsole = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Google Cloud Console Setup
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Step 1: Create New Project</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <a href="https://console.cloud.google.com/" className="text-blue-600 hover:underline" target="_blank">Google Cloud Console</a></li>
              <li>Click "Select a project" → "New Project"</li>
              <li>Enter project name: <code className="bg-gray-100 px-2 py-1 rounded">YouTube-Automation-Tool</code></li>
              <li>Click "Create"</li>
            </ol>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Step 2: Enable Required APIs</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                <p className="font-medium text-blue-900">YouTube Data API v3</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">Required for video uploads</span>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                    Enable API
                  </button>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <p className="font-medium text-green-900">Google Drive API</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">Required for file access</span>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                    Enable API
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Step 3: Configure OAuth Consent Screen</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to "APIs & Services" → "OAuth consent screen"</li>
              <li>Select "External" user type</li>
              <li>Fill in required fields:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>App name: YouTube Automation Tool</li>
                  <li>User support email: Your email</li>
                  <li>Developer contact: Your email</li>
                </ul>
              </li>
              <li>Add scopes: YouTube and Drive permissions</li>
              <li>Add test users (your email)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCredentials = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2" />
          Generate API Credentials
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Create OAuth 2.0 Client ID</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to "APIs & Services" → "Credentials"</li>
              <li>Click "Create Credentials" → "OAuth client ID"</li>
              <li>Application type: "Desktop application"</li>
              <li>Name: "YouTube Automation Desktop Client"</li>
              <li>Click "Create"</li>
            </ol>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Download Credentials</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                <div className="flex items-center mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800">Important</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Download the JSON file and save it as <code className="bg-yellow-100 px-1 rounded">credentials.json</code>
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium mb-2">Save location:</p>
                <div className="flex items-center justify-between p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                  <span>C:\Users\YourName\youtube-automation\credentials.json</span>
                  <button 
                    onClick={() => copyToClipboard('C:\\Users\\YourName\\youtube-automation\\credentials.json')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedText === 'C:\\Users\\YourName\\youtube-automation\\credentials.json' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Security Best Practices</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Never share your credentials.json file</li>
              <li>Keep it in a secure location</li>
              <li>Add it to .gitignore if using version control</li>
              <li>Regularly rotate your credentials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderYouTubeSetup = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <Youtube className="w-5 h-5 mr-2" />
          YouTube API Configuration
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Channel Verification</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-sm font-medium text-blue-900 mb-2">Requirements:</p>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                  <li>YouTube channel must be verified</li>
                  <li>No strikes on your channel</li>
                  <li>Channel must be in good standing</li>
                  <li>2-factor authentication enabled</li>
                </ul>
              </div>
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center">
                <Youtube className="w-4 h-4 mr-2" />
                Verify YouTube Channel
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">API Quotas & Limits</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium">Daily Upload Quota</p>
                <p className="text-2xl font-bold text-gray-900">1,600</p>
                <p className="text-xs text-gray-600">Videos per day</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium">API Calls</p>
                <p className="text-2xl font-bold text-gray-900">10,000</p>
                <p className="text-xs text-gray-600">Requests per day</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Upload Settings Configuration</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Default Privacy</label>
                  <select className="w-full p-2 border rounded">
                    <option>Private</option>
                    <option>Unlisted</option>
                    <option>Public</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select className="w-full p-2 border rounded">
                    <option>Entertainment</option>
                    <option>Gaming</option>
                    <option>Music</option>
                    <option>Comedy</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Default Tags</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  placeholder="shorts, viral, trending, entertainment"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDriveSetup = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <HardDrive className="w-5 h-5 mr-2" />
          Google Drive Configuration
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Folder Structure Setup</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-sm font-medium text-blue-900 mb-2">Recommended Folder Structure:</p>
                <div className="font-mono text-sm text-blue-800 space-y-1">
                  <div>📁 YouTube Automation/</div>
                  <div className="ml-4">📁 Videos to Upload/</div>
                  <div className="ml-4">📁 Uploaded Videos/</div>
                  <div className="ml-4">📁 Failed Uploads/</div>
                  <div className="ml-4">📁 Thumbnails/</div>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center">
                <Folder className="w-4 h-4 mr-2" />
                Create Folder Structure
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Supported Video Formats</h4>
            <div className="grid grid-cols-3 gap-3">
              {['MP4', 'MOV', 'AVI', 'WMV', 'FLV', 'WebM'].map((format) => (
                <div key={format} className="p-2 bg-green-50 rounded text-center">
                  <span className="text-sm font-medium text-green-800">{format}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">File Size & Duration Limits</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium">Max File Size</p>
                <p className="text-2xl font-bold text-gray-900">256 GB</p>
                <p className="text-xs text-gray-600">Per video file</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium">Shorts Duration</p>
                <p className="text-2xl font-bold text-gray-900">60s</p>
                <p className="text-xs text-gray-600">Maximum length</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Sync Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-sync every</span>
                <select className="p-1 border rounded text-sm">
                  <option>5 minutes</option>
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Process videos immediately</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Move uploaded videos</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocalConfig = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Windows Environment Setup
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Create Project Directory</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium mb-2">Open Command Prompt as Administrator and run:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                    <span>mkdir C:\youtube-automation</span>
                    <button 
                      onClick={() => copyToClipboard('mkdir C:\\youtube-automation')}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedText === 'mkdir C:\\youtube-automation' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                    <span>cd C:\youtube-automation</span>
                    <button 
                      onClick={() => copyToClipboard('cd C:\\youtube-automation')}
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedText === 'cd C:\\youtube-automation' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Install Dependencies</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded">
                <p className="text-sm font-medium text-blue-900 mb-2">Initialize Node.js project:</p>
                <div className="flex items-center justify-between p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                  <span>npm init -y</span>
                  <button 
                    onClick={() => copyToClipboard('npm init -y')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedText === 'npm init -y' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm font-medium text-green-900 mb-2">Install required packages:</p>
                <div className="flex items-center justify-between p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                  <span>npm install googleapis google-auth-library</span>
                  <button 
                    onClick={() => copyToClipboard('npm install googleapis google-auth-library')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedText === 'npm install googleapis google-auth-library' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Environment Configuration</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded">
                <p className="text-sm font-medium text-yellow-900 mb-2">Create .env file:</p>
                <div className="p-2 bg-gray-900 text-green-400 rounded font-mono text-sm">
                  <div>GOOGLE_CREDENTIALS_PATH=./credentials.json</div>
                  <div>YOUTUBE_UPLOAD_FOLDER=Videos to Upload</div>
                  <div>YOUTUBE_PROCESSED_FOLDER=Uploaded Videos</div>
                  <div>AUTO_UPLOAD_ENABLED=true</div>
                  <div>UPLOAD_INTERVAL_MINUTES=30</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Windows Service Setup (Optional)</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Set up the automation tool to run as a Windows service for continuous operation.
              </p>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                <span className="text-sm font-medium">Install PM2 for service management</span>
                <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                  Install PM2
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTesting = () => (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
          <Play className="w-5 h-5 mr-2" />
          Test All Connections
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Connection Tests</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                <div className="flex items-center">
                  <Youtube className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium">YouTube API Connection</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  Test Connection
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <div className="flex items-center">
                  <HardDrive className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium">Google Drive API Connection</span>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                  Test Connection
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                <div className="flex items-center">
                  <Settings className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium">Local Configuration</span>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                  Validate Config
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Test Upload</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                <div className="flex items-center mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800">Test Mode</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Upload a test video as "Private" to verify everything works correctly.
                </p>
              </div>
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 flex items-center justify-center">
                <Play className="w-4 h-4 mr-2" />
                Start Test Upload
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded border">
            <h4 className="font-medium mb-2">Automation Status</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium">Service Status</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-700">Running</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm font-medium">Next Check</p>
                <p className="text-sm text-gray-600 mt-1">In 15 minutes</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-100 rounded border border-emerald-300">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
              <span className="font-medium text-emerald-800">Setup Complete!</span>
            </div>
            <p className="text-sm text-emerald-700">
              Your YouTube automation tool is now configured and ready to use. 
              The system will automatically monitor your Google Drive folder and upload new videos to YouTube.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderPrerequisites();
      case 1: return renderGoogleConsole();
      case 2: return renderCredentials();
      case 3: return renderYouTubeSetup();
      case 4: return renderDriveSetup();
      case 5: return renderLocalConfig();
      case 6: return renderTesting();
      default: return renderPrerequisites();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              YouTube Automation Setup Wizard
            </h1>
            <p className="text-xl text-gray-600">
              Complete step-by-step guide to configure your Windows system
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {setupSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${step.completed 
                      ? 'bg-green-500 text-white' 
                      : step.current 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < setupSteps.length - 1 && (
                    <div className={`
                      w-16 h-1 mx-2
                      ${step.completed ? 'bg-green-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              {setupSteps.map((step) => (
                <div key={step.id} className="text-center max-w-24">
                  <p className={`font-medium ${step.current ? 'text-blue-600' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Step {currentStep + 1}: {setupSteps[currentStep].title}
              </h2>
              <p className="text-gray-600">{setupSteps[currentStep].description}</p>
            </div>
            
            {renderCurrentStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Step
            </button>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => markStepComplete(currentStep)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mark Complete
              </button>
              
              <button 
                onClick={() => setCurrentStep(Math.min(setupSteps.length - 1, currentStep + 1))}
                disabled={currentStep === setupSteps.length - 1}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}