import axios from "axios";
const BASE_URL = "http://localhost:5001";

export const getPostByClassCode = async (classCode: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/post/getPostByClassCode/${classCode}`
    );

    if (!response) {
      return null;
    }

    if (response) {
      console.log(`Successfully get all post in classCode: ${classCode}.`);
      return response.data;
    }
  } catch (error) {
    console.log("Server error", error);
    return null;
  }
};
