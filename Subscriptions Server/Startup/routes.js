
const express = require('express');
const movieRouter = require("../Controllers/MovieRoute")
const subRouter = require("../Controllers/SubscriptionRoute")
const errorHandle = require("../MiddleWares/errorHandle")
const noRouteHandle = require("../MiddleWares/noRouteHandle")
const cors = require('cors')


module.exports = function(app) {
  app.use(cors())
  app.set('strict routing', true)
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/movies", movieRouter); 
  app.use("/subscriptions",subRouter)
  app.use("*",noRouteHandle)
  app.use(errorHandle)
 
}