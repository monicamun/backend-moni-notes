const admin = require("firebase-admin");
const app = admin.initializeApp();

exports.validateIdToken = async (req, res, next) => {
  console.log("validate id token")
  if (
    typeof req.headers["auth-token"] === "undefined" ||
    !req.headers["auth-token"]
  ) {
    res.status(401);
    res.send("idToken header is required");
    return;
  }
  let idToken = req.headers["auth-token"];
  // idToken comes from the client app
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      let uid = decodedToken.uid;
      req.UserData = {};
      req.UserData.idToken = req.headers["auth-token"];
      req.UserData.userId = uid;
      return next();
    })
    .catch(function(error) {
      res.status(401);
      console.log(error)
      res.send(`Authentication failed. \n Error:${JSON.stringify(error)}`);
      return next();
    });
};
