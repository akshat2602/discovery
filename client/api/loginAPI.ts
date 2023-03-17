// import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./util";

export const createLogin = async (
  login: loginRequestInterface
): Promise<login200ResponseInterface | login400ResponseInterface> => {
  const response = await api.post("auth/login/", login);
  console.log(response.data);
  return response.data;
};

// export const useCreateExample = () => {
//   const queryClient = useQueryClient();
//   return useMutation(createExample, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["applications"]);
//     },
//   });
// };
