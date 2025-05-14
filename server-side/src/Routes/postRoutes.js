const express = require("express");
const router = express.Router();
const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//generates a unique identifier
const generateUniqueId = () => {
  return uuidv4();
};

// GET ALL POST INNER JOIN IN SHEDULE TABLE
router.get("/getPostInnerJoinSchedule", (req, res) => {
  const query =
    "SELECT post.*, schedule.* FROM `post` INNER JOIN schedule ON post.schedID = schedule.schedID";

  db.query(query, (error, data, fields) => {
    if (error) {
      return res.status(404).send(error);
    } else {
      return res.status(200).json(data);
    }
  });
});

// GET ALL POST
router.get("/getPost", (req, res) => {
  const query = "SELECT * FROM `post`";

  db.query(query, (error, data, fields) => {
    if (error) {
      return res.status(404).send(error);
    } else {
      return res.status(200).json(data);
    }
  });
});

// Get POST by classCode JOIN POST/REACTIONS/ACCOUNTS
router.get("/getPostByClassCode/:classCode", (req, res) => {
  const classCode = req.params.classCode;
  const query = `SELECT 
    post.*,
    post.fileID as post_fileID,
    reactions.*, 
    accounts.firstname, 
    accounts.middlename, 
    accounts.lastname,
    accounts.fileID as account_photo_fileID
    FROM 
    post 
    INNER JOIN 
    accounts ON 
    post.acctID = accounts.acctID
    INNER JOIN
    reactions ON 
    post.reactionID = reactions.reactionID
    WHERE 
    post.classCode = ?`;
  db.query(query, [classCode], (error, data, field) => {
    if (error) {
      console.log(error);
      res.status(404).json(error);
    } else {
      console.log("Successfully get all POST by classCode data.");
      res.status(200).json(data);
    }
  });
});

// Delete post by postID
router.delete("/deletePostByPostID", async (req, res) => {
  console.log(req.body);
  console.log("Dasdsd");
  const { postID, replyID, fileID, reactionID, schedID } = req.body;

  const postQuery = "DELETE FROM post WHERE postID=?";
  const commentQuery = `DELETE FROM comments WHERE replyID=?`;
  const fileQuery = "DELETE FROM files WHERE fileID=?";
  const reactionQuery = `DELETE FROM reactions WHERE reactionID=?`;
  const schedQuery = `DELETE FROM schedule WHERE schedID=?`;

  //Required Values
  if (!postID || !replyID || !reactionID) {
    console.log(`Invalid Data passes.`);
    return null;
  }

  try {
    const postProcess = new Promise((resolve, reject) => {
      db.query(postQuery, [postID], (error, data, field) => {
        if (error) {
          console.log(error);
          reject("Error deleting post.");
        } else {
          console.log("Successfully deleted post.");
          resolve("Successfully deleted post.");
        }
      });
    });

    const commentProcess = new Promise((resolve, reject) => {
      db.query(commentQuery, [replyID], (error, data, field) => {
        if (error) {
          console.log(error);
          reject("Error deleting comment.");
        } else {
          console.log("Successfully deleted comment.");
          resolve("Successfully deleted comment.");
        }
      });
    });

    const reactionProcess = new Promise((resolve, reject) => {
      db.query(reactionQuery, [reactionID], (error, data, field) => {
        if (error) {
          console.log(error);
          reject("Error deleting reaction.");
        } else {
          console.log("Successfully deleted reaction.");
          resolve("Successfully deleted reaction.");
        }
      });
    });

    const fileProcess = new Promise((resolve, reject) => {
      db.query(fileQuery, [fileID], (error, data, field) => {
        if (error) {
          console.log(error);
          reject("Error deleting file.");
        } else {
          console.log("Successfully deleted file.");
          resolve("Successfully deleted file.");
        }
      });
    });

    const schedProcess = new Promise((resolve, reject) => {
      db.query(schedQuery, [schedID], (error, data, field) => {
        if (error) {
          console.log(error);
          reject("Error deleting schedule.");
        } else {
          console.log("Successfully deleted schedule.");
          resolve("Successfully deleted schedule.");
        }
      });
    });

    let promiseVariables = [postProcess, commentProcess, reactionProcess];

    if (fileID) promiseVariables.push(fileProcess);
    if (schedQuery) promiseVariables.push(schedProcess);

    await Promise.all(promiseVariables);
    console.log("Successfully deleted post. Done all process.");
    res.status(200).json({ message: "Successfully deleted post." });
  } catch (error) {
    console.log("Error in server:", error);
    res.status(400).send(error);
  }
});

// Update post and remove the schedule
router.post("/postNowTheSchedule", (req, res) => {
  const { schedID, time, date } = req.body;
  const queryPost =
    "UPDATE post SET schedID='none', timePosted=?, datePosted=? WHERE schedID=?";
  const querySchedule = "DELETE FROM schedule WHERE schedID=?";

  db.query(queryPost, [time, date, schedID], (error, data, field) => {
    if (error) {
      console.log(error);
      res.status(404).send(error);
    } else {
      console.log("Update post successfully.");

      db.query(querySchedule, [schedID], (err, data, field) => {
        if (err) {
          console.log(err);
          res.status(404).send(err);
        } else {
          console.log("Delete schedule successfully.");
          res.status(200).json({ message: "Successfully posted." });
        }
      });
    }
  });
});
const storageImage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storageImage });

// Add POST
router.post("/addPost", upload.array("file"), async (req, res) => {
  const { acctID, postContent, postType, classCode } = req.body;
  console.log(acctID, postContent, postType, classCode);
  const fileList = req.files;

  const quizID = req.body.quizID || null;
  const schedID = req.body.schedID || null;

  const GENERATED_ID = generateUniqueId();
  const fileID = fileList && fileList.length > 0 ? GENERATED_ID : null;

  const postQuery = `
    INSERT INTO post(
      postID, acctID, timePosted, datePosted, postContent,
      replyID, fileID, classCode, postType, quizID, schedID, reactionID
    ) VALUES (?, ?, CURTIME(), CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const reactionQuery = `
    INSERT INTO reactions(
      reactionID, postID, acctID, \`like\`, heart
    ) VALUES (?, ?, ?, ?, ?)
  `;

  const post_query_values = [
    GENERATED_ID,
    acctID,
    postContent,
    GENERATED_ID,
    fileID,
    classCode,
    postType,
    quizID,
    schedID,
    GENERATED_ID,
  ];

  const react_query_values = [GENERATED_ID, GENERATED_ID, acctID, 0, 0];

  try {
    const promiseVariables = [];

    // Insert post
    const postProcess = new Promise((resolve, reject) => {
      db.query(postQuery, post_query_values, (error) => {
        if (error) {
          console.log(error);
          reject("Error adding post.");
        } else {
          console.log("Post inserted.");
          resolve("Post inserted.");
        }
      });
    });
    promiseVariables.push(postProcess);

    // Insert reaction
    const reactProcess = new Promise((resolve, reject) => {
      db.query(reactionQuery, react_query_values, (error) => {
        if (error) {
          console.log(error);
          reject("Error adding reaction.");
        } else {
          console.log("Reaction inserted.");
          resolve("Reaction inserted.");
        }
      });
    });
    promiseVariables.push(reactProcess);

    // Insert uploaded files
    if (fileList && fileList.length > 0) {
      for (const file of fileList) {
        const { originalname, mimetype, filename } = file;
        const fileInsertQuery = `
          INSERT INTO files(name, type, data, dateUploaded, timeUploaded, acctID, fileID)
          VALUES (?, ?, ?, CURDATE(), CURTIME(), ?, ?)
        `;
        const file_query_values = [
          originalname,
          mimetype,
          filename,
          acctID,
          fileID,
        ];

        const fileProcess = new Promise((resolve, reject) => {
          db.query(fileInsertQuery, file_query_values, (error) => {
            if (error) {
              console.log(error);
              reject("Error inserting file.");
            } else {
              console.log(`File inserted: ${originalname}`);
              resolve("File inserted.");
            }
          });
        });

        promiseVariables.push(fileProcess);
      }
    }

    await Promise.all(promiseVariables);
    console.log("Successfully added post and all related data.");
    res.status(200).json({ message: "Successfully added post." });
  } catch (error) {
    console.log("Server error:", error);
    res.status(400).send(error);
  }
});

module.exports = router;
