// import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./util";
import { isAxiosError, AxiosError, AxiosResponse } from "axios";

export const createLogin = async (
  login: loginRequestInterface
): Promise<AxiosResponse | AxiosError | undefined> => {
  try {
    const response = await api.post("auth/login/", login);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        return error.response;
      } else {
        return error;
      }
    } else {
      console.log(error);
      return undefined;
    }
  }
};

export const callCreateLogin = async (login: loginRequestInterface) => {
  const resp = await createLogin(login);
  if (resp !== undefined) {
    if (resp.status === 200) {
      // TODO: Set global state with user info
      // TODO: Set cookie with access and refresh token
    }
  }

  return resp;
};

// export const useCreateExample = () => {
//   const queryClient = useQueryClient();
//   return useMutation(createExample, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["applications"]);
//     },
//   });
// };
