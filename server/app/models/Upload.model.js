require("dotenv").config();
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const FOLDER_ID = process.env.FOLDER_ID;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

var that = (module.exports = {
  setFilePublic: async (fileId) => {
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      const getUrl = await drive.files.get({
        fileId,
        fields: "webViewLink, webContentLink",
      });
      return getUrl;
    } catch (error) {
      console.log(error);
    }
  },
  uploadFile: async ({ shared }) => {
    try {
      const createFile = await drive.files.create({
        requestBody: {
          name: "uploasdsFile.jpg",
          mimeType: "image/img",
          parents: [FOLDER_ID],
        },
        media: {
          mimeType: "image/img",
          body: fs.createReadStream(path.join(__dirname, "../../vcb.png")),
        },
      });
      const fileId = createFile.data.id;
      console.log(createFile.data);

      const getUrl = await that.setFilePublic(fileId);

      console.log(getUrl.data);
    } catch (error) {
      console.log(error);
    }
  },
  deleteFile: async (fileId) => {
    try {
      console.log("deleteFile: ", fileId);
      const deleteFile = await drive.files.delete({
        fileId,
      });
      console.log(deleteFile.data, deleteFile.status);
    } catch (error) {
      console.log(error);
    }
  },
});
