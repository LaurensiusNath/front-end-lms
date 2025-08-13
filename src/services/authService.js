import apiInstance from "../utils/axios";

export const postSignUp = async (data) => {
  return apiInstance.post("/sign-up", data).then((res) => res.data);
};

export const postSignIn = async (data) => {
  return apiInstance.post("/sign-in", data).then((res) => res.data);
};
