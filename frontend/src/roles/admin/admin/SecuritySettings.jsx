import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Plus, Trash, Bell, Globe, Smartphone } from 'lucide-react';

const SecuritySettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState(90);
  const [ipWhitelist, setIpWhitelist] = useState(['192.168.1.1', '10.0.0.1']);
  const [newIp, setNewIp] = useState('');
  const [securityAlerts, setSecurityAlerts] = useState({
    failedLogin: true,
    newDevice: true,
    passwordChange: true,
    adminAction: true,
  });

  const handleAddIp = () => {
    if (newIp.trim() && !ipWhitelist.includes(newIp.trim())) {
      setIpWhitelist([...ipWhitelist, newIp.trim()]);
      setNewIp('');
    }
  };

  const handleRemoveIp = (ip) => {
    setIpWhitelist(ipWhitelist.filter(ipAddr => ipAddr !== ip));
  };

  const mockTrustedDevices = [
    { id: 1, name: 'Chrome on Windows', ip: '192.168.1.1', lastUsed: '2024-06-01', location: 'New York, US' },
    { id: 2, name: 'Safari on iPhone', ip: '10.0.0.1', lastUsed: '2024-05-30', location: 'New York, US' },
    { id: 3, name: 'Firefox on Mac', ip: '172.16.0.1', lastUsed: '2024-05-25', location: 'San Francisco, US' },
  ];

  const mockSecurityLogs = [
    { id: 1, action: 'Failed Login', user: 'admin@example.com', ip: '203.0.113.1', timestamp: '2024-06-01 14:30', severity: 'high' },
    { id: 2, action: 'Password Changed', user: 'john@admin.com', ip: '192.168.1.1', timestamp: '2024-06-01 12:15', severity: 'medium' },
    { id: 3, action: 'New Device Login', user: 'jane@admin.com', ip: '10.0.0.1', timestamp: '2024-06-01 10:45', severity: 'low' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <Shield className="text-blue-600" />
        Security Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Smartphone className="text-blue-500" />
              Two-Factor Authentication
            </h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable 2FA</p>
                <p className="text-sm text-gray-600">Require authentication code for login</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {twoFactorEnabled && (
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-700">
                  <strong>Status:</strong> 2FA is enabled for all admin accounts
                </p>
              </div>
            )}
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Configure 2FA Settings
            </button>
          </div>
        </div>

        {/* Password Policy */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Lock className="text-green-500" />
              Password Policy
            </h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={passwordExpiry}
                onChange={(e) => setPasswordExpiry(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                min="0"
                max="365"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Require uppercase letters</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Require lowercase letters</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Require numbers</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Require special characters</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span className="text-sm">Minimum 8 characters</span>
              </label>
            </div>
          </div>
        </div>

        {/* IP Whitelist */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="text-purple-500" />
              IP Whitelist
            </h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="Enter IP address"
                className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleAddIp}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
              >
                <Plus /> Add
              </button>
            </div>
            <div className="space-y-2">
              {ipWhitelist.map((ip, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm font-mono">{ip}</span>
                  <button
                    onClick={() => handleRemoveIp(ip)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="text-orange-500" />
              Security Alerts
            </h2>
          </div>
          <div className="p-4 space-y-4">
            {Object.entries(securityAlerts).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm text-gray-600">Get notified when this event occurs</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSecurityAlerts({ ...securityAlerts, [key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted Devices */}
      <div className="mt-6 bg-white rounded-lg shadow border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Trusted Devices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Used</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {mockTrustedDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Smartphone className="text-blue-600" size={14} />
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{device.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{device.ip}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{device.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{device.lastUsed}</td>
                  <td className="px-4 py-3">
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Logs */}
      <div className="mt-6 bg-white rounded-lg shadow border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Recent Security Events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {mockSecurityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">{log.action}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{log.user}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{log.ip}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{log.timestamp}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      log.severity === 'high' ? 'bg-red-100 text-red-800' :
                      log.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings; 