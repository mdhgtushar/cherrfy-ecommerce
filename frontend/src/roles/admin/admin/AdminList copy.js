import React from "react";
import { Link } from "react-router-dom";
import { Users, Shield, History, ShieldCheck, UserPlus } from "lucide-react";
import ADMIN_PATHS from "../ADMIN_PATHS";
import AdminUsers from "./AdminUsers"

export default function AdminManagementOverview() {
  return (
    <div>
      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin & Role Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Users */}
          <Link to={ADMIN_PATHS.ADMIN.BASE} className="block bg-white border rounded-xl shadow p-6 hover:shadow-lg transition group">
            <div className="flex items-center gap-4 mb-2">
              <Users className="text-blue-600 text-3xl group-hover:scale-110 transition" />
              <span className="text-xl font-semibold">Admin Users</span>
            </div>
            <p className="text-gray-600">View, search, and manage all admin users.</p>
          </Link>
          {/* Roles & Permissions */}
          <Link to={ADMIN_PATHS.ADMIN.ROLES} className="block bg-white border rounded-xl shadow p-6 hover:shadow-lg transition group">
            <div className="flex items-center gap-4 mb-2">
              <Shield className="text-indigo-600 text-3xl group-hover:scale-110 transition" />
              <span className="text-xl font-semibold">Roles & Permissions</span>
            </div>
            <p className="text-gray-600">Create, edit, and assign roles and permissions.</p>
          </Link>
          {/* Activity Logs */}
          <Link to={ADMIN_PATHS.ADMIN.ACTIVITY} className="block bg-white border rounded-xl shadow p-6 hover:shadow-lg transition group">
            <div className="flex items-center gap-4 mb-2">
              <History className="text-orange-600 text-3xl group-hover:scale-110 transition" />
              <span className="text-xl font-semibold">Activity Logs</span>
            </div>
            <p className="text-gray-600">View all admin activity and audit logs.</p>
          </Link>
          {/* Security Settings */}
          <Link to={ADMIN_PATHS.ADMIN.SECURITY} className="block bg-white border rounded-xl shadow p-6 hover:shadow-lg transition group">
            <div className="flex items-center gap-4 mb-2">
              <ShieldCheck className="text-green-600 text-3xl group-hover:scale-110 transition" />
              <span className="text-xl font-semibold">Security Settings</span>
            </div>
            <p className="text-gray-600">Manage 2FA, password policy, and security alerts.</p>
          </Link>
          {/* Create Admin */}
          <Link to={ADMIN_PATHS.ADMIN.CREATE} className="block bg-white border rounded-xl shadow p-6 hover:shadow-lg transition group">
            <div className="flex items-center gap-4 mb-2">
              <UserPlus className="text-purple-600 text-3xl group-hover:scale-110 transition" />
              <span className="text-xl font-semibold">Create Admin</span>
            </div>
            <p className="text-gray-600">Add a new admin user to the system.</p>
          </Link>
        </div></div>
      <AdminUsers />

    </div>
  );
}