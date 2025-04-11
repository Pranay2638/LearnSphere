import AuthForm from "../Components/AuthForm.jsx";
import {API} from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  console.log(API)
  const handleLogin = async (formData) => {
    try {
      const { data } = await API.post("/login", {
        username: formData.username,
        password: formData.password,
      });
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.response?.data?.message);
    }
  };

  return <AuthForm isSignup={false} onSubmit={handleLogin} />;
};

export default Login;
