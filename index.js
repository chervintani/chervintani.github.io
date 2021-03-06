const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const path = require("path");
//socket
const http = require("http").Server(app);

app.use(cors());
app.use(express.static(path.join(__dirname + "/views")));
app.use("/apk",express.static(path.join(__dirname + "/apk")));

app.get("/");

http.listen(PORT,'0.0.0.0', function () {
  console.log("Server running on localhost: " + PORT);
});
