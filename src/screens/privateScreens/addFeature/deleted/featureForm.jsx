// const FeatureForm = ({ users, formData, handleChange, handleSubmit }) => {
//     return (
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//         <input type="text" name="title" placeholder="Feature Name" value={formData.title} onChange={handleChange} required />
//         <input type="text" name="description" placeholder="Feature Description" value={formData.description} onChange={handleChange} required />
//         <input type="date" name="duedate" value={formData.duedate} onChange={handleChange} required />
  
//         {["assignedTo", "prodManager", "qaEngineer", "epicOwner"].map((role) => (
//           <select key={role} name={role} value={formData[role]} onChange={handleChange} required>
//             <option value="">Select {role}</option>
//             {users.filter((u) => u.role.toUpperCase() === role.toUpperCase()).map((user) => (
//               <option key={user.userId} value={user.userId}>
//                 {user.username}
//               </option>
//             ))}
//           </select>
//         ))}
  
//         <button type="submit">Submit Feature</button>
//       </form>
//     );
//   };
  
//   export default FeatureForm;