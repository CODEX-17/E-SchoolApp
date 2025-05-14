import React, { useEffect, useState } from "react";
import style from "./Feed.module.css";
import { useContext } from "react";
import { UserDetailContext } from "../../../../context/UserDetailContext";
import { FaRegImages } from "react-icons/fa6";
import { ClassContext } from "../../../../context/ClassContext";
import {
  deletePostByPostID,
  getPostByClassCode,
} from "../../../../services/postServices";
import Modal from "./Modal/Modal";
import { AiOutlineLike, AiFillFilePpt, AiOutlineDelete } from "react-icons/ai";
import { getFileByFileID } from "../../../../services/fileServices";
import { getProfileDataByAcctID } from "../../../../services/accountServices";
import generateFullname from "../../../../utils/generateFullname";
import ImageRender from "../../../../components/ImageRender/ImageRender";
import { NotificationContext } from "../../../../context/NotificationContext";

export interface PostType {
  id?: number;
  acctID: string;
  postID: string;
  fileID: string | null;
  quizID: string | null;
  schedID: string | null;
  reactionID: string;
  replyID: string;
  classCode: string;
  fullname: string;
  postContent: string | null;
  postType: "Post" | "Quiz";
  datePosted: string;
  timePosted: string;
  heart: number;
  like: number;
  images?: any;
  account_photo_fileID: string;
}

export interface DeletePostPropsType {
  postID: string;
  replyID: string;
  reactionID: string;
  fileID: string | null;
  schedID: string | null;
}

const Feed = () => {
  const classContext = useContext(ClassContext);
  const userDetailsContext = useContext(UserDetailContext);
  const notifContext = useContext(NotificationContext);

  if (!classContext || !userDetailsContext || !notifContext) {
    return null;
  }

  const { currentClass } = classContext;
  const { userDetails } = userDetailsContext;
  const { notify } = notifContext;

  const [postList, setPostList] = useState<PostType[] | []>([]);
  const [imageList, setImageList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(true);

  const classCode = currentClass?.classCode;

  if (!classCode || !userDetails || !userDetails?.fileID) return null;

  useEffect(() => {
    const getData = async () => {
      try {
        //Get post JOIN reactions
        const result = await getPostByClassCode(classCode);

        console.log(result);

        if (result) {
          const finalResult = result;

          for (let i = 0; i < finalResult.length; i++) {
            // If file exist
            if (finalResult.fileID) {
              const files = await getFileByFileID(finalResult.fileID);

              if (files) {
                finalResult[i].images = files;
              }
            }

            finalResult[i].fullname = generateFullname(
              finalResult[i].firstname,
              finalResult[i].middlename,
              finalResult[i].lastname
            );

            //Continue the comment later...
          }

          setPostList(finalResult);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  // Delete post by postID
  const handleDeletePost = async ({
    postID,
    fileID,
    replyID,
    reactionID,
    schedID,
  }: DeletePostPropsType) => {
    console.log(
      "postID",
      postID,
      "file",
      fileID,
      "reply",
      replyID,
      "react",
      reactionID,
      "sched",
      schedID
    );

    if (!postID || !replyID || !reactionID) {
      console.log("Invalid Data.");
      return null;
    }

    try {
      const result = await deletePostByPostID({
        postID,
        fileID,
        replyID,
        reactionID,
        schedID,
      });

      if (result) {
        console.log(result);
        notify({ message: result.message, status: true });

        setPostList((oldData) =>
          oldData.filter((item) => item.postID !== postID)
        );
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.log(error.message);
        notify({ message: error.message, status: false });
      }
    }
  };

  return (
    <div className={style.container}>
      {isShowModal && (
        <div className="position-absolute w-100 h-100 z-3">
          <Modal setIsShowModal={setIsShowModal} />
        </div>
      )}

      <div className={style.card}>
        <div className={style.imageContainer}>
          <ImageRender image={userDetails?.fileID} />
        </div>
        <div className={style.postBotton} onClick={() => setIsShowModal(true)}>
          Share your thoughts here...
        </div>
        <FaRegImages
          size={20}
          title="View Draft Scheduled Post"
          //onClick={() => setShowSchedPost(!showSchedPost)}
          onClick={() => alert("asds")}
        />
      </div>

      <div className={style.listPostContainer}>
        {postList.length > 0
          ? postList.reverse().map((post, index) => (
              <div className={style.postCard} key={index}>
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <div className="d-flex w-50 align-items-center justify-content-start gap-2">
                    <div className={style.imageContainer}>
                      <ImageRender image={post.account_photo_fileID} />
                    </div>
                    <div className="d-flex flex-column">
                      <h2>{post.fullname}</h2>
                      <p>{post.timePosted + " (" + post.datePosted + ")"}</p>
                    </div>
                  </div>
                  <div className="d-flex w-50 justify-content-end">
                    {userDetails?.acctID === post.acctID && (
                      <AiOutlineDelete
                        id={style.deleteBtn}
                        title="delete"
                        onClick={() =>
                          handleDeletePost({
                            postID: post.postID,
                            fileID: post.fileID,
                            replyID: post.replyID,
                            reactionID: post.reactionID,
                            schedID: post.schedID,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
                <div className={style.body}>
                  <p>{post.postContent}</p>

                  {/* <div className={style.imgListInPost}>
                    {post.imageID !== "none" &&
                      getImageUrlsByImageID(post.imageID) &&
                      getImageUrlsByImageID(post.imageID).map((data, index) => (
                        <div
                          key={index}
                          className={style.imgContainer}
                          onClick={() => handleViewImage(data)}
                        >
                          <img src={data} alt="picture" id={style.imgSend} />
                        </div>
                      ))}
                  </div>

                  {post.fileID !== "none" &&
                    getFilesUrlsByFileID(post.fileID) &&
                    getFilesUrlsByFileID(post.fileID).map((data, index) => (
                      <div id={style.filePdf}>
                        <SiFiles size={30} color="#F45050" />
                        <p>{data.name}</p>
                        {checkIfPDFfile(data.data) && (
                          <div
                            id={style.viewFile}
                            onClick={() => handleViewFile(data.data)}
                          >
                            View
                          </div>
                        )}

                        <FiDownload
                          size={20}
                          cursor={"pointer"}
                          color="#3E3F40"
                          onClick={() => handleDownload(data.data)}
                        />
                      </div>
                    ))}

                  {post.quizID !== "none" && (
                    <div id={style.quizBox}>
                      <div className="d-flex gap-2">
                        <GiNotebook size={20} color="#186F65" />
                        <p>
                          {quiz
                            ?.filter((q) => q.quizID === post.quizID)
                            .map((q) => q.quizTitle)}
                        </p>
                      </div>
                      {post.dueStatus === "yes" && (
                        <div id={style.due}>Due</div>
                      )}

                      {post.closeStatus === "yes" && (
                        <div id={style.closed}>Closed</div>
                      )}

                      {userAccount?.acctype === "student" &&
                        post.closeStatus === "no" &&
                        (!ifAlreadyTaken(post.quizID) ? (
                          <button
                            className={style.btnView}
                            onClick={() =>
                              handleTakeQuiz(post.quizID, post.postID)
                            }
                          >
                            Take
                          </button>
                        ) : (
                          <button
                            className={style.btnView}
                            style={{ backgroundColor: "#4F6F52" }}
                            onClick={() => handleViewScore(post.quizID)}
                          >
                            Score
                          </button>
                        ))}
                    </div>
                  )} */}
                </div>
              </div>
            ))
          : "no post"}
      </div>
    </div>
  );
};

export default Feed;
