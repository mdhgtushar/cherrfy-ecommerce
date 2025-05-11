import React, { useState } from "react";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    tagline: "",
    developer: "Hobayer Golondaz Tushar",
    description: "",
    problem: "",
    solution: "",
    users: "",
    business: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can send this data to backend or display in UI
  };

  return (
    <div className="max-w-3xl p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Cherrfy Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Project name:" name="projectName" value={formData.projectName} onChange={handleChange} />
        <InputField label="Project tagline:" name="tagline" value={formData.tagline} onChange={handleChange} />
        <InputField label="Developer:" name="developer" value={formData.developer} onChange={handleChange} disabled />
        <TextAreaField label="Project Description:" name="description" value={formData.description} onChange={handleChange} />
        <TextAreaField label="Problem at a glance:" name="problem" value={formData.problem} onChange={handleChange} />
        <TextAreaField label="Offered solution:" name="solution" value={formData.solution} onChange={handleChange} />
        <TextAreaField label="Targeted Users:" name="users" value={formData.users} onChange={handleChange} />
        <TextAreaField label="Business perspective:" name="business" value={formData.business} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, disabled = false }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <textarea
      name={name}
      rows={4}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
  </div>
);

export default ProjectForm;
