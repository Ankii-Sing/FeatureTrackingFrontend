import React from "react";
import { useState } from "react";


const AddFeatureForm = ({ users, formData, handleChange, handleSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Add Feature</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <InputField label="Feature Name" name="title" value={formData.title} onChange={handleChange} placeholder="Enter feature name" />


          <TextareaField label="Feature Description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter feature description" />


          <InputField label="Due Date" type="date" name="duedate" value={formData.duedate} onChange={handleChange} />


          <DropdownField label="Assigned Developer" name="assignedTo" users={users} role="DEVELOPER" value={formData.assignedTo} onChange={handleChange} />
          <DropdownField label="Product Manager" name="prodManager" users={users} role="PRODUCT_MANAGER" value={formData.prodManager} onChange={handleChange} />
          <DropdownField label="QA Tester" name="qaEngineer" users={users} role="QA_ENGINEER" value={formData.qaEngineer} onChange={handleChange} />
          <DropdownField label="Epic Owner" name="epicOwner" users={users} role="EPIC_OWNER" value={formData.epicOwner} onChange={handleChange} />

          <button type="submit" className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
            Submit Feature
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFeatureForm;

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 placeholder-slate-400" {...props} required />
  </div>
);

const TextareaField = ({ label, maxLength = 512, ...props }) => {
    const [value, setValue] = useState("");
    const [showWarning, setShowWarning] = useState(false);
  
    const handleChange = (e) => {
      if (e.target.value.length > maxLength) {
        setShowWarning(true);
        return;
      }
  
      setValue(e.target.value);
      setShowWarning(false); 
    };
  
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-slate-700 mb-1" title={`Max ${maxLength} characters allowed`}>
          {label} ({value.length}/{maxLength})
        </label>
 
        <textarea
          className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 placeholder-slate-400 resize-none"
          rows="4"
          value={value}
          onChange={handleChange}
          required
          {...props}
        />
  
        {showWarning && (
          <p className="text-red-600 text-sm mt-1">⚠️ You have reached the maximum character limit.</p>
        )}
      </div>
    );
  };

  

const DropdownField = ({ label, name, users, role, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400" required>
      <option value="">Select {label}</option>
      {users.filter((u) => u.role === role).map((user) => (
        <option key={user.userId} value={user.userId}>
          {user.username}
        </option>
      ))}
    </select>
  </div>
);
