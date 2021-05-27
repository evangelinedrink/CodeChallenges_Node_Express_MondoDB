const express = require('express');
const secretsRouter= require("./routes/secretsRouter")
const port = parseInt(process.env.PORT, 10) || 3000;

const app = express();

//Authentification is needed before accessing the secretsRouter
//Authentification Middleware will be placed before the Express.static() middleware so that users have to authenticate their credentials before accessing the Express server.
//auth function, like all Express middleware functions, has the req, res, next (optional) paremeter
function auth(req,res, next) {
  console.log(req.headers);
  const authHeader= req.headers.authorization;
  
  if(!authHeader) {  //If authHeader is null, this means the user has not placed a username or password in.
    const err= new Error("You are not authorized to view this resource.");
    res.setHeader("WWW-Authenticate", "Basic"); //This lets the client know that the server is requesting authentication and the authentication method being requested is Basic 
    err.status= 401; //Error code when authentication is not given
    return next (err); //Server will send the error message back and ask for authentication from the client
  }
  
  //If the client then gives their username and password, an authorization header will then be submitted to the server
  //Buffer global class in Node is one of the few classes in Node that we can just use.
  //Buffer.from() just decodes the username and password from Base-64 encoded string
  //Argument inside of Buffer.from: It takes the authorization header and extract the username and password from it. Then it places it in the auth array as username and password.
  const auth= Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
  const user= auth[0];
  const pass= auth[1];
  
  //Basic Validation
  if(user==="jbond" && pass==="AstonMartin007") {
    return next(); //The user is authorized to use the server 
  } else { //An error shows if the user doesn't type admin and password for the username and password
     const err = new Error("You are not authorized to view this resource."); //Goes to the Express error handler
      res.setHeader("WWW-Authenticate", "Basic");
      err.status= 401;
      return next(err);
  } 
}
app.use(auth);

//Handle Requests to the /secrets path.
app.use("/secrets", secretsRouter);
        
/*
app.get('/', (req, res) => {
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <html>
    <body>
      hello world
    </body>
    </html>
  `);
});
*/
app.listen(port, () => {
  console.log(`Server running on port ${port}/`);
});


//Export app file.
module.exports= app; 
/* forked from https://codesandbox.io/s/r1rqpr9zqq */