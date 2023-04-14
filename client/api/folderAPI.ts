import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

// import api from "./util";

export const getDirectory = async (): Promise<AxiosResponse> => {
  const response = await axios.get("http://localhost:8080/directory");
  return response;
};

export const useGetDirectory = () => {
  const result = useQuery({
    queryKey: ["directory"],
    queryFn: getDirectory,
    retry: false,
  });

  return result;
};
