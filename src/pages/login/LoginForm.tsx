import React from "react";
import { Button, Input, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "../../hooks/users/useLogin";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    login(data, {
      onError: (err) => {
        message.error("Login failed: " + (err as Error).message);
      },
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md h-[80vh] w-[70%] flex-col overflow-y-auto"
    >
      <div className="h-20 w-20 mb-3">
        <img src="/logo.svg" alt="logo" className="h-full w-full" />
      </div>

      <h2 className="text-xl mb-1 font-semibold">Welcome back</h2>
      <p className="text-xs text-neutral-400">Please input your information</p>

      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <Input {...field} placeholder="Input your email" />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Password</label>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <Input.Password {...field} placeholder="Input your password" />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>

      <Button
        htmlType="submit"
        type="primary"
        className="w-full"
        loading={isPending}
        disabled={isPending}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
