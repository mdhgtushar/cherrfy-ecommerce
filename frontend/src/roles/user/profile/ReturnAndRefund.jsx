import React from 'react';

const ReturnAndRefund = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Return & Refund Policy</h1>

      <p className="text-gray-700 mb-4">
        Thank you for shopping at <strong>Cherrfy.com</strong>. If you are not entirely satisfied
        with your purchase, we're here to help.
      </p>

      {/* Return Conditions */}
      <h2 className="text-xl font-semibold mb-2">Returns</h2>
      <p className="text-gray-700 mb-4">
        You have <strong>7 calendar days</strong> to return an item from the date you received it.
        To be eligible for a return:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        <li>The item must be unused and in the same condition you received it.</li>
        <li>The item must be in the original packaging.</li>
        <li>You must provide the receipt or proof of purchase.</li>
      </ul>

      {/* Refund Process */}
      <h2 className="text-xl font-semibold mb-2">Refunds</h2>
      <p className="text-gray-700 mb-4">
        Once we receive your item, we will inspect it and notify you on the status of your refund.
        If your return is approved, we will initiate a refund to your original method of payment.
      </p>

      {/* Time */}
      <h2 className="text-xl font-semibold mb-2">Refund Time</h2>
      <p className="text-gray-700 mb-4">
        You will receive the credit within a certain number of days, depending on your card issuer’s
        policies (usually 5–10 business days).
      </p>

      {/* Shipping */}
      <h2 className="text-xl font-semibold mb-2">Return Shipping</h2>
      <p className="text-gray-700 mb-4">
        You will be responsible for paying for your own shipping costs for returning the item.
        Shipping costs are non-refundable.
      </p>

      {/* Contact Info */}
      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions about our Return and Refund Policy, please contact us at:
      </p>
      <ul className="list-inside list-disc text-gray-700 mt-2">
        <li>Email: support@cherrfy.com.com</li>
        <li>Phone: +880 1302-855453</li>
      </ul>
    </div>
  );
};

export default ReturnAndRefund;
