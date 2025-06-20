import React, { useState } from 'react';

const DisputeCenter = () => {
  const [form, setForm] = useState({
    subject: '',
    orderId: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle actual submit here (API call, validation, etc.)
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Dispute Center / Appeal</h1>

      <p className="text-gray-700 mb-6">
        If you have any issues with your order, delivery, or service, you can submit a dispute or appeal below. Our support team will review and respond within 48 hours.
      </p>

      {submitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded">
          ✅ Your appeal has been submitted. We will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
              placeholder="E.g., Wrong item received"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Order ID (if applicable)</label>
            <input
              type="text"
              name="orderId"
              value={form.orderId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="E.g., #123456"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Message / Explanation</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border p-2 rounded"
              placeholder="Describe your issue in detail..."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Appeal
          </button>
        </form>
      )}
    </div>
  );
};

export default DisputeCenter;
