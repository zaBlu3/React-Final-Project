
const express = require('express');
const userRouter = require("../Controllers/userRoute");
const login_registerRouter = require("../Controllers/login_registerRoute")
const errorHandle = require("../MiddleWares/errorHandle")
const noRouteHandle = require("../MiddleWares/noRouteHandle")
const cors = require('cors')


module.exports = function(app) {
  app.use(cors())
  app.set('strict routing', true)
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/", login_registerRouter); 
  app.use("/users", userRouter);
  app.use("*",noRouteHandle)
  app.use(errorHandle)
 
}