/* eslint-disable @typescript-eslint/no-explicit-any */
import API from "../apiclient";

const customBaseQuery = async ({
  url,
  method = "GET",
  body,
}: {
  url: string;
  method?: string;
  body?: any;
}) => {
  try {
    const response = await API({ url, method, data: body });
    return { data: response.data };
  } catch (error: any) {
    return {
      error: { status: error.response?.status, data: error.response?.data },
    };
  }
};

export default customBaseQuery;
