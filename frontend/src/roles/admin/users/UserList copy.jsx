import React, { useEffect, useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Trash, 
  Pencil, 
  Eye, 
  Ban, 
  Check, 
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  FileText,
  UserCheck,
  UserX,
  Activity,
  Settings,
  Key,
  Lock,
  Unlock
} from 'lucide-react';
import API from '../../../util/API';

// const mockUsers = [
//   { 
//     id: 'USR-2024-001', 
//     name: 'John Doe', 
//     email: 'john.doe@company.com', 
//     phone: '+1 (555) 123-4567',
//     role: 'admin', 
//     status: 'Active', 
//     joined: '2024-01-15', 
//     lastLogin: '2024-06-01',
//     avatar: 'JD',
//     department: 'IT',
//     location: 'New York',
//     permissions: ['read', 'write', 'admin'],
//     loginCount: 156,
//     lastActivity: '2 hours ago'
//   },
//   { 
//     id: 'USR-2024-002', 
//     name: 'Jane Smith', 
//     email: 'jane.smith@company.com', 
//     phone: '+1 (555) 987-6543',
//     role: 'manager', 
//     status: 'Active', 
//     joined: '2024-02-20', 
//     lastLogin: '2024-06-02',
//     avatar: 'JS',
//     department: 'Sales',
//     location: 'Los Angeles',
//     permissions: ['read', 'write'],
//     loginCount: 89,
//     lastActivity: '1 day ago'
//   },
//   { 
//     id: 'USR-2024-003', 
//     name: 'Alice Johnson', 
//     email: 'alice.johnson@company.com', 
//     phone: '+1 (555) 456-7890',
//     role: 'user', 
//     status: 'Inactive', 
//     joined: '2024-03-10', 
//     lastLogin: '2024-05-15',
//     avatar: 'AJ',
//     department: 'Marketing',
//     location: 'Chicago',
//     permissions: ['read'],
//     loginCount: 23,
//     lastActivity: '1 week ago'
//   },
//   { 
//     id: 'USR-2024-004', 
//     name: 'Bob Wilson', 
//     email: 'bob.wilson@company.com', 
//     phone: '+1 (555) 321-0987',
//     role: 'user', 
//     status: 'Active', 
//     joined: '2024-04-05', 
//     lastLogin: '2024-06-03',
//     avatar: 'BW',
//     department: 'Support',
//     location: 'Miami',
//     permissions: ['read', 'write'],
//     loginCount: 67,
//     lastActivity: '3 hours ago'
//   },
//   { 
//     id: 'USR-2024-005', 
//     name: 'Sarah Davis', 
//     email: 'sarah.davis@company.com', 
//     phone: '+1 (555) 654-3210',
//     role: 'manager', 
//     status: 'Active', 
//     joined: '2024-05-01', 
//     lastLogin: '2024-06-04',
//     avatar: 'SD',
//     department: 'Finance',
//     location: 'Seattle',
//     permissions: ['read', 'write'],
//     loginCount: 45,
//     lastActivity: '5 hours ago'
//   },
//   { 
//     id: 'USR-2024-006', 
//     name: 'Mike Brown', 
//     email: 'mike.brown@company.com', 
//     phone: '+1 (555) 789-0123',
//     role: 'user', 
//     status: 'Active', 
//     joined: '2024-05-15', 
//     lastLogin: '2024-06-05',
//     avatar: 'MB',
//     department: 'Operations',
//     location: 'Austin',
//     permissions: ['read'],
//     loginCount: 34,
//     lastActivity: '1 day ago'
//   }
// ];

const roleConfig = {
  admin: { color: 'red', icon: Shield, bg: 'bg-red-100', text: 'text-red-800', label: 'Administrator' },
  manager: { color: 'blue', icon: UserCheck, bg: 'bg-blue-100', text: 'text-blue-800', label: 'Manager' },
  user: { color: 'green', icon: Users, bg: 'bg-green-100', text: 'text-green-800', label: 'User' }
};

const statusConfig = {
  Active: { color: 'green', icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-800' },
  Inactive: { color: 'gray', icon: XCircle, bg: 'bg-gray-100', text: 'text-gray-800' },
  Suspended: { color: 'yellow', icon: AlertTriangle, bg: 'bg-yellow-100', text: 'text-yellow-800' }
};

const UserList = () => {
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [mockUsers, setMockUsers] = useState([]);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = !search || 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesDepartment = !departmentFilter || user.department === departmentFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const getUserList = async () =>{
    const getUsers = await API.get("/user");
    setMockUsers(getUsers.data.data)
  }

  useEffect(()=> {
    getUserList();
  }, [])
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  // Analytics data
  const analytics = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'Active').length,
    inactive: mockUsers.filter(u => u.status === 'Inactive').length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
    managers: mockUsers.filter(u => u.role === 'manager').length,
    users: mockUsers.filter(u => u.role === 'user').length,
    newThisMonth: mockUsers.filter(u => new Date(u.joined) > new Date('2024-06-01')).length,
    avgLoginCount: Math.round(mockUsers.reduce((sum, u) => sum + u.loginCount, 0) / mockUsers.length),
    departments: [...new Set(mockUsers.map(u => u.department))]
  };

  const MetricCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const UserCard = ({ user }) => {
    const role = roleConfig[user.role];
    const status = statusConfig[user.status];
    const RoleIcon = role.icon;
    const StatusIcon = status.icon;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={(e) => handleSelectUser(user.id, e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
              {user.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.bg} ${role.text}`}>
              {role.label}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
              {user.status}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.phone}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">Department</p>
              <p className="font-medium text-gray-900">{user.department}</p>
            </div>
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-medium text-gray-900">{user.location}</p>
            </div>
            <div>
              <p className="text-gray-600">Logins</p>
              <p className="font-medium text-gray-900">{user.loginCount}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors" title="Deactivate">
                  <Ban className="w-4 h-4" />
                </button>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">Manage user accounts, roles, and permissions</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Invite User</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={analytics.total}
            change="+8.5%"
            trend="up"
            icon={Users}
            color="blue"
          />
          <MetricCard
            title="Active Users"
            value={analytics.active}
            change="+12.3%"
            trend="up"
            icon={UserCheck}
            color="green"
          />
          <MetricCard
            title="Administrators"
            value={analytics.admins}
            change="+0%"
            trend="up"
            icon={Shield}
            color="red"
          />
          <MetricCard
            title="New This Month"
            value={analytics.newThisMonth}
            change="+25.0%"
            trend="up"
            icon={UserPlus}
            color="purple"
          />
        </div>

        {/* User Role Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Role Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Shield className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{analytics.admins}</p>
              <p className="text-sm text-red-700">Administrators</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <UserCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{analytics.managers}</p>
              <p className="text-sm text-blue-700">Managers</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{analytics.users}</p>
              <p className="text-sm text-green-700">Regular Users</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="admin">Administrator</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                {analytics.departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 flex items-center justify-between">
            <span className="text-blue-700 font-medium">
              {selectedUsers.length} user(s) selected
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Activate</span>
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 transition-colors flex items-center space-x-2">
                <Ban className="w-4 h-4" />
                <span>Deactivate</span>
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center space-x-2">
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* Users Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No users found matching your criteria.</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p>No users found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const role = roleConfig[user.role];
                    const status = statusConfig[user.status];
                    const RoleIcon = role.icon;
                    const StatusIcon = status.icon;

                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                              {user.avatar}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{user.email}</p>
                            <p className="text-sm text-gray-500">{user.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${role.bg} ${role.text}`}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {role.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{user.lastActivity}</p>
                            <p className="text-sm text-gray-500">{user.loginCount} logins</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors" title="Deactivate">
                              <Ban className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;