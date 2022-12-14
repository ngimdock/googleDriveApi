// import { google } from "googleapis";
// import * as path from "path";
// import * as fs from "fs";

const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const CLIENT_ID =
  "97213920835-rj7ftcd9k3g0u3ro8m7jd8fqsq2p2a0b.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

const REDIRECT_URL = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//0408P_pSVuuQ6CgYIARAAGAQSNwF-L9IrrA-KG011TI1Da0VZxd4XvXgZjjdhSMDinUGUo9yOOKN2Qd5wfoL6VBuUO_E_bZmxTew";

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
        name: "bg-boy.jpg",
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

uploadFile();
