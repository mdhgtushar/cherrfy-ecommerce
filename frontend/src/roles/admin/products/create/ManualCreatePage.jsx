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
    { 
      id: 1, 
      name: "Basic Information", 
      icon: "📝", 
      component: "basicInfo",
      description: "Product name, description, and basic details"
    },
    { 
      id: 2, 
      name: "Images & Media", 
      icon: "🖼️", 
      component: "images",
      description: "Upload product images and media files"
    },
    { 
      id: 3, 
      name: "Properties", 
      icon: "🏷️", 
      component: "properties",
      description: "Define product attributes and specifications"
    },
    { 
      id: 4, 
      name: "SKUs & Pricing", 
      icon: "💰", 
      component: "skus",
      description: "Set up variants, pricing, and inventory"
    },
    { 
      id: 5, 
      name: "SEO & Labels", 
      icon: "🔍", 
      component: "seo",
      description: "Optimize for search and add labels"
    }
  ];

  const handleStepChange = (stepId) => {
    if (stepId <= currentStep || formProgress[steps[stepId - 1]?.component]) {
      setCurrentStep(stepId);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={ADMIN_PATHS.PRODUCTS.SOURCE}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Create New Product</h1>
                <p className="text-sm text-slate-600">Manual product creation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-sm text-slate-600">
                  Progress: {Math.round(progressPercentage)}%
                </div>
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors">
                  Save Draft
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || progressPercentage < 100}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Create Product</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Steps */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Product Setup</h2>
              
              {/* Steps */}
              <nav className="space-y-3">
                {steps.map((step) => {
                  const status = getStepStatus(step.id);
                  const isAccessible = step.id <= currentStep || formProgress[step.component];
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepChange(step.id)}
                      disabled={!isAccessible}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        status === "completed"
                          ? "bg-green-50 border border-green-200 text-green-700"
                          : status === "current"
                          ? "bg-blue-50 border border-blue-200 text-blue-700"
                          : isAccessible
                          ? "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                          : "bg-slate-50 border border-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                          status === "completed"
                            ? "bg-green-500 text-white"
                            : status === "current"
                            ? "bg-blue-500 text-white"
                            : isAccessible
                            ? "bg-slate-300 text-slate-600"
                            : "bg-slate-200 text-slate-400"
                        }`}>
                          {status === "completed" ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-lg">{step.icon}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold mb-1">{step.name}</div>
                          <div className="text-sm opacity-75">{step.description}</div>
                          {formProgress[step.component] && (
                            <div className="flex items-center space-x-1 mt-2">
                              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-xs text-green-600">Complete</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Progress Summary */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Overall Progress</span>
                    <span className="font-semibold text-slate-900">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {totalProgress} of {Object.keys(formProgress).length} sections complete
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Preview Product</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                      </svg>
                      <span>Duplicate Product</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Get Help</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8">
                {renderStepContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualCreatePage;
