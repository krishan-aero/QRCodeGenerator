/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
        type: 'input',
        name: 'URL',
        message: "Enter the URL",
      }
  ])
  .then((answer) => {
    var userURL = answer.URL;
    console.log("this is " + userURL);
    var qr_svg = qr.image(userURL, { type: 'png' , margin: 1});
    qr_svg.pipe(fs.createWriteStream('URL.png'));

    // Write user input to userInput.txt file
    fs.writeFile("userInput.txt", userURL, (err)=>{
        if (err) throw err;
        console.log("File has been saved");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console(error);
    } else {
      // Something else went wrong
    }
  });
