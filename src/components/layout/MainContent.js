import React from "react"; 
import SubdomainCard from "./SubdomainCard";
const MainContent = () => {
  return (
    <div className="p-6">
      <div className="w-full p-6 bg-gray-100">
        <div className="grid gap-6 grid-cols-1">
          <SubdomainCard
            title="cherrfy.com"
            description="The main Cherrfy website, where users can learn about our platform, explore features, and access our services."
          />
          <SubdomainCard
            title="dev.cherrfy.com"
            description="The development environment for Cherrfy, where new features and updates are tested before going live."
          />
          <SubdomainCard
            title="api.cherrfy.com"
            description="The API subdomain, which provides access to Cherrfy's backend services and data endpoints."
          />
          <SubdomainCard
            title="ai.cherrfy.com"
            description="The AI services hub for Cherrfy, where users can access AI-driven features like personalized recommendations."
          />
          <SubdomainCard
            title="developers.cherrfy.com"
            description="A dedicated resource center for developers working with Cherrfy’s API and other tools."
          />
        </div>
      </div>
    </div>
  );
};
export default MainContent;
