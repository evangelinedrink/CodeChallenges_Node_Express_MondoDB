module.exports= (locations) => {
    return `Nucamp offers classes in ${locations.join(', ')}.`;
  };

//Code Initially was this:
/*const generateMessage = locations => {
      return `Nucamp offers classes in ${locations.join(', ')}.`;
}; */

//What I did was erase the const generateMessage and place the variable locations in the parameter list (inside of 
//the parenthesis). To export the function, I used module.exports. 