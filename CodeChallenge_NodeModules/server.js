const http = require('http');

const locations = ['Bellingham', 'Marysville', 'Seattle', 'Tacoma', 'Spokane'];

//const generateMessage = locations => {
//  return `Nucamp offers classes in ${locations.join(', ')}.`;
//};

//To import the function from generate.js, I created the variable name generateMessage and then used 
//require with the location of the file to get the function and use it in this file.  This server.js file is what is used
//to display the webpage.
const generateMessage= require("./generate.js")
//create a server object:
http
  .createServer(function(req, res) {
    res.write(generateMessage(locations)); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080

