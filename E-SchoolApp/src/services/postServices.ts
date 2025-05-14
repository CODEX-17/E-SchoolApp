import { PostSubmitType } from "../page/ClassPage/ClassHome/Feed/Modal/Modal";
import { DeletePostPropsType } from "./../page/ClassPage/ClassHome/Feed/Feed";
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

export const deletePostByPostID = async ({
  postID,
  fileID,
  replyID,
  reactionID,
  schedID,
}: DeletePostPropsType) => {
  const data = { postID, fileID, replyID, reactionID, schedID };

  try {
    const response = await axios.delete(`${BASE_URL}/post/deletePostByPostID`, {
      data,
    });

    if (!response) {
      console.log(`No data.`);
      return null;
    }

    if (response) {
      console.log(`Successfully deleted post with PostID: ${postID}.`);
      return response.data;
    }
  } catch (error) {
    console.log("Server error", error);
    return null;
  }
};

export const addPost = async (data: PostSubmitType) => {
  console.log(data);

  try {
    const formData = new FormData();

    formData.append("acctID", data.acctID);
    formData.append("postContent", data.postContent ?? "");
    formData.append("postType", data.postType);
    formData.append("classCode", data.classCode);
    formData.append("quizID", data.quizID ?? "");
    formData.append("schedID", data.schedID ?? "");

    let combinedValues = [...(data.fileList || []), ...(data.docxList || [])];

    if (combinedValues) {
      combinedValues.forEach((file) => {
        formData.append(`file`, file);
      });
    }

    const response = await axios.post(`${BASE_URL}/post/addPost`, formData);

    if (!response) {
      console.log(`No data.`);
      return null;
    }

    if (response) {
      console.log(`Successfully added post.`);
      return response.data;
    }
  } catch (error) {
    console.log("Server error", error);
    return null;
  }
};
