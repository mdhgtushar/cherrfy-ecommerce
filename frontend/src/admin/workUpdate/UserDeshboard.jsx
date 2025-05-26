import React from "react";

const UserDashboard = () => {
  const sections = [
    {
      title: "Overview",
      items: ["Avatar / Name"],
    },
    {
      title: "Manage Account",
      items: [
        "My Profile – edit name, photo, email, phone",
        "Address Book – add / edit / set‑default shipping addresses",
        "Payment Options – saved cards, mobile wallets",
      ],
    },
    {
      title: "My Orders",
      items: [
        "Unpaid",
        "To Be Shipped",
        "Shipped / In Transit",
        "To Be Reviewed",
        "Completed",
      ],
    },
    {
      title: "Return & Refund",
      items: ["In Process", "Awaiting Returns"],
    },
    {
      title: "My Reviews",
      items: ["Pending ratings", "Published reviews"],
    },
    {
      title: "Wishlist & Followed Stores",
      items: ["Saved items list", "Store follow management"],
    },
    {
      title: "Appeal / Dispute Center",
      items: ["Open appeals", "Case history"],
    },
    {
      title: "Settings",
      items: [
        "Personal Info – country, language, delete account",
        "Security – change password, change email, set security question, 2‑step verification",
        "Email Notifications – activate / deactivate",
        "Social Media Account – link",
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white shadow rounded-xl p-5 border">
            <h2 className="text-xl font-semibold mb-3 text-blue-600">{section.title}</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
