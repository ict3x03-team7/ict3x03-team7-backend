const redisClient = require('./../../../modules/session/redis');

function checkAuthentication(req, res, next) {
  if (!req.session || !req.session.userID) {
    res.status(401).json({ Error: 'You are not logged in!' });
    next();
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
    }
  }
  next();
}
function checkAuthorization(req, res, next) {
  if (!req.session || !req.session.role === 'Admin') {
    res.status(401).json({ Error: 'You are not authorized!' });
    next();
  } else {
    console.log('Authorized!');
  }
  next();
}

module.exports = { checkAuthentication, checkAuthorization };
