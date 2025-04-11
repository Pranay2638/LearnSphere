import AuthForm from "../Components/AuthForm.jsx";
import {API} from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()

  const handleSignup = async (formData) => {
    try {
      console.log("Sending Data:", formData);
      const { data } = await API.post("/register", formData);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error.response?.data?.message);
    }
  };

  return <AuthForm isSignup={true} onSubmit={handleSignup} />;
};

export default Signup;
