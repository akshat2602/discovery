import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { isAxiosError, AxiosResponse } from "axios";

import api from "./util";

const queryClient = new QueryClient();

export const postLogin = async (
  login: loginRequestInterface
): Promise<AxiosResponse> => {
  const response = await api.post("auth/login/", login);
  return response;
};

const refreshAccessToken = async (): Promise<AxiosResponse> => {
  const response = await api.post("auth/token/refresh/", {
    refresh: localStorage.getItem("refresh_token"),
  });
  return response;
};

export const checkUserLogin = async (): Promise<AxiosResponse> => {
  const response = await api.post("auth/token/verify/", {
    token: localStorage.getItem("access_token"),
  });
  return response;
};

export const getUser = async (): Promise<AxiosResponse> => {
  const response = await api.get("auth/user/");
  return response;
};

export const useRefreshAccessToken = () => {
  const mutation = useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: (data, variables, context) => {
      if (data) {
        if (data.status === 200) {
          localStorage.removeItem("access_token");
          localStorage.setItem("access_token", data.data?.access);
          queryClient.refetchQueries({ queryKey: ["user"] });
        }
      }
    },
    onError: (error, variables, context) => {
      if (isAxiosError(error)) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
    },
  });
  return mutation;
};

export const useCheckUserLogin = () => {
  const accessTokenMutation = useRefreshAccessToken();
  const mutation = useMutation({
    mutationFn: checkUserLogin,
    onError: (error, variables, context) => {
      if (isAxiosError(error)) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("access_token");
          accessTokenMutation.mutate();
        }
      }
    },
  });
  return mutation;
};

export const useGetUser = () => {
  const result = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  return result;
};

export const usePostLogin = () => {
  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data, variables, context) => {
      if (data) {
        if (data.status === 200) {
          const loginData: login200ResponseInterface = data.data;
          localStorage.setItem("access_token", loginData.access_token);
          localStorage.setItem("refresh_token", loginData.refresh_token);
        }
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });
  return mutation;
};
