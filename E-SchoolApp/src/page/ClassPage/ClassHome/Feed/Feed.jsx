import React, { useEffect, useState } from "react";
import style from "./Feed.module.css";
import ImageRender from "../../../../components/ImageRender/ImageRender";
import { useContext } from "react";
import { UserDetailContext } from "../../../../context/UserDetailContext";
import { FaFileImage, FaRegImages } from "react-icons/fa6";
import { ClassContext } from "../../../../context/ClassContext";
import { getPostByClassCode } from "../../../../services/postServices";
import Modal from "./Modal/Modal";
import { AiOutlineLike, AiFillFilePpt, AiOutlineDelete } from "react-icons/ai";
import { getFileByFileID } from "../../../../services/fileServices";
import { getProfileDataByAcctID } from "../../../../services/accountServices";

const Feed = () => {
  const { userDetails } = useContext(UserDetailContext);
  const { currentClass } = useContext(ClassContext);
  const [postList, setPostList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(true);
  const classCode = currentClass?.classCode;

  const [accountImagesList, setAcountImagesList] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getPostByClassCode(classCode);

        if (result) {
          setPostList(result);

          const imageMap = {};

          await Promise.all(
            result.map(async (post) => {
              const res = await getProfileDataByAcctID(post.acctID);
              if (res?.fileID) {
                imageMap[post.acctID] = res.fileID;
              }
            })
          );

          const fileIDList = [];

          await Promise.all(
            result.map(async (post) => {
              if (post.fileID) {
                const res = await getFileByFileID(post.fileID);
                fileIDList.push(res);
              }
            })
          );

          setImageList(fileIDList);
          setAcountImagesList(imageMap);
          setPostList(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleIfalreadyClicked = (postID, type) => {
    if (reactionsList) {
      const filter = reactionsList.filter(
        (data) =>
          data.postID === postID &&
          data.reactType === type &&
          data.acctID === userAccount.acctID
      );
      if (filter.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getFileIDByAccountID = (acctID) => {
    if (!acctID) return "default-avatar.png";
    return accountImagesList?.[acctID];
  };

  const getImageUrlsByImageID = (imageID) => {
    if (imageID && imageList) {
      const url = "http://localhost:5001/";
      const filter = imageList
        .filter((data) => data.imageID === imageID)
        .map((data) => url + data.data);
      return filter;
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
          <ImageRender image={userDetails?.fileID} alt="profile" />
        </div>
        <div className={style.postBotton} onClick={() => setIsShowModal(true)}>
          Share your thoughts here...
        </div>
        <FaRegImages
          size={20}
          title="View Draft Scheduled Post"
          onClick={() => setShowSchedPost(!showSchedPost)}
        />
      </div>

      <div className={style.listPostContainer}>
        {postList
          ? postList.reverse().map((post, index) => (
              <div className={style.postCard} key={index}>
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <div className="d-flex w-50 align-items-center justify-content-start gap-2">
                    <div className={style.imageContainer}>
                      <ImageRender image={getFileIDByAccountID(post?.acctID)} />
                    </div>
                    <div className="d-flex flex-column">
                      <h2>{post.name}</h2>
                      <p>{post.timePosted + " (" + post.datePosted + ")"}</p>
                    </div>
                  </div>
                  <div className="d-flex w-50 justify-content-end">
                    {userDetails?.acctID === post.acctID && (
                      <AiOutlineDelete
                        id={style.deleteBtn}
                        title="delete"
                        onClick={() =>
                          handleDeletePost(
                            post.postID,
                            post.imageID,
                            post.fileID
                          )
                        }
                      />
                    )}
                  </div>
                </div>
                <div className={style.body}>
                  <p>{post.postContent}</p>
                  <div className={style.imgListInPost}>
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
                  )}
                </div>

                {/* <div className={style.footer}>
                            { 
                                handleIfalreadyClicked(post.postID, 'heart') ?
                                        <GoHeartFill 
                                            onClick={() => unClickReact(post.postID, 'heart')}
                                            cursor={'pointer'}
                                            size={20}
                                            color='#F45050'
                                        />
                                        : 
                                        <GoHeart 
                                            cursor={'pointer'}
                                            size={20}
                                            color='#3E3F40'
                                            onClick={() => clickReact(post.postID, 'heart')}
                                        />
                                            
                            }
                            <p>{handleCalculateReact(post.postID, 'heart')}</p>
        
                            {
                                handleIfalreadyClicked(post.postID, 'like') ? 
                                    <AiFillLike
                                        onClick={() => unClickReact(post.postID, 'like')}
                                        cursor={'pointer'}
                                        size={20}
                                        color='#3081D0'
                                    /> :
                                    <AiOutlineLike
                                        onClick={() => clickReact(post.postID, 'like')}
                                        cursor={'pointer'}
                                        size={20}
                                        color='#3E3F40'
                                    />
                            }
                            <p>{handleCalculateReact(post.postID, 'like')}</p>
                            
                            <BiSolidMessageDetail 
                                cursor={'pointer'}
                                size={20}
                                color='#508D69'
                                onClick={() =>handleShowComments(post.postID)}
                            />
                                
                            
                            
                        </div>
                        */}
              </div>
            ))
          : "no post"}
      </div>
    </div>
  );
};

export default Feed;
