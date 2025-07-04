import React, { useState } from 'react';
import { History, Search, Filter, Download, Eye, User, Clock, MapPin } from 'lucide-react';

const mockActivityLogs = [
  {
    id: 1,
    admin: 'John Admin',
    email: 'john@admin.com',
    action: 'Login',
    details: 'Successful login from Chrome browser',
    ip: '192.168.1.1',
    userAgent: 'Chrome/120.0.0.0 Windows NT 10.0',
    location: 'New York, US',
    timestamp: '2024-06-01 14:30:25',
    status: 'success',
    sessionDuration: '2h 15m',
  },
  {
    id: 2,
    admin: 'Jane Manager',
    email: 'jane@admin.com',
    action: 'Product Edit',
    details: 'Updated product "Wireless Headphones" (ID: PROD-123)',
    ip: '10.0.0.1',
    userAgent: 'Safari/17.0 iPhone OS 17.0',
    location: 'San Francisco, US',
    timestamp: '2024-06-01 13:45:12',
    status: 'success',
    sessionDuration: '1h 30m',
  },
  {
    id: 3,
    admin: 'Bob Support',
    email: 'bob@admin.com',
    action: 'Failed Login',
    details: 'Incorrect password attempt',
    ip: '203.0.113.1',
    userAgent: 'Firefox/119.0.0.0 Mac OS X 10.15',
    location: 'Unknown',
    timestamp: '2024-06-01 12:20:45',
    status: 'failed',
    sessionDuration: null,
  },
  {
    id: 4,
    admin: 'Alice Editor',
    email: 'alice@admin.com',
    action: 'Order Management',
    details: 'Processed refund for order #ORD-456',
    ip: '172.16.0.1',
    userAgent: 'Edge/120.0.0.0 Windows NT 10.0',
    location: 'Chicago, US',
    timestamp: '2024-06-01 11:15:30',
    status: 'success',
    sessionDuration: '45m',
  },
  {
    id: 5,
    admin: 'John Admin',
    email: 'john@admin.com',
    action: 'User Management',
    details: 'Created new admin user: admin@new.com',
    ip: '192.168.1.1',
    userAgent: 'Chrome/120.0.0.0 Windows NT 10.0',
    location: 'New York, US',
    timestamp: '2024-06-01 10:30:15',
    status: 'success',
    sessionDuration: '3h 45m',
  },
];

const ActivityLogs = () => {
  const [search, setSearch] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedLog, setSelectedLog] = useState(null);

  const admins = [...new Set(mockActivityLogs.map(log => log.admin))];
  const actions = [...new Set(mockActivityLogs.map(log => log.action))];

  const filteredLogs = mockActivityLogs.filter(log => {
    const matchesSearch = !search || 
      log.admin.toLowerCase().includes(search.toLowerCase()) ||
      log.email.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    const matchesAdmin = !selectedAdmin || log.admin === selectedAdmin;
    const matchesAction = !selectedAction || log.action === selectedAction;
    const matchesStatus = !selectedStatus || log.status === selectedStatus;
    const matchesDate = !dateRange.start || !dateRange.end || 
      (log.timestamp >= dateRange.start && log.timestamp <= dateRange.end);
    
    return matchesSearch && matchesAdmin && matchesAction && matchesStatus && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
      case 'login': return '🔐';
      case 'logout': return '🚪';
      case 'product': return '📦';
      case 'order': return '📋';
      case 'user': return '👤';
      case 'settings': return '⚙️';
      default: return '📝';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <History className="text-blue-600" />
        Activity Logs
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin</label>
            <select
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Admins</option>
              {admins.map(admin => (
                <option key={admin} value={admin}>{admin}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Actions</option>
              {actions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="warning">Warning</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
            <Filter /> Apply Filters
          </button>
          <button 
            onClick={() => {
              setSearch('');
              setSelectedAdmin('');
              setSelectedAction('');
              setSelectedStatus('');
              setDateRange({ start: '', end: '' });
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
            <Download /> Export
          </button>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">No activity logs found.</td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="text-blue-600" size={14} />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{log.admin}</p>
                        <p className="text-xs text-gray-500">{log.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getActionIcon(log.action)}</span>
                      <span className="text-sm font-medium text-gray-900">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900 max-w-xs truncate">{log.details}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 font-mono">{log.ip}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="text-gray-400" size={12} />
                      <span className="text-sm text-gray-600">{log.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock className="text-gray-400" size={12} />
                      <span className="text-sm text-gray-600">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded"
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Activity Log Details</h2>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Admin</label>
                  <p className="text-sm text-gray-900">{selectedLog.admin}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedLog.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Action</label>
                  <p className="text-sm text-gray-900">{selectedLog.action}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLog.status)}`}>
                    {selectedLog.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">IP Address</label>
                  <p className="text-sm text-gray-900 font-mono">{selectedLog.ip}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="text-sm text-gray-900">{selectedLog.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                  <p className="text-sm text-gray-900">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Session Duration</label>
                  <p className="text-sm text-gray-900">{selectedLog.sessionDuration || 'N/A'}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Details</label>
                <p className="text-sm text-gray-900">{selectedLog.details}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User Agent</label>
                <p className="text-sm text-gray-900 font-mono">{selectedLog.userAgent}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs; 