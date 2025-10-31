import axios from "axios";
import { loginRoute, signupRoute } from "../endpoints/endpoints";

export const loginData = async (data) => {
  try {
    const res = await axios.post(loginRoute, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};


export const signupData = async (data) => {
  try {
    const res = await axios.post(signupRoute, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
