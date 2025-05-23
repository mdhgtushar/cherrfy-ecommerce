import React from "react";
import Button from "../../../components/ui/Button";

const ProductLavelCreate = () => {
  return (
    <div>
      {/* Tag & Category Mapping */}
      <section className="">
        <h2 className="text-xl font-semibold mb-2">Tag & Category Mapping</h2>
        <input
          placeholder="Internal Tags (e.g. Luxury, Minimal)"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          placeholder="Main Category"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          placeholder="Subcategory"
          className="block w-full mb-2 p-2 border rounded"
        />
        <Button variant="blue">Auto-Assign Category</Button>
      </section>
      {/* Labels */}
      <section className="">
        <h2 className="text-xl font-semibold mb-2">
          Labels (Hot, Trending, Flash)
        </h2>
        <input
          placeholder="Label Name (e.g., Hot, Flash)"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          placeholder="Label Color (#hex or name)"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="datetime-local"
          className="block w-full mb-2 p-2 border rounded"
        />
        <Button variant="red">Schedule Flash Sale</Button>
      </section>
    </div>
  );
};

export default ProductLavelCreate;
