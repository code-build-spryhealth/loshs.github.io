var jwt = require('jwt-simple');
var validateUser = require('../security/authenticator').validateUser;

module.exports = function (req, res, next) {

  /*
   if (req.url && (
   req.url === '/loginUser' || req.url === '/loginUser/' ||
   req.url === '/login' || req.url === '/login/' || req.url.indexOf('/login/index') === 0 ||
   req.url.indexOf('/css') === 0 ||
   req.url.indexOf('/fonts') === 0 ||
   req.url.indexOf('/img') === 0 ||
   req.url.indexOf('/js') === 0 )) {
   next();
   return;
   }
   */

  var token = (req.cookies && req.cookies.userLoginToken && req.cookies.userLoginToken.token);
  // || (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.cookies && req.cookies.userLoginToken && req.cookies.userLoginToken.user && req.cookies.userLoginToken.user.id);
  // || (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../conf/tokensSecret')());

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token expirado"
        });
        return;
      }


      validateUser(req, res, key, next);

    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Internal server error",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Token o usuario inválido"
    });
    return;
  }
};