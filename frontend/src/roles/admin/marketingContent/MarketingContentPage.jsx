import React, { useState } from "react";

export default function MarketingContentPage() {
  const [banners, setBanners] = useState([]);
  const [metaTags, setMetaTags] = useState({ title: '', description: '' });
  const [scripts, setScripts] = useState([]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">🎯 Marketing & Content Manager</h1>

      {/* Homepage Banner Manager */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Homepage Banner Manager</h2>
        <button className="mb-2 px-4 py-2 bg-blue-600 text-white rounded">Upload Banner</button>
        <div className="text-sm text-gray-600">Add title, button, country-specific display, and schedule.</div>
      </section>

      {/* Announcement Bar / Popups */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Announcement Bar / Popups</h2>
        <button className="mb-2 px-4 py-2 bg-yellow-600 text-white rounded">Create Notification or Popup</button>
        <p className="text-sm text-gray-600">Configure country, device targeting, time-based display, and email collection.</p>
      </section>

      {/* Blog / Article Publisher */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Blog / Article Publisher</h2>
        <button className="mb-2 px-4 py-2 bg-green-600 text-white rounded">New Blog Post</button>
        <p className="text-sm text-gray-600">Add SEO tags, category, media embeds, schedule & comments.</p>
      </section>

      {/* Meta Tag Manager */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Meta Tag Manager</h2>
        <input
          className="block w-full mb-2 p-2 border rounded"
          type="text"
          placeholder="Default Meta Title"
          value={metaTags.title}
          onChange={(e) => setMetaTags({ ...metaTags, title: e.target.value })}
        />
        <input
          className="block w-full mb-2 p-2 border rounded"
          type="text"
          placeholder="Default Meta Description"
          value={metaTags.description}
          onChange={(e) => setMetaTags({ ...metaTags, description: e.target.value })}
        />
        <p className="text-sm text-gray-600">Add OG tags, canonical URL, and language-specific meta.</p>
      </section>

      {/* Script Injection */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Script Injection (GTM, Pixel)</h2>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Paste script here..."
          rows={4}
          onChange={(e) => setScripts([...scripts, e.target.value])}
        />
        <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded">Add Script</button>
        <p className="text-sm text-gray-600">You can manage header/footer scripts and region-specific tracking here.</p>
      </section>
    </div>
  );
}
