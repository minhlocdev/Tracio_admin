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
      onError: (err) =>
        message.error(`Login failed: ${(err as Error).message}`),
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded-lg shadow w-[320px] flex flex-col space-y-4"
    >
      <div className="w-16 h-16 mx-auto mb-2">
        <img src="/logo.svg" alt="logo" className="h-full w-full" />
      </div>

      <div className="text-center">
        <h2 className="text-lg font-semibold">Welcome back</h2>
        <p className="text-xs text-neutral-500">
          Please input your credentials
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <Input
              className="!py-2 !px-4"
              {...field}
              placeholder="Enter your email"
              disabled={isPending}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <Input.Password
              className="!py-2 !px-4"
              {...field}
              placeholder="Enter your password"
              disabled={isPending}
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        htmlType="submit"
        type="primary"
        loading={isPending}
        disabled={isPending}
        className="w-full"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
