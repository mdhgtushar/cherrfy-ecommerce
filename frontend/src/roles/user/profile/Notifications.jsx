import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// NotificationPage.jsx
// A responsive, accessible notification page built with Tailwind CSS and Framer Motion.
// Features:
// - List of notifications (sample data)
// - Mark individual notifications read/unread
// - Mark all read
// - Delete a notification
// - Filter (All / Unread / Read)
// - Unread count badge

export default function NotificationPage() {
  // Sample data; replace with props or fetch from API as needed.
  const initialNotifications = [
    {
      id: 1,
      title: "অ্যাকাউন্ট আপডেট সম্পন্ন",
      body: "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।",
      time: "2 ঘন্টা আগে",
      read: false,
    },
    {
      id: 2,
      title: "নতুন ইনভয়েস পাওয়া গেছে",
      body: "আপনার অর্ডার #2385 - ইনভয়েস প্রস্তুত।",
      time: "1 দিন আগে",
      read: true,
    },
    {
      id: 3,
      title: "সিস্টেম রক্ষণাবেক্ষণ",
      body: "আগামী শনিবার ১টায় সার্ভার রক্ষণাবেক্ষণ থাকবে।",
      time: "৩ দিন আগে",
      read: false,
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all"); // all | unread | read

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  function toggleRead(id) {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: !n.read } : n)));
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function deleteNotification(id) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  const filtered = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">নোটিফিকেশন্স</h1>
            <p className="text-sm text-gray-500 mt-1">আপনি সর্বশেষ কি দেখেন এবং কি মিস করেছেন তা এখানে পাবেন।</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                className="px-3 py-2 bg-white border rounded-md shadow-sm hover:shadow focus:outline-none"
                onClick={markAllRead}
                aria-label="Mark all read"
              >
                Mark all read
              </button>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>

            <div className="bg-white border rounded-md px-3 py-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-2 py-1 rounded ${filter === "all" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-2 py-1 rounded ${filter === "unread" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter("read")}
                  className={`px-2 py-1 rounded ${filter === "read" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                >
                  Read
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y">
            <AnimatePresence>
              {filtered.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center text-gray-500"
                >
                  কোন নোটিফিকেশন নেই।
                </motion.div>
              )}

              {filtered.map(n => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className={`p-4 flex items-start gap-4 hover:bg-gray-50 ${n.read ? "" : "bg-gradient-to-r from-white to-gray-50"}`}
                >
                  <div className="flex-0 mt-1">
                    <button
                      onClick={() => toggleRead(n.id)}
                      aria-label={n.read ? "Mark as unread" : "Mark as read"}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${n.read ? "border-gray-200" : "border-red-400 shadow-sm"}`}
                      title={n.read ? "Read" : "Unread"}
                    >
                      {/* Simple dot */}
                      <span className={`inline-block w-3 h-3 rounded-full ${n.read ? "bg-gray-300" : "bg-red-500"}`} />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium truncate ${n.read ? "text-gray-800" : "text-gray-900"}`}>{n.title}</h3>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 truncate">{n.body}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => toggleRead(n.id)}
                        className="text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
                      >
                        {n.read ? "Mark unread" : "Mark read"}
                      </button>

                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="text-xs px-2 py-1 rounded-md border text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer / small help */}
        <div className="mt-6 text-sm text-gray-500">
          টিপস: সার্ভার থেকে বাস্তব নোটিফিকেশন লোড করতে হলে fetch()/axios দিয়ে API কল করে initialNotifications বদলে দিন।
        </div>
      </div>
    </div>
  );
}
