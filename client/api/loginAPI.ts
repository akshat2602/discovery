// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import api from "./util";

export const createLogin = async (
  login: loginRequestInterface
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await api.post("auth/login/", login);
    return response;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const callCreateLogin = async (login: loginRequestInterface) => {
  const resp = await createLogin(login);
  if (resp) {
    if (resp.status === 200) {
      localStorage.setItem("access_token", resp.data?.access_token);
      localStorage.setItem("refresh_token", resp.data?.refresh_token);
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
