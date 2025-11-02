import { useEffect, useState } from "react";
import API from "../../../util/API";

function UserList () {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    const getUsersData = await API.get("/user");
    setUsers(getUsersData.data.data)
  }

  useEffect(() => {
    getUsers()
  },[])
    return(
      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-5">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Currency</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">Language</th>
            <th className="px-4 py-3">Last Login</th>
            <th className="px-4 py-3">Verified</th>
            <th className="px-4 py-3">Created At</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2 font-medium text-gray-800">{user.name}</td>
              <td className="px-4 py-2 text-gray-600">{user.email}</td>
              <td className="px-4 py-2 text-gray-600">{user.role}</td>
              <td className="px-4 py-2 text-gray-600">{user.settings.currency}</td>
              <td className="px-4 py-2 text-gray-600">{user.settings.country}</td>
              <td className="px-4 py-2 text-gray-600">{user.settings.language}</td>
              <td className="px-4 py-2 text-gray-600">
                {new Date(user.lastLogin).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.isVerified
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.isVerified ? "Verified" : "Not Verified"}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-right">
                <button className="text-blue-500 hover:underline">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default UserList;