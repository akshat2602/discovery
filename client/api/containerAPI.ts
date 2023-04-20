import { useMutation, QueryClient } from "@tanstack/react-query";
import { isAxiosError, AxiosResponse } from "axios";

import { dspawnApi } from "./util";

// const queryClient = new QueryClient();

export const postContainerCreate = async (
  body: containerCreateInterface
): Promise<AxiosResponse> => {
  const response = await dspawnApi.post("container/create", body);
  return response;
};

export const useContainerCreate = (assessmentId: string | string[]) => {
  const mutation = useMutation({
    mutationFn: () =>
      postContainerCreate({ assessment_id: assessmentId as string }),
  });
  return mutation;
};
