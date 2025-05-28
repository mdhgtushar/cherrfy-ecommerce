import React from "react";

const SeoFieldsCreate = () => {
  return (
    <section className="rounded">
      <h2 className="text-xl font-semibold mb-2">SEO Fields</h2>
      <input
        placeholder="Meta Title"
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        placeholder="Meta Description"
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        placeholder="URL Slug"
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        placeholder="Focus Keyword"
        className="block w-full mb-2 p-2 border rounded"
      />
      <label className="flex items-center space-x-2">
        <input type="checkbox" />
        <span>Index this page</span>
      </label>
    </section>
  );
};

export default SeoFieldsCreate;
