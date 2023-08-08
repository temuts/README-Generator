//importing required applications to use for this project
const inquirer = require('inquirer');
const fs = require('fs');

//An array of objects that contain the badges of the licenses. 
const badges = [
    {
        name: 'Apache 2.0',
        badge: '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    },
    {
        name: 'Boost 1.0',
        badge: '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)',
    },
    {
        name: 'MIT',
        badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    },
    {
        name: 'ISC',
        badge: '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)',
    },
]

//A function to ask the user for the input text fields and dynamically generate the README file
inquirer
.prompt([
    {
        // key value pairs of the kind of input, name, and the prompt for the user to see
        // All fields are from the Inquirer documentation
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    },
    {
        type: 'input',
        name: 'project',
        message: 'What is the name of your project?',
    },
    {   type: 'input',
        name: 'description',
        message: 'Please write a short description of your project',
    },
    {
        //the choices allow the user to select one of the licenses presented to them
        type: 'list',
        name: 'license',
        message: 'What kind of license should your project have?',
        choices: ['Apache 2.0', 'Boost 1.0', 'MIT', 'ISC', 'None'],
    },
]).then((data)=>{
    //destructuring the objects to identify the variables being used
    const {username, email, project, description, license} = data;
    //finding the matching badge in the array to the license selected by user
    const projectBadge = badges.find(badge => badge.name === license);
    //prints out the badge if one is selected. If none, then no badge is displayed.
    const printBadge = projectBadge ? projectBadge.badge : '';
    // the name of the README file is always the same so it is presented in string form
    const fileName = `README.md`;
    //README file contents using template literals
    const content = `# ${project}
## Description

${description}

## Installation

Clone the repository and use the following command to invoke the application:
\`\`\`
npm i
\`\`\`

## License

This project is licensed under the ${license} License.
${printBadge}

## Tests

To run tests, run the following command:
\`\`\`
npm test
\`\`\`

## Contact

For any questions about the repo, please contact me directly at ${email}. You can find more of my work at (https://github.com/${username}).

`;
//using the node fs library to write the file and display the error if there is one, otherwise display the success message.
    fs.writeFile(fileName, content, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('README.md created successfully!');
        }
    });
});