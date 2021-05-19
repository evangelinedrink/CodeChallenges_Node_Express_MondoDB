const express= require("express");
const locationRouter= express.Router();

const locations = ['Tacoma', 'Marysville', 'Seattle', 'Spokane', 'Bellingham'];

//Methods have been chained together by using the .router("/") method.
//The path is already set by the .route("/"), which is why we don't have the path argument for each of these HTTP verbs.
locationRouter.route("/")
.all((req, res, next)=>{
  res.statusCode=200;
  res.setHeader("Content-Type", "text/plain"); //use this syntax for .setHeader Route method
  next(); //Pass control of the application routing to the next routing method after this one (next routing method is .get).
})
.get((req,res)=> {
  res.send(locations);
})
.post((req,res)=> {
  res.statusCode= 200; //Code to say it was successfully received
  //Add the user's inputed location (from the request body) into the locations array.
  //req.body.location is used because we are looking for the location property from the request body and then add it to the locations array.
  //The input that the user types in the field is named "location", which is why location is used in the req.body (from line 18 in the server.js file).
  locations.push(req.body.location);
  res.send(`List of all the locations: ${locations}`);
});



//Export Location Router
module.exports= locationRouter;