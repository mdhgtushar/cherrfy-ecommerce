import React, { useState } from "react";
import D2CLayout from "./D2CLayout";
import FactoryRegistration from "./pages/FactoryRegistration";
import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import ShippingZones from "./pages/ShippingZones";
import FactoryDashboard from "./pages/FactoryDashboard";
import StorefrontBranding from "./pages/StorefrontBranding";

export default function D2CManagement() {
  const [activeTab, setActiveTab] = useState("factory-registration");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "factory-registration":
        return <FactoryRegistration />;
      case "product-management":
        return <ProductManagement />;
      case "order-management":
        return <OrderManagement />;
      case "shipping-zones":
        return <ShippingZones />;
      case "factory-dashboard":
        return <FactoryDashboard />;
      case "storefront-branding":
        return <StorefrontBranding />;
      default:
        return <FactoryRegistration />;
    }
  };

  return (
    <D2CLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActiveTab()}
    </D2CLayout>
  );
}
