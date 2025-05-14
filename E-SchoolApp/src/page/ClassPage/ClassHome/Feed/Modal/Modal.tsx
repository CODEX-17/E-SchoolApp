import React, {
  useState,
  useRef,
  useContext,
  memo,
  SetStateAction,
} from "react";
import style from "./Modal.module.css";
import { getFileByFileID } from "../../../../../services/fileServices";
import { BiExit } from "react-icons/bi";
import { IoCloseCircle, IoDocumentText } from "react-icons/io5";
import { FaFileImage, FaRegImages } from "react-icons/fa6";
import { MdSend, MdOutlineAttachment } from "react-icons/md";
import { UserDetailContext } from "../../../../../context/UserDetailContext";
import generateUserFullname from "../../../../../utils/generateUserFullname";
import ImageRender from "../../../../../components/ImageRender/ImageRender";
import { NotificationContext } from "../../../../../context/NotificationContext";
import { shortenSentence } from "../../../../../utils/textUtils";
import { PostType } from "../../../../../types/types";
import { addPost } from "../../../../../services/postServices";

interface ModalProps {
  setIsShowModal: (value: boolean) => void;
  classCode: string;
  setPostList: React.Dispatch<SetStateAction<any>>;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

export interface PostSubmitType {
  acctID: string;
  postContent: string | null;
  fileList: File[] | null;
  docxList: File[] | null;
  postType: PostType;
  classCode: string;
  quizID: string | null;
  schedID: string | null;
}

type FileType = "Docs" | "File";

const Modal = ({
  setIsShowModal,
  classCode,
  setPostList,
  setIsLoading,
}: ModalProps) => {
  const userDetailsContext = useContext(UserDetailContext);
  const notifContext = useContext(NotificationContext);

  const limitFileCount = 5;

  if (!userDetailsContext || !notifContext) {
    return null;
  }

  const { userDetails } = userDetailsContext;
  const { notify } = notifContext;

  if (!userDetails) return null;

  const [postContent, setPostContent] = useState<string | null>("");
  const [docxFiles, setdocxFiles] = useState<File[] | null>(null);
  const [fileList, setFileList] = useState<File[] | null>(null);

  const inputImageFileRef = useRef<any>(null);
  const inputFilesRef = useRef<any>(null);

  const handleGetFiles = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: FileType
  ) => {
    const file = e.target.files;
    console.log(file);
    if (!file) return;

    if (type === "File") {
      if (fileList && limitFileCount === fileList.length) {
        notify({
          message: `Reach the limit number of File: ${limitFileCount}`,
          status: false,
        });

        return null;
      }

      setFileList((oldData) =>
        oldData ? [...oldData, ...Array.from(file)] : Array.from(file)
      );
    } else {
      if (docxFiles && limitFileCount === docxFiles.length) {
        notify({
          message: `Reach the limit number of docs: ${limitFileCount}`,
          status: false,
        });

        return null;
      }

      setdocxFiles((oldData) =>
        oldData ? [...oldData, ...Array.from(file)] : Array.from(file)
      );
    }
  };

  const deleteFileUpload = (data: File, type: FileType) => {
    if (fileList && type === "File") {
      setFileList((oldData) =>
        oldData ? oldData.filter((item) => data != item) : null
      );
    } else if (docxFiles && type === "Docs") {
      setdocxFiles((oldData) =>
        oldData ? oldData.filter((item) => data != item) : null
      );
    }
  };

  // // Submit new post
  const handleSubmitPost = async () => {
    setIsLoading(true);

    if (!postContent && !fileList && !docxFiles) {
      notify({ message: `Please Fill the blank to post.`, status: false });
      return null;
    }

    let data: PostSubmitType = {
      acctID: userDetails.acctID,
      postContent,
      fileList: fileList,
      docxList: docxFiles,
      classCode,
      postType: "Post",
      quizID: null,
      schedID: null,
    };

    try {
      const result = await addPost(data);
      setIsShowModal(false);
      if (result) {
        setPostList((oldData: any) => [...oldData, data]);
        notify({
          message: result.message,
          status: true,
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      notify({
        message: `Server Error`,
        status: false,
      });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.modal}>
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="d-flex gap-2 align-items-center">
            <div
              className={style.imageContainer}
              style={{ borderRadius: "50%" }}
            >
              <ImageRender image={userDetails?.fileID} />
            </div>
            <p>{generateUserFullname()}</p>
          </div>
          <BiExit
            size={20}
            title="closed"
            cursor={"pointer"}
            onClick={() => setIsShowModal(false)}
          />
        </div>
        <div className={style.body}>
          <div className="mb-2">
            <textarea
              placeholder="Share your thoughts here..."
              value={postContent ?? ""}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>

          {fileList && (
            <div className={style.fileListPost} style={{ overflow: "hidden" }}>
              {fileList.map((data, index) => (
                <div className="position-relative" key={index}>
                  <IoCloseCircle
                    id={style.deleteImagePreview}
                    size={17}
                    color="#099aed"
                    title="Delete Image"
                    onClick={() => deleteFileUpload(data, "File")}
                  />
                  <div className={style.imageContainer}>
                    <ImageRender image={data} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {docxFiles && (
            <div
              className={style.fileListPost}
              style={{ flexDirection: "column", overflowX: "hidden" }}
            >
              {docxFiles.map((data, index) => (
                <div className={style.fileDivPreview} key={index}>
                  <IoCloseCircle
                    id={style.deleteImagePreview}
                    color="#099aed"
                    size={17}
                    onClick={() => deleteFileUpload(data, "Docs")}
                  />
                  <IoDocumentText size={25} color="white" />
                  <p>{shortenSentence(data.name, 20)}</p>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex w-100 mt-2 mb-3 gap-2 justify-content-end">
            <button className={style.btnPostModal} onClick={handleSubmitPost}>
              Post
            </button>
            <div
              className={style.uploadContainer}
              onClick={() => inputImageFileRef.current.click()}
              title="Upload Image"
            >
              <input
                type="file"
                ref={inputImageFileRef}
                accept="image/*"
                onChange={(e) => handleGetFiles(e, "File")}
                style={{ display: "none" }}
                multiple
              />
              <FaRegImages color="#099AED" size={17} />
            </div>
            <div
              className={style.uploadContainer}
              onClick={() => inputFilesRef.current.click()}
              title="Upload Docs"
            >
              <input
                type="file"
                ref={inputFilesRef}
                accept=".doc, .docx, .pdf, .txt, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => handleGetFiles(e, "Docs")}
                style={{ display: "none" }}
                multiple
              />
              <MdOutlineAttachment color="#099AED" size={17} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
