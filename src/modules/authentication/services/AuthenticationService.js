const redisClient = require('./../../../modules/session/redis');

function checkAuthentication(req, res, next) {
  if (!req.session || !req.session.userID) {
    res.status(401).json({ Error: 'You are not logged in!' });
  } else {
    const session = req.session;
    const now = Date.now();
    const sessionExpiry = session.cookie.expires.getTime();

    if (sessionExpiry - now > 0) {
      // console.log('Session Time left (Before renew):', sessionExpiry - now);
      const userID = req.session.userID;
      const key = req.sessionID;
      req.session.cookie.expires = new Date(Date.now() + process.env.SESSION_TIMEOUT * 60 * 1000);
      req.session.cookie.maxAge = process.env.SESSION_TIMEOUT * 60 * 1000;
      req.session.save();
      // console.log(
      //   'Session Time left (After renew):',
      //   session.cookie.expires.getTime() - Date.now(),
      // );
      redisClient.set(userID, key);
      redisClient.expire(userID, 60 * process.env.SESSION_TIMEOUT);
      next();
    }
  }
}
function checkAdminPrivileges(req, res, next) {
  if (req.session.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ Error: 'You are not authorized!' });
  }
}

function checkAuthorization(req, res, next) {
  //check if session userID is the same as params userID
  const userRole = req.session.role;
  if (userRole === 'Admin') next();
  else {
    const sessionUserID = req.session.userID;
    const paramsUserID = req.params.userID ? req.params.userID : null;
    const bodyUserID = req.body.userID ? req.body.userID : null;
    if (sessionUserID === paramsUserID || sessionUserID === bodyUserID) {
      next();
    } else {
      res.status(403).json({ Error: 'You are not authorized!' });
    }
  }
}

async function loginAttempt(req, res, next) {
  const email = req.body.email;
  if (email) {
    const userKey = `loginAttempts:${email}`;
    let currentLoginAttempt = await redisClient.get(userKey);
    // console.log('Existing login attempt:' + currentLoginAttempt);

    let temp;
    if (currentLoginAttempt) {
      temp = parseInt(currentLoginAttempt, 10);
    } else if (!currentLoginAttempt) {
      redisClient.set(userKey, 0);
      currentLoginAttempt = await redisClient.get(userKey);
      // console.log('New login attempt:' + currentLoginAttempt);
      temp = parseInt(currentLoginAttempt, 0);
    }

    temp = temp + 1;
    req.loginAttempts = temp;
    redisClient.set(userKey, temp);
    // console.log(await redisClient.get(userKey));

    next();
  } else {
    next();
  }
}

module.exports = { checkAuthentication, checkAdminPrivileges, checkAuthorization, loginAttempt };
