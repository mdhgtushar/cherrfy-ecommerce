import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff, Save, X, Shield } from 'lucide-react';

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    password: '',
    confirmPassword: '',
    permissions: [],
    isActive: true,
    sendWelcomeEmail: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const roles = [
    { id: 'superadmin', name: 'SuperAdmin', description: 'Full system access' },
    { id: 'manager', name: 'Manager', description: 'Manage products, orders, and users' },
    { id: 'support', name: 'Support', description: 'Handle customer support' },
    { id: 'editor', name: 'Editor', description: 'Edit products and content' },
    { id: 'viewer', name: 'Viewer', description: 'View-only access' },
  ];

  const departments = [
    'Administration',
    'Product Management',
    'Order Management',
    'Customer Support',
    'Marketing',
    'Finance',
    'IT',
  ];

  const allPermissions = [
    { key: 'dashboard', label: 'Dashboard Access', description: 'View dashboard and analytics' },
    { key: 'products', label: 'Product Management', description: 'Manage products and inventory' },
    { key: 'orders', label: 'Order Management', description: 'Process and manage orders' },
    { key: 'users', label: 'User Management', description: 'Manage customer accounts' },
    { key: 'admins', label: 'Admin Management', description: 'Manage admin users' },
    { key: 'reports', label: 'Reports & Analytics', description: 'View reports and analytics' },
    { key: 'settings', label: 'System Settings', description: 'Modify system settings' },
    { key: 'disputes', label: 'Dispute Management', description: 'Handle customer disputes' },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handlePermissionToggle = (permission) => {
    const permissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Creating admin:', formData);
      alert('Admin user created successfully!');
    }
  };

  const getRolePermissions = (roleId) => {
    const rolePermissions = {
      superadmin: allPermissions.map(p => p.key),
      manager: ['dashboard', 'products', 'orders', 'users', 'reports'],
      support: ['dashboard', 'orders', 'users', 'disputes'],
      editor: ['dashboard', 'products'],
      viewer: ['dashboard', 'reports'],
    };
    return rolePermissions[roleId] || [];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserPlus className="text-blue-600" />
            Create New Admin User
          </h1>
          <p className="text-gray-600 mt-2">Add a new administrator to the system with specific roles and permissions.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 ${
                    errors.firstName ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 ${
                    errors.lastName ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Role and Department */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Role & Department</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 ${
                    errors.role ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name} - {role.description}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full border rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-400 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full border rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-400 ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="text-blue-500" />
              Permissions
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allPermissions.map(permission => (
                  <label key={permission.key} className="flex items-start gap-3 p-3 bg-white rounded border hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission.key)}
                      onChange={() => handlePermissionToggle(permission.key)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{permission.label}</p>
                      <p className="text-sm text-gray-600">{permission.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Options</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Account is active</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.sendWelcomeEmail}
                  onChange={(e) => handleInputChange('sendWelcomeEmail', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Send welcome email with login credentials</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Save /> Create Admin User
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 flex items-center gap-2"
            >
              <X /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin; 