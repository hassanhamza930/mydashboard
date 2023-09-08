// OAuth configuration
const clientId =
  "539580232204-k480p6r35a7agbspg4g16dsr8j30kti6.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/userinfo.email";
export const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&scope=${scope}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code`;
