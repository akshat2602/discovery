// https://randomuser.me/api/?nat=in&results=300

import axios from "axios";
import { randomUserInterface } from "../types/randomUserType";

export const userGetAPI = async (): Promise<randomUserInterface> => {
  const response = await axios.get("https://randomuser.me/api/?results=100");
  return response.data;
};
