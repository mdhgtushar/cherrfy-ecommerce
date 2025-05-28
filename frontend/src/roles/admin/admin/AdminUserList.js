import React from 'react';
import { Link } from 'react-router-dom';
import AdminUserFilter from './AdminUserFilter';
import StatusControl from './StatusControl';

const AdminUserList = ({ users }) => {
  return (
    <div>
      <h1>Admin Users</h1>
      <AdminUserFilter />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>ss
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <StatusControl status={user.status} />
              </td>
              <td>
                <Link to={`/users/edit/${user.id}`}>Edit</Link>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
