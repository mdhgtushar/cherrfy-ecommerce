import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import ProductListPage from "./list/ProductListPage";


export default function ProductManagement() {
  const [source, setSource] = useState("manual");
  const [status, setStatus] = useState("published");
  const [filter, setFilter] = useState({ source: "all", search: "" });

  return (
    <div className="p-6 space-y-6">
      {/* Product List */}
      <section className="border p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Product List</h2>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0">
          <select
            className="p-2 border rounded"
            value={filter.source}
            onChange={(e) => setFilter({ ...filter, source: e.target.value })}
          >
            <option value="all">All Sources</option>
            <option value="aliexpress">AliExpress</option>
            <option value="local">Local</option>
            <option value="vendor">Vendor</option>
          </select>
          <input
            type="text"
            placeholder="Search by Name, SKU, Tag"
            className="p-2 border rounded w-full"
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="indigo">Edit</Button>
          <Button variant="yellow">Disable</Button>
          <Button variant="red">Delete</Button>
          <Button variant="purple">Bulk Edit</Button>
          <Button variant="black">Export to CSV</Button>
          <Button variant="black">Export to JSON</Button>
        </div>
      </section>
      <ProductListPage />
     
    </div>
  );
}
