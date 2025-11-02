import { useEffect, useState } from "react";
import API from "../../../util/API";

function AdminList () {
  const [admins, setAdmins] = useState([])
  const getadmins = async () => {
    const getadminsData = await API.get("/admin");
    setAdmins(getadminsData.data.data)
  }

  useEffect(() => {
    getadmins()
  },[])
    return(
      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-5">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>  
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr
              key={admin._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2 font-medium text-gray-800">{admin.name ? admin.name : "ADMIN"}</td>
              <td className="px-4 py-2 text-gray-600">{admin.email}</td>
              <td className="px-4 py-2 text-gray-600">{admin.role ? admin.role : "ADMIN"}</td>   
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

export default AdminList;