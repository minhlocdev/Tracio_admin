import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/auth/useAuthStore";
import { loginUser } from "@services/users";

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
