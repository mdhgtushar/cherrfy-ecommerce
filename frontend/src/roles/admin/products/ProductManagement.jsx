import React, { useState } from "react";
import {Button} from "../../../components/ui/Button"
import ProductListPage from "./list/ProductListPage";


export default function ProductManagement() {
  const [source, setSource] = useState("manual");
  const [status, setStatus] = useState("published");
  const [filter, setFilter] = useState({ source: "all", search: "" });

  return (
    <div className="p-6 space-y-6">
     
      <ProductListPage />
     
    </div>
  );
}
