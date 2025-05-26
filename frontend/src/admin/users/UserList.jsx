import React, { useEffect, useState } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await fetch("https://api.cherrfy.com/api/user/auth/allUsers");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user.email?.toLowerCase().includes(search.toLowerCase()) ||
                        user.name?.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, users]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-gray-500 text-lg">Loading users...</span>
            </div>
        );
    if (error)
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-red-500 text-lg">Error: {error}</span>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">User List</h2>
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="ml-4 text-gray-500">
                    {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
                </span>
            </div>
            <div className="overflow-x-auto rounded shadow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-blue-50 text-gray-700">
                            <th className="py-3 px-4 text-left font-semibold">ID</th>
                            <th className="py-3 px-4 text-left font-semibold">Email</th>
                            <th className="py-3 px-4 text-left font-semibold">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers && filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr
                                    key={user._id || user.id}
                                    className="border-b hover:bg-blue-50 transition"
                                >
                                    <td className="py-2 px-4">{user._id || user.id}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{user.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;