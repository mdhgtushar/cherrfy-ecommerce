import React, { useState } from "react";

const AeItemSkuInfoDtos = ({ skuInfo }) => {
  skuInfo =  [
    {
      sku_attr: "14:200005100#984 Gold Blue",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3373,
      sku_stock: true,
      sku_id: "12000044382493157",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3373,
      id: "14:200005100#984 Gold Blue",
      sku_code: "14:200005100",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "Coffee",
            sku_image:
              "https://ae01.alicdn.com/kf/S9eeceeaee24949febebb898c754faa4aF.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Gold Blue",
            property_value_id: 200005100,
            sku_property_id: 14,
          },
        ],
      },
    },
    {
      sku_attr: "14:201447303#984 Gold Black",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3387,
      sku_stock: true,
      sku_id: "12000044382493156",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3387,
      id: "14:201447303#984 Gold Black",
      sku_code: "14:201447303",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "Rose",
            sku_image:
              "https://ae01.alicdn.com/kf/S68e7cf4742de43d79afa4c7f6ce65484o.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Gold Black",
            property_value_id: 201447303,
            sku_property_id: 14,
          },
        ],
      },
    },
    {
      sku_attr: "14:100013777#984 Gold Gold",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3387,
      sku_stock: true,
      sku_id: "12000044382493159",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3387,
      id: "14:100013777#984 Gold Gold",
      sku_code: "14:100013777",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "Pink",
            sku_image:
              "https://ae01.alicdn.com/kf/Sd01b1c6ebf5743c2bee7152a1b3105ccv.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Gold Gold",
            property_value_id: 100013777,
            sku_property_id: 14,
          },
        ],
      },
    },
    {
      sku_attr: "14:200000080#984 Gold Green",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3414,
      sku_stock: true,
      sku_id: "12000044382493158",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3414,
      id: "14:200000080#984 Gold Green",
      sku_code: "14:200000080",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "Multicolor",
            sku_image:
              "https://ae01.alicdn.com/kf/Sabb6e7ef489f47a19e5283a0c8b64d51b.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Gold Green",
            property_value_id: 200000080,
            sku_property_id: 14,
          },
        ],
      },
    },
    {
      sku_attr: "14:201447598#984 Gold White",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3327,
      sku_stock: true,
      sku_id: "12000044382493155",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3327,
      id: "14:201447598#984 Gold White",
      sku_code: "14:201447598",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "BRONZE",
            sku_image:
              "https://ae01.alicdn.com/kf/S748a46f75309436888dfe8eaca09495dc.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Gold White",
            property_value_id: 201447598,
            sku_property_id: 14,
          },
        ],
      },
    },
    {
      sku_attr: "14:350686#984 Silver White",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3404,
      sku_stock: true,
      sku_id: "12000044382493161",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3404,
      id: "14:350686#984 Silver White",
      sku_code: "14:350686",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "Brown",
            sku_image:
              "https://ae01.alicdn.com/kf/S135385fab23a409a8822cf8e156856c7f.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Silver White",
            property_value_id: 350686,
            sku_property_id: 14,
          },
        ],
      },
    },
    {
      sku_attr: "14:100005979#984 Black Black",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3348,
      sku_stock: true,
      sku_id: "12000044382493160",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3348,
      id: "14:100005979#984 Black Black",
      sku_code: "14:100005979",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "Ivory",
            sku_image:
              "https://ae01.alicdn.com/kf/S47728b44a14f491da9c6d2b7d56f0619R.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Black Black",
            property_value_id: 100005979,
            sku_property_id: 14,
          },
        ],
      },
    },
    {
      sku_attr: "14:350853#984 Silver Blue",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3411,
      sku_stock: true,
      sku_id: "12000044382493163",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3411,
      id: "14:350853#984 Silver Blue",
      sku_code: "14:350853",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "Silver",
            sku_image:
              "https://ae01.alicdn.com/kf/S30c1c6b398e341e4ad9adee703e084c54.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Silver Blue",
            property_value_id: 350853,
            sku_property_id: 14,
          },
        ],
      },
    },
    {
      sku_attr: "14:350850#984 Silver Black",
      offer_sale_price: "17.50",
      ipm_sku_stock: 3409,
      sku_stock: true,
      sku_id: "12000044382493162",
      price_include_tax: false,
      currency_code: "USD",
      sku_price: "175.01",
      offer_bulk_sale_price: "17.50",
      sku_available_stock: 3409,
      id: "14:350850#984 Silver Black",
      sku_code: "14:350850",
      ae_sku_property_dtos: {
        ae_sku_property_d_t_o: [
          {
            sku_property_value: "Gold",
            sku_image:
              "https://ae01.alicdn.com/kf/Se857def2f0024b3ca27c7cf02850c22cO.jpg",
            sku_property_name: "Color",
            property_value_definition_name: "984 Silver Black",
            property_value_id: 350850,
            sku_property_id: 14,
          },
        ],
      },
    },
  ]
  const [selectedSkuId, setSelectedSkuId] = useState("");

  const handleSelectChange = (e) => {
    setSelectedSkuId(e.target.value);
  };

  const selectedSku = skuInfo.find((sku) => sku.sku_id === selectedSkuId);

  return (
    <div className="p-4">
      <label className="font-semibold">Select SKU:</label>
      <select
        className="border rounded p-2 ml-2"
        value={selectedSkuId}
        onChange={handleSelectChange}
      >
        <option value="">-- Select SKU --</option>
        {skuInfo.map((sku) => (
          <option key={sku.sku_id} value={sku.sku_id}>
            {sku.sku_attr}
          </option>
        ))}
      </select>

      {selectedSku && (
        <div className="mt-4 border p-4 rounded bg-gray-50">
          <h3 className="font-bold mb-2">Editing SKU: {selectedSku.sku_attr}</h3>
          <div className="mb-2">
            <label>Offer Sale Price: </label>
            <input
              type="text"
              defaultValue={selectedSku.offer_sale_price}
              className="border rounded p-1 ml-2"
            />
          </div>
          <div className="mb-2">
            <label>Stock: </label>
            <input
              type="number"
              defaultValue={selectedSku.ipm_sku_stock}
              className="border rounded p-1 ml-2"
            />
          </div>
          <div className="mb-2">
            <label>Currency Code: </label>
            <input
              type="text"
              defaultValue={selectedSku.currency_code}
              className="border rounded p-1 ml-2"
            />
          </div>
          <img
            src={
              selectedSku.ae_sku_property_dtos.ae_sku_property_d_t_o[0]
                .sku_image
            }
            alt="SKU"
            className="w-24 mt-3"
          />
        </div>
      )}
    </div>
  );
};

export default AeItemSkuInfoDtos;
