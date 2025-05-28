import React, { useState } from "react";
import AddProperty from "./AddProperty";
import AddSKU from "./AddSKU";
import Button from "../../../../components/ui/Button";
import ProductInformationCreate from "./ProductInformationCreate";
import SeoFieldsCreate from "./SeoFieldsCreate";
import ProductLavelCreate from "./ProductLavelCreate";
import ImageCreate from "./ImageCreate";

const ManualCreatePage = () => {
  const [source, setSource] = useState("manual");
  const [status, setStatus] = useState("published");

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex-1 p-4">
          <ProductInformationCreate />
          <AddProperty />
          <AddSKU />
        </div>
        <div className="w-96 p-4 border-l">
          {/* Draft / Published / Disabled */}
          <section className="border p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Product Status View</h2>
            <select
              className="w-full p-2 border rounded mb-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="disabled">Disabled</option>
            </select>
            <div className="space-x-2">
              <Button variant="green">Approve / Publish</Button>
              <Button variant="gray">Temporarily Disable</Button>
              <Button variant="red">Archive Product</Button>
            </div>
          </section>
          <ImageCreate />
          <SeoFieldsCreate />
          <ProductLavelCreate />
        </div>
      </div>
    </>
  );
};

export default ManualCreatePage;
