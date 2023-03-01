import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./util";

const listExamples = async (): Promise<exampleResponse[]> => {
  const response = await api.get(`http://localhost:8000/job/application/`);
  return response.data;
};

const createExample = async (
  example: exampleResponse
): Promise<exampleResponse> => {
  const response = await api.post(
    `http://localhost:8000/job/application/`,
    example
  );
  return response.data;
};

export const useCreateExample = () => {
  const queryClient = useQueryClient();
  return useMutation(createExample, {
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
  });
};

export const useExample = () => {
  return useQuery(["applications"], () => listExamples());
};
