// import { useState } from "react";
// import { Link } from "react-router-dom";

// const AuthForm = ({ isSignup, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     standard: "",
//     board: "",
//     gender: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {isSignup ? "Sign Up" : "Login"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Common Fields */}
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />

//           {/* Additional Fields for SignUp */}
//           {isSignup && (
//             <>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="standard"
//                 placeholder="Standard"
//                 value={formData.standard}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="board"
//                 placeholder="Board (CBSE, ICSE, SSC, etc.)"
//                 value={formData.board}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             {isSignup ? "Sign Up" : "Login"}
//           </button>
//         </form>
//         <p className="text-center mt-4 text-gray-600">
//           {isSignup ? "Already have an account?" : "Don't have an account?"}
//           <Link
//             to={isSignup ? "/login" : "/signup"}
//             className="text-blue-500 ml-1 hover:underline"
//           >
//             {isSignup ? "Login" : "Sign Up"}
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl flex overflow-hidden max-w-4xl w-full"
      >
        {/* Left Image Panel */}
        <div className="w-1/2 bg-gradient-to-r from-blue-200 to-purple-300 hidden md:flex flex-col justify-center items-center p-8">
          <img
            src="https://illustrations.popsy.co/amber/genius.svg"
            alt="Auth Illustration"
            className="w-72"
          />
          <h2 className="text-grey text-2xl mt-4 font-semibold text-center">
            {isSignup ? "Join the Learning Journey!" : "Welcome Back!"}
          </h2>
        </div>

        {/* Right Form Panel */}
        <div className="w-full bg-gradient-to-r from-purple-300 to-blue-200 md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isSignup ? "Create an Account" : "Login"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <InputField
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Additional Fields for Sign Up */}
            {isSignup && (
              <>
                <InputField
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {/* <InputField
                  name="standard"
                  placeholder="Standard"
                  value={formData.standard}
                  onChange={handleChange}
                  required
                /> */}
                <select
                  name="Standard"
                  value={formData.standard}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 outline-none"
                >
                  <option value="">class</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                </select>
                <select
                  name="board"
                  value={formData.board}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 outline-none"
                >
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="IGCSE">IGCSE</option>
                  <option value="Maharashtra SSC">Maharashtra SSC</option>
                </select>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              {isSignup ? "Sign Up" : "Login"}
            </motion.button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              to={isSignup ? "/login" : "/signup"}
              className="text-blue-600 font-medium hover:underline"
            >
              {isSignup ? "Login here" : "Sign up now"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable input field component
const InputField = ({ name, value, onChange, placeholder, type = "text", required = false }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-300 outline-none"
  />
);

export default AuthForm;
