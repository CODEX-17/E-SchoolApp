import axios from "axios";

const usePostContentHook = (data) => {
    console.log(data)

    const generateUniqueID = () => {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        const length = 8
        let result = ''
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            result += charset.charAt(randomIndex)
        }
        return result
    }

    let {
        postID,
        acctID,
        name,
        timePosted,
        datePosted,
        postContent,
        replyID,
        image,
        fileID,
        heartCount,
        likeCount,
        classCode,
        subjectName,
        postType,
        quizID,
        schedID,
        duration,
        random,
    } = data

}

export default usePostContentHook;