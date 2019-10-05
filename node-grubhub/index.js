var queryHelper = require("./Config/DBConn");
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var util = require("util");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//use express session to maintain session data
app.use(
  session({
    secret: "GrubHub_273_Lab1",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
    cookie: { maxAge: 60000 }
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/*var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "GrubHub"
});
connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL");
  }
});*/

app.post("/login", (req, res) => {
  console.log("Buyer Log In");
  console.log(req.body);
  /* var fetchRow =
    "select emailB,passwordB from users where emailB='" +
    req.body.username +
    "';";*/
  var sql = util.format(
    'select idB,nameB,emailB,passwordB from users where emailB = "%s";',
    req.body.username
  );

  queryHelper.executeQuery(sql, (err, result) => {
    console.log(typeof result);
    if (err) {
      throw err;
    } else if (!result[0]) {
      console.log("No rows");
      res.end("Email Id not found");
    } else {
      console.log("check password now");
      if (req.body.password === result[0].passwordB) {
        var user = result[0];
        res.cookie("cookie", user.idB, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        req.session.user = user;
        console.log(req.session.user.idB);
        console.log("checked password" + result[0].passwordB);
        res.end(JSON.stringify(user));
      } else {
        res.end("Incorrect password");
      }
    }
  });
});
app.post("/buyersignup", (req, res) => {
  console.log("Buyer Sign Up");
  console.log(req.body);
  var x = req.body;
  /*var query =
    "INSERT INTO users(nameB,emailB,passwordB) VALUES('" +
    x +
    "','email','password');";*/
  var query = util.format(
    "INSERT INTO users(nameB,emailB,passwordB) VALUES('%s','%s','%s')",
    x.Name,
    x.EmailID,
    x.createpassword
  );

  queryHelper.executeQuery(query, (err, result) => {
    if (err) {
      console.log(err);
      res.end("Failed");
    } else {
      console.log(result);
      res.send("Your GrubHub UserID is Created");
    }
  });
});
app.post("/ownerlogin", (req, res) => {
  console.log("Owner Log In");
  console.log(req.body);
  /* var fetchRow =
    "select emailB,passwordB from users where emailB='" +
    req.body.username +
    "';";*/
  var sql = util.format(
    'select idO,emailO,passwordO from owners where emailO = "%s";',
    req.body.username
  );

  queryHelper.executeQuery(sql, (err, result) => {
    console.log(typeof result);
    if (err) {
      throw err;
    } else if (!result[0]) {
      console.log("No rows");
      res.end("Email Id not found");
    } else {
      console.log("check password now");
      if (req.body.password === result[0].passwordO) {
        var owner = result[0];
        res.cookie("owner", owner.idO, {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        req.session.user = owner;
        console.log(req.session.user);
        console.log("checked password" + result[0].passwordO);
        res.end("Success");
      } else {
        res.end("Incorrect password");
      }
    }
  });
});
app.get("/restname/:idO", (req, res) => {
  console.log("Get Restaurant Name");
  console.log(req.body);
  var query = util.format(
    "SELECT * FROM owners where idO='%d';",
    req.params.idO
  );

  queryHelper.executeQuery(query, (err, result) => {
    if (err) {
      console.log(err);
      res.end("Failed");
    } else {
      console.log(result[0]);
      res.send(result[0]);
    }
  });
});
app.post("/ownersignup", (req, res) => {
  console.log("Owner Sign Up");
  console.log(req.body);
  var x = req.body;
  var query = util.format(
    "INSERT INTO owners(nameO,emailO,passwordO,RestaurantName,RestaurantZipCode) VALUES('%s','%s','%s','%s','%s')",
    x.Name,
    x.EmailID,
    x.createpassword,
    x.RestaurantName,
    x.RestaurantZipCode
  );
  queryHelper.executeQuery(query, (err, result) => {
    if (err) {
      console.log(err);
      res.end("Failed");
    } else {
      console.log(result);
      res.end("Success");
    }
  });
});
app.get(`/userprofile/:idB`, (req, res) => {
  console.log("Get user profile");
  console.log(req.body);
  var query = util.format(
    "SELECT * FROM users where idB='%d';",
    req.params.idB
  );

  queryHelper.executeQuery(query, (err, result) => {
    if (err) {
      console.log(err);
      res.end("Failed");
    } else {
      console.log(result[0]);
      res.send(result[0]);
    }
  });
});
app.post(`/updateuser`, (req, res) => {
  console.log("Update user profile");
  console.log(req.body);
  var updatedData = req.body;
  var query = util.format(
    "UPDATE users SET nameB='%s',emailB='%s',passwordB='%s', phoneB='%d' WHERE idB ='%d';",
    req.body.Name,
    req.body.EmailID,
    req.body.password,
    req.body.Phone,
    req.body.userid
  );

  queryHelper.executeQuery(query, (err, result) => {
    console.log("camjgjhg");
    if (err) {
      console.log(err);
      res.end("Failed");
      console.log("dwaf");
    } else {
      console.log(result);
      console.log("Updated data");
      res.end("updatedData");
    }
  });
});

app.get(`/items/:itemname`, (req, res) => {
  console.log("Get items");
  console.log(req.params.itemname);
  var query = util.format(
    "SELECT * FROM items JOIN owners on items.restid=owners.idO and itemname='%s';",
    req.params.itemname
  );

  queryHelper.executeQuery(query, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Failed");
    } else {
      if (result.length == 0) {
        res.end("No Such item");
      } else {
        console.log(result);
        console.log("sending result");
        res.send(result);
        console.log("Shouldnt print");
      }
    }
  });
});
app.get(`/restitems/:restname`, (req, res) => {
  console.log("Get items");
  console.log(req.params.restname);
  var query = util.format(
    "SELECT * FROM items where RestaurantName='%s';",
    req.params.restname
  );

  queryHelper.executeQuery(query, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Failed");
    } else {
      if (result.length == 0) {
        res.end("No Such item");
      } else {
        console.log(result);
        console.log("sending result");
        res.send(JSON.stringify(result));
        console.log("Shouldnt print");
      }
    }
  });
});
app.post("/createorder", (req, res) => {
  console.log("Owner Sign Up");
  console.log(req.body);
  var x = req.body;
  var query = util.format(
    "INSERT INTO orders(placedby,userid,RestaurantName) VALUES('%s','%d','%s');",
    x.placedby,
    x.userid,
    x.RestaurantName
  );
  var getid = util.format("select * from orders ORDER BY orderid DESC LIMIT 1");
  queryHelper.executeQuery(query, (err, result) => {
    if (err) {
      console.log(err);
      res.end("Failed");
    } else {
      console.log(result[0]);
    }
  });
  queryHelper.executeQuery(getid, (err, result) => {
    if (err) {
      console.log(err);
      res.end("Failed");
    } else {
      console.log(result[0]);
      res.send(result[0]);
    }
  });
});
app.post("/insertorder", (req, res) => {
  console.log("Owner Sign Up");
  console.log(req.body);
  var x = req.body;
  var query = util.format(
    "INSERT INTO ordereditems(orderid,itemname,quantity) VALUES('%d','%s','%d');",
    x.orderid,
    x.itemname,
    x.quantity
  );
  queryHelper.executeQuery(query, (err, result) => {
    if (err) {
      console.log(err);
      res.end("Failed");
    } else {
      console.log(result[0]);
    }
  });
});
app.listen(3100, () => console.log("server started on port 3100"));
