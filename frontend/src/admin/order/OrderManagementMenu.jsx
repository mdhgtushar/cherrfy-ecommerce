import React, { useState } from 'react';

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-semibold text-lg bg-gray-100 p-3 rounded hover:bg-gray-200"
      >
        {open ? '▼' : '►'} {title}
      </button>
      {open && <div className="pl-6 pt-2 text-sm text-gray-700">{children}</div>}
    </div>
  );
};

const Bullet = ({ children }) => <div className="ml-4 list-disc list-inside">{children}</div>;
const SubBullet = ({ children }) => <div className="ml-8 list-disc list-inside text-gray-600">{children}</div>;

const OrderManagementMenu = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🛒 Order Management</h2>

      <Section title="All Orders">
        <Bullet>View Combined Order List (All Types)</Bullet>
        <Bullet>Filter by Order Type (B2C, D2C, B2B)</Bullet>
        <Bullet>Search by Order ID / Customer / Vendor</Bullet>
        <Bullet>Sort by Date, Value, Payment Status</Bullet>
        <Bullet>Bulk Action (Print, Export, Update Status)</Bullet>
      </Section>

      <Section title="Order Details (by Type: B2C / D2C / B2B)">
        <Bullet>Product + SKU Details</Bullet>
        <Bullet>Shipping Method + Tracking</Bullet>
        <Bullet>Payment Method & Gateway Reference</Bullet>
        <Bullet>Vendor / Factory / AE Supplier Info</Bullet>
        <Bullet>Notes or Special Instructions</Bullet>
        <SubBullet>Activity Log per Order</SubBullet>
      </Section>

      <Section title="Manual Order Placement">
        <Bullet>Create Order by Admin (for walk-in, B2B, resellers)</Bullet>
        <Bullet>Select Products, Enter Address, Apply Discount</Bullet>
        <Bullet>Simulate Payment (Cash / Offline Payment)</Bullet>
        <SubBullet>Assign to Specific Vendor / Factory / Logistics</SubBullet>
      </Section>

      <Section title="AliExpress Order Forwarding">
        <Bullet>API Order Placement from Saved Product Data</Bullet>
        <Bullet>Auto-fill Logistics Info per Country</Bullet>
        <Bullet>Select Preferred Shipping Option</Bullet>
        <Bullet>View AliExpress Order Status in Realtime</Bullet>
        <Bullet>AE Order ID Mapping & Sync Logs</Bullet>
      </Section>

      <Section title="Failed/Cancelled Order Recovery">
        <Bullet>Show All Failed Orders with Error Reason</Bullet>
        <Bullet>Retry Order Button</Bullet>
        <Bullet>Restore Cancelled Orders (if conditions allow)</Bullet>
        <SubBullet>Notify Admin of Repeated Failures</SubBullet>
      </Section>

      <Section title="Refund Handling">
        <Bullet>Initiate Full/Partial Refund</Bullet>
        <Bullet>Attach Reason + Evidence (optional)</Bullet>
        <Bullet>Refund Status Tracker</Bullet>
        <Bullet>Payment Gateway Refund Logs</Bullet>
        <Bullet>Factory or Vendor Refund Coordination</Bullet>
      </Section>

      <Section title="Status History Logs">
        <Bullet>Timeline of Status Changes (Confirmed → Shipped → Delivered)</Bullet>
        <Bullet>Admin/User Action Source Tracking</Bullet>
        <Bullet>Note Entries at Each Status Step</Bullet>
        <SubBullet>Exportable History for Support Team</SubBullet>
      </Section>
    </div>
  );
};

export default OrderManagementMenu;
