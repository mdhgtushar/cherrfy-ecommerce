import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/Button';

const AddProperty = ({ propertyList = [], onProgress }) => {
    const [dataList, setDataList] = useState(propertyList);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        if (propertyList.length > 0) {
            setDataList(propertyList);
        } else {
            // Initialize with one empty property
            setDataList([{ attr_name: '', attr_value: '' }]);
        }
    }, [propertyList]);

    useEffect(() => {
        // Check if at least one property is complete
        const hasCompleteProperty = dataList.some(item => 
            item.attr_name.trim() !== '' && item.attr_value.trim() !== ''
        );
        onProgress?.(hasCompleteProperty);
    }, [dataList, onProgress]);

    const handleInputChange = (index, event) => {
        const values = [...dataList];
        values[index][event.target.name] = event.target.value;
        setDataList(values);
    };

    const handleAddClick = () => {
        setDataList([...dataList, { attr_name: '', attr_value: '' }]);
    };

    const handleRemoveClick = (index) => {
        if (dataList.length > 1) {
            const values = [...dataList];
            values.splice(index, 1);
            setDataList(values);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitMessage("");

        try {
            // Validate that all properties have both name and value
            const isValid = dataList.every(item => 
                item.attr_name.trim() !== '' && item.attr_value.trim() !== ''
            );

            if (!isValid) {
                setSubmitMessage("Please fill in all attribute names and values.");
                return;
            }

            // Format the data before submission
            const formattedData = dataList.map((item, index) => ({
                attr_name_id: index + 1,
                attr_value_id: index + 1000,
                attr_name: item.attr_name.trim(),
                attr_value: item.attr_value.trim()
            }));

            console.log("Submitting properties:", formattedData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSubmitMessage("Properties saved successfully!");
            setTimeout(() => setSubmitMessage(""), 3000);
        } catch (error) {
            setSubmitMessage("Failed to save properties. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearAll = () => {
        setDataList([{ attr_name: '', attr_value: '' }]);
        setSubmitMessage("");
    };

    const addPresetProperties = () => {
        const presetProperties = [
            { attr_name: 'Color', attr_value: '' },
            { attr_name: 'Size', attr_value: '' },
            { attr_name: 'Material', attr_value: '' },
            { attr_name: 'Brand', attr_value: '' },
            { attr_name: 'Weight', attr_value: '' }
        ];
        setDataList([...dataList, ...presetProperties]);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Properties</h2>
                <p className="text-gray-600">Define product attributes and specifications</p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={addPresetProperties}
                >
                    Add Common Properties
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                >
                    Clear All
                </Button>
            </div>

            {/* Properties List */}
            <div className="space-y-4">
                {dataList.map((data, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-medium text-gray-900">
                                Property #{index + 1}
                            </h3>
                            {dataList.length > 1 && (
                                <button
                                    onClick={() => handleRemoveClick(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    title="Remove Property"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="attr_name"
                                    placeholder="e.g., Color, Size, Material"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={data.attr_name}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Value <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="attr_value"
                                    placeholder="e.g., Red, Large, Cotton"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={data.attr_value}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                        </div>

                        {/* Validation Status */}
                        <div className="mt-3 flex items-center space-x-2">
                            {data.attr_name.trim() !== '' && data.attr_value.trim() !== '' ? (
                                <div className="flex items-center space-x-1 text-green-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm">Complete</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-1 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">Incomplete</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add More Button */}
            <div className="flex justify-center">
                <Button
                    variant="outline"
                    onClick={handleAddClick}
                    className="flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Another Property</span>
                </Button>
            </div>

            {/* Submit Section */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isSubmitting ? "Saving..." : "Save Properties"}
                        </Button>
                        
                        {submitMessage && (
                            <div className={`text-sm ${
                                submitMessage.includes("successfully") 
                                    ? "text-green-600" 
                                    : "text-red-600"
                            }`}>
                                {submitMessage}
                            </div>
                        )}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                        {dataList.filter(item => item.attr_name.trim() !== '' && item.attr_value.trim() !== '').length} of {dataList.length} properties complete
                    </div>
                </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h4 className="text-sm font-medium text-blue-900">Property Tips</h4>
                        <ul className="text-sm text-blue-800 mt-1 space-y-1">
                            <li>• Use descriptive property names (e.g., "Color" instead of "Attr1")</li>
                            <li>• Be consistent with value formats across similar products</li>
                            <li>• Include units for measurements (e.g., "500g", "15cm")</li>
                            <li>• Use the "Add Common Properties" button for standard attributes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;
