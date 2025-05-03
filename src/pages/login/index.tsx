import React from "react";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
    // Handle login logic here (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};
export default Login;
