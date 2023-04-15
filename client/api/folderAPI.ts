import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

// import api from "./util";

export const getDirectory = async (
  assessmentID: string | string[]
): Promise<AxiosResponse> => {
  const response = await axios.get(
    `http://localhost:8080/directory?assessment_id=${assessmentID}`
  );
  return response;
};

export const useGetDirectory = (assessmentID: string | string[]) => {
  const result = useQuery({
    queryKey: ["directory"],
    queryFn: ({ queryKey }) => getDirectory(assessmentID),
    retry: false,
  });

  return result;
};
