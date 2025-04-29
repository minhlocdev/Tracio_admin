import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/userService";
import useAuthStore from "../../store/auth/useAuthStore";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      login();
    },
  });
};
