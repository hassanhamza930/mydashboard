import { app, BrowserWindow, ipcMain, protocol, shell } from "electron";
import path from "node:path";
import { installed } from "./creds.json";
// import ElectronGoogleOAuth2 from "@getstation/electron-google-oauth2";
import express from "express";

const expressApp = express();
const port = 9090; // Choose a port number

// Define a route to handle OAuth callback
expressApp.get("/oauth-callback", (req, res) => {
  const authorizationCode = req.query.code;
  // Process the code and obtain tokens as needed
  res.send("OAuth callback completed");
});

// Start the Express server
const expressServer = expressApp.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

const {
  // auth_provider_x509_cert_url,
  // auth_uri,
  client_id,
  client_secret,
  // project_id,
  redirect_uris,
  // token_uri,
} = installed;
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    width: 2000,
    height: 2000,
    icon: path.join(process.env.PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  win = null;
});

// protocol.registerHttpProtocol("the-dashboard", (request, callback) => {
//   // Handle the request here
//   // You can parse the URL parameters and perform actions in your app
//   const url = request.url;
//   console.log("Custom Protocol URL:", url);
//   // Handle the URL as needed
// });

app.whenReady().then(createWindow);

ipcMain.on("open-external-browser", (event, data) => {
  shell.openExternal(data.url);
});

// Handle Google OAuth callback when the user returns
ipcMain.on("google-oauth-callback", (event, callbackUrl) => {
  // Parse the callback URL and obtain the 'code' parameter
  const query = new URL(callbackUrl).searchParams;
  const code = query.get("code");

  console.log(code);

  // Use the 'code' to exchange for access tokens (You can make an HTTP request here)
  // Once you have access tokens, you can handle user authentication

  // Example of handling access token request (use a library like axios)
  /*
  axios.post("https://oauth2.googleapis.com/token", {
    code: code,
    client_id: "YOUR_CLIENT_ID", // Replace with your client ID
    client_secret: "YOUR_CLIENT_SECRET", // Replace with your client secret
    redirect_uri: "http://localhost", // Replace with your redirect URI
    grant_type: "authorization_code",
  })
  .then(response => {
    // Handle the response to obtain access tokens
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    // ... (Handle authentication with the tokens)
  })
  .catch(error => {
    console.error("Error exchanging code for tokens:", error);
  });
  */
});
