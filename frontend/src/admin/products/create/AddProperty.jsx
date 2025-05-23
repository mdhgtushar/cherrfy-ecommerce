import React, { useState } from 'react';

const AddProperty = ({propertyList = []}) => {
    const [dataList, setDataList] = useState(propertyList);

    const handleInputChange = (index, event) => {
        const values = [...dataList];
        values[index][event.target.name] = event.target.value;
        setDataList(values);
    };

    const handleAddClick = () => {
        setDataList([...dataList, { attr_name: '', attr_value: '' }]);
    };

    const handleRemoveClick = (index) => {
        const values = [...dataList];
        values.splice(index, 1);
        setDataList(values);
    };

    const handleSubmit = () => {
        // Format the data before submission
        const formattedData = dataList.map((item, index) => ({
            attr_name_id: index + 1, // Example: Attribute IDs can be generated here
            attr_value_id: index + 1000, // Example: Value IDs can be generated here
            attr_name: item.attr_name,
            attr_value: item.attr_value
        }));
        console.log(formattedData); // Output the array
    };

    return (
        <div className=''>
            <h2 className='text-lg font-bold mb-4'>Add Product Attributes</h2>
            {dataList.map((data, index) => (
                <div key={index} className='mb-4'>
                    <input
                        type="text"
                        name="attr_name"
                        placeholder="Attribute Name"
                        className='mr-2 border p-2 rounded'
                        value={data.attr_name}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    <input
                        type="text"
                        name="attr_value"
                        placeholder="Attribute Value"
                        className='mr-2 border p-2 rounded'
                        value={data.attr_value}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    <button onClick={() => handleRemoveClick(index)} className='bg-red-500 text-white p-2 rounded'>
                        Remove
                    </button>
                </div>
            ))}
            <button onClick={handleAddClick} className='bg-blue-500 text-white p-2 rounded' >+ Add More</button>
            <button onClick={handleSubmit} className='bg-green-500 text-white p-2 rounded ml-4'>
                Submit
            </button>
        </div>
    );
};

export default AddProperty;
