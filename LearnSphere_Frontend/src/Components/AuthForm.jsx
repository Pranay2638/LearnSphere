import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ isSignup, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    standard: "",
    board: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {/* Additional Fields for SignUp */}
          {isSignup && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="standard"
                placeholder="Standard"
                value={formData.standard}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="board"
                placeholder="Board (CBSE, ICSE, SSC, etc.)"
                value={formData.board}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <Link
            to={isSignup ? "/login" : "/signup"}
            className="text-blue-500 ml-1 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;


// export default AuthForm;
// import React from 'react';

// const AuthForm = ({ type, handleSubmit, handleChange, formData }) => {
//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium">Username</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           required={type === "signup"}
//           className="w-full border rounded-lg p-2"
//         />
//       </div>
//       {type === "signup" && (
//         <>
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Standard</label>
//             <input
//               type="text"
//               name="standard"
//               value={formData.standard}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Board</label>
//             <select
//               name="board"
//               value={formData.board}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg p-2"
//             >
//               <option value="">Select Board</option>
//               <option value="CBSE">CBSE</option>
//               <option value="SSC">SSC</option>
//               <option value="ICSE">ICSE</option>
//               <option value="IGCSE">IGCSE</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-2"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </>
//       )}
//       <div>
//         <label className="block text-sm font-medium">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full border rounded-lg p-2"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
//       >
//         {type === "signup" ? "Sign Up" : "Log In"}
//       </button>
//     </form>
//   );
// };

// export default AuthForm;
