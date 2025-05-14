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
import generateFullname from "../../../../utils/generateFullname";
import ImageRender from "../../../../components/ImageRender/ImageRender";
import { NotificationContext } from "../../../../context/NotificationContext";
import {
  convertDateFormatIntoString,
  formatTime,
} from "../../../../utils/dateUtils";

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
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const classCode = currentClass?.classCode;

  if (!classCode || !userDetails || !userDetails?.fileID) return null;

  const sortItemByDate = (item: PostType[]) => {
    const updated = item.map((items) => ({
      ...items,
      datetime: `${items.timePosted} ${items.datePosted}`,
    }));

    return updated.sort((a, b) => {
      const dateA: Date = new Date(a.datetime);
      const dateB = new Date(b.datetime);
      return dateB.getTime() - dateA.getTime();
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        //Get post JOIN reactions
        const result = await getPostByClassCode(classCode);
        if (result) {
          const finalResult = result;

          for (let i = 0; i < finalResult.length; i++) {
            // If file exist
            if (finalResult[i].fileID) {
              const file_result = await getFileByFileID(finalResult[i].fileID);
              if (file_result) {
                finalResult[i].images = Array.isArray(file_result)
                  ? file_result
                  : [file_result]; // Ensure it's always an array
              }
            }

            finalResult[i].fullname = generateFullname(
              finalResult[i].firstname,
              finalResult[i].middlename,
              finalResult[i].lastname
            );

            //Continue the comment later...
          }

          const sortedData = sortItemByDate(finalResult);
          console.log(sortedData);
          setPostList(sortedData);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [isLoading]);

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
        <div className="position-absolute d-flex align-items-center justify-content-center w-100 h-100 z-3">
          <Modal
            setIsShowModal={setIsShowModal}
            classCode={classCode}
            setPostList={setPostList}
            setIsLoading={setIsLoading}
          />
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

      {isLoading ? (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          Loading...
        </div>
      ) : (
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
                        <p>
                          {formatTime(post.timePosted) +
                            " : " +
                            convertDateFormatIntoString(post.datePosted)}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex w-50 justify-content-end">
                      {userDetails?.acctID === post.acctID && (
                        <AiOutlineDelete
                          size={20}
                          id={style.deleteIcon}
                          title="delete post"
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
                  <hr />
                  <div className={style.body}>
                    <p>{post.postContent}</p>

                    {post.images && (
                      <div className={style.imgListInPost}>
                        {post.images.map((item: string, index: number) => (
                          <div
                            className={style.imageContainer}
                            key={index}
                            style={{
                              width: 200,
                              height: 200,
                              borderRadius: 5,
                              cursor: "pointer",
                            }}
                          >
                            <ImageRender image={item} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* {post.fileID !== "none" &&
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
      )}
    </div>
  );
};

export default Feed;
