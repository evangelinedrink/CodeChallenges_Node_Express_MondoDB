const express= require("express"); //Import Express Server
const secretsRouter= express.Router(); //Import the Express Router

secretsRouter.route("/")
.get((req,res) => {
  res.statusCode= 200;
  res.setHeader("Content-Type", "HTML");
  res.end("Here is the secret message: My birthday is on May 27!");
});

//Export secretsRouter;
module.exports= secretsRouter;