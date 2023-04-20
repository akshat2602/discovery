import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { dspawnApi } from "./util";

export const getDirectory = async (
  assessmentID: string | string[]
): Promise<AxiosResponse> => {
  const response = await dspawnApi.get(
    `directory?assessment_id=${assessmentID}`
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
