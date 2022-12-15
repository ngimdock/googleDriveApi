const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// env variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

const filePath = path.join(__dirname, "ngimdock-zemfack.jpg");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "ngimdock.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteFile(fileId) {
  try {
    const response = await drive.files.delete({
      fileId,
    });

    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

async function getPublicUrl(fileId) {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId,
      fields: "webViewLink, webContentLink",
    });

    console.log(result.data);

    return result.data;
  } catch (error) {
    console.log(error.message);
  }
}

// uploadFile();

getPublicUrl("1_SMxQ_UaioWzvU-pfHNjjPovk0xgxaWC");

// deleteFile("1QUrY-VYllQM6SvUfTB0OLhCKNb3AvkSZ");
