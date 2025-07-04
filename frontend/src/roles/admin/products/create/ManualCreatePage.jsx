import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddProperty from "./AddProperty";
import AddSKU from "./AddSKU";
import Button from "../../../../components/ui/Button";
import ProductInformationCreate from "./ProductInformationCreate";
import SeoFieldsCreate from "./SeoFieldsCreate";
import ProductLavelCreate from "./ProductLavelCreate";
import ImageCreate from "./ImageCreate";
import ADMIN_PATHS from "../../ADMIN_PATHS";

const ManualCreatePage = () => {
  const [source, setSource] = useState("manual");
  const [status, setStatus] = useState("draft");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formProgress, setFormProgress] = useState({
    basicInfo: false,
    images: false,
    properties: false,
    skus: false,
    seo: false,
    labels: false
  });

  const steps = [
    { id: 1, name: "Basic Information", icon: "📝", component: "basicInfo" },
    { id: 2, name: "Images & Media", icon: "🖼️", component: "images" },
    { id: 3, name: "Properties", icon: "🏷️", component: "properties" },
    { id: 4, name: "SKUs & Pricing", icon: "💰", component: "skus" },
    { id: 5, name: "SEO & Labels", icon: "🔍", component: "seo" }
  ];

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleFormProgress = (section, isComplete) => {
    setFormProgress(prev => ({
      ...prev,
      [section]: isComplete
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Product created successfully!");
      // Redirect to products list
    } catch (error) {
      toast.error("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProductInformationCreate onProgress={(complete) => handleFormProgress("basicInfo", complete)} />;
      case 2:
        return <ImageCreate onProgress={(complete) => handleFormProgress("images", complete)} />;
      case 3:
        return <AddProperty onProgress={(complete) => handleFormProgress("properties", complete)} />;
      case 4:
        return <AddSKU onProgress={(complete) => handleFormProgress("skus", complete)} />;
      case 5:
        return (
          <div className="space-y-6">
            <SeoFieldsCreate onProgress={(complete) => handleFormProgress("seo", complete)} />
            <ProductLavelCreate onProgress={(complete) => handleFormProgress("labels", complete)} />
          </div>
        );
      default:
        return <ProductInformationCreate />;
    }
  };

  const totalProgress = Object.values(formProgress).filter(Boolean).length;
  const progressPercentage = (totalProgress / Object.keys(formProgress).length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={ADMIN_PATHS.PRODUCTS.SOURCE}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
                <p className="text-sm text-gray-600">Manual product creation</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                Progress: {Math.round(progressPercentage)}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Steps */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Setup</h2>
              
              {/* Steps */}
              <nav className="space-y-2">
                {steps.map((step) => {
                  const status = getStepStatus(step.id);
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepChange(step.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        status === "completed"
                          ? "bg-green-50 border border-green-200 text-green-700"
                          : status === "current"
                          ? "bg-blue-50 border border-blue-200 text-blue-700"
                          : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          status === "completed"
                            ? "bg-green-500 text-white"
                            : status === "current"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}>
                          {status === "completed" ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            step.id
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{step.name}</div>
                          <div className="text-xs opacity-75">{step.icon}</div>
                        </div>
                        {formProgress[step.component] && (
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    Save as Draft
                  </button>
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    Preview Product
                  </button>
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    Duplicate Product
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Step Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {steps.find(s => s.id === currentStep)?.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Step {currentStep} of {steps.length}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {currentStep > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => handleStepChange(currentStep - 1)}
                      >
                        Previous
                      </Button>
                    )}
                    {currentStep < steps.length ? (
                      <Button
                        onClick={() => handleStepChange(currentStep + 1)}
                        disabled={!formProgress[steps.find(s => s.id === currentStep)?.component]}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || progressPercentage < 100}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSubmitting ? "Creating..." : "Create Product"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                {renderStepContent()}
              </div>
            </div>

            {/* Status Panel */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Status</h3>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{totalProgress}</div>
                  <div className="text-sm text-gray-600">Sections Complete</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{Object.keys(formProgress).length - totalProgress}</div>
                  <div className="text-sm text-gray-600">Sections Remaining</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-gray-600">Overall Progress</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Save Draft
                </Button>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualCreatePage;
