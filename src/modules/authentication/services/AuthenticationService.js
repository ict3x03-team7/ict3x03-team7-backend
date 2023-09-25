const redisClient = require('./../../../modules/session/redis');

function checkAuthentication(req, res, next) {
  // console.log('SessionID: ', req.sessionID);
  if (!req.session || !req.session.userID) {
    res.status(401).json({ Error: 'You are not logged in!' });
  } else {
    const session = req.session;
    const now = Date.now();
    const sessionExpiry = session.cookie.expires.getTime();

    if (sessionExpiry - now > 0) {
      console.log('Session Time left (Before renew):', sessionExpiry - now);
      const userID = req.session.userID;
      const key = req.sessionID;
      req.session.cookie.expires = new Date(Date.now() + process.env.SESSION_TIMEOUT * 60 * 1000);
      req.session.cookie.maxAge = process.env.SESSION_TIMEOUT * 60 * 1000;
      req.session.save();
      console.log(
        'Session Time left (After renew):',
        session.cookie.expires.getTime() - Date.now(),
      );
      redisClient.set(userID, key);
      redisClient.expire(userID, 60 * process.env.SESSION_TIMEOUT);
      next();
    }
  }
}
function checkAdminPrivileges(req, res, next) {
  if (!req.session || !req.session.role === 'Admin') {
    res.status(403).json({ Error: 'You are not authorized!' });
  } else {
    console.log('Authorized!');
    next();
  }
}

function checkAuthorization(req, res, next) {
  //check if session userID is the same as params userID??
}

module.exports = { checkAuthentication, checkAdminPrivileges, checkAuthorization };
