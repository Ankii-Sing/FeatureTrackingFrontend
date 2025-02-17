import React from "react";

const UpdateFeatureForm = ({ users, formData, handleChange, handleSubmit }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Update Feature</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Feature Title" name="title" value={formData.title} onChange={handleChange} />
          <TextareaField label="Feature Description" name="description" value={formData.description} onChange={handleChange} />
          <InputField label="Due Date" type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          <DropdownField label="Feature Stage" name="stage" value={formData.stage} onChange={handleChange} options={[
            "TECHNICAL_DESIGN", "DEV_TESTING", "QA_TESTING", "PRE_POST_DEPLOYMENT", 
            "SANITY_TESTING_STAGING", "PRODUCT_GO_AHEAD", "EPIC_OWNER_GO_AHEAD"
          ]} />
          <DropdownField label="Feature Status" name="status" value={formData.status} onChange={handleChange} options={[
            "IN_PROGRESS", "COMPLETED", "PENDING"
          ]} />
          <DropdownField label="Assigned Developer" name="assignedTo" value={formData.assignedTo} onChange={handleChange} users={users} role="DEVELOPER" />
          <DropdownField label="Product Manager" name="prodManager" value={formData.prodManager} onChange={handleChange} users={users} role="PRODUCT_MANAGER" />
          <DropdownField label="QA Tester" name="qaEngineer" value={formData.qaEngineer} onChange={handleChange} users={users} role="QA_ENGINEER" />
          <DropdownField label="Epic Owner" name="epicOwner" value={formData.epicOwner} onChange={handleChange} users={users} role="EPIC_OWNER" />
          <button type="submit" className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
            Update Feature
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFeatureForm;

// Helper Components
const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400" {...props} required />
  </div>
);

const TextareaField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <textarea className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400 resize-none" rows="4" {...props} required />
  </div>
);

const DropdownField = ({ label, name, value, onChange, options, users, role }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full p-3 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-teal-400" required>
      <option value="">Select {label}</option>
      {options
        ? options.map((option) => <option key={option} value={option}>{option}</option>)
        : users.filter((u) => u.role === role).map((user) => <option key={user.userId} value={user.userId}>{user.username}</option>)
      }
    </select>
  </div>
);
