const PORT = 3000;

true ? simpleAuth() : simplestAuthNoModules();

function simpleAuth() {
  // wokr

  var http = require("http");
  var auth = require("basic-auth");

  // Create server
  var server = http.createServer(function(req, res) {
    var credentials = auth(req);

    if (
      !credentials ||
      credentials.name !== "aladdin" ||
      credentials.pass !== "opensesame"
    ) {
      res.statusCode = 401;
      res.setHeader("WWW-Authenticate", 'Basic realm="example"');
      res.end("Access denied");
    } else {
      res.end("Access granted");
    }
  });

  // Listen
  server.listen(PORT);
}

/// WITHOUT AUTH MODULES
function simplestAuthNoModules() {
  //1.
  var http = require("http");

  //2.
  var credentials = {
    userName: "vikas kohli",
    password: "vikas123"
  };
  var realm = "Basic Authentication";

  //3.
  function authenticationStatus(resp) {
    resp.writeHead(401, { "WWW-Authenticate": 'Basic realm="' + realm + '"' });
    resp.end("Authorization is needed");
  }

  //4.
  var server = http.createServer(function(request, response) {
    var authentication, loginInfo;

    //5.
    if (!request.headers.authorization) {
      authenticationStatus(response);
      return;
    }

    //6.
    authentication = request.headers.authorization.replace(/^Basic/, "");

    //7.
    authentication = new Buffer(authentication, "base64").toString("utf8");

    //8.
    loginInfo = authentication.split(":");

    //9.
    if (
      loginInfo[0] === credentials.userName &&
      loginInfo[1] === credentials.password
    ) {
      response.end("Great You are Authenticated...");
      // now you call url by commenting the above line and pass the next() function
    } else {
      authenticationStatus(response);
    }
  });
  server.listen(PORT);
}
