import axios from "axios";
const BASE_URL = "http://localhost:5001";

export type ResponseType = string | string[] | null;

export const getFileByFileID = async (fileID: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/files/getFileByFileID/${fileID}`
    );

    if (response && response.data) {
      const results = response.data;

      let updated: ResponseType = [];

      if (results.length > 1) {
        results.forEach((item: any) => {
          updated.push(`${BASE_URL}/${item.data}`);
        });

        return updated;
      }

      return `${BASE_URL}/${results[0].data}`;
    }
  } catch (error) {
    console.log("Server error", error);
    return null;
  }
};
