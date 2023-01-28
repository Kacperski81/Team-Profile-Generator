const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require("./utils/questions");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

function tryAgain() {
    return inquirer.prompt([{
        name: "repeat",
        type: "confirm",
        message: "Want to try again?"
    }]).then(answer => {
        if(answer.repeat) return inquirerPrompt(questions);
        process.exit();
    })
}

function errorCheck(answers) {
    const {manager_name,manager_id,manager_email,office_number} = answers;
    if(Number(manager_name) || !manager_name.length) {
        console.log('Manager name should be a string.', manager_name.length);
        return tryAgain();
    }
    if(!manager_id) {
        console.log('Manager id should be a number');
        return tryAgain();
    }
    if(Number(manager_email) || !manager_email.length) {
        console.log('Manager emial should be a string');
        return tryAgain();
    }
    if(!office_number) {
        console.log('Office number should be number');
        return tryAgain();
    }
    return answers;
}

function inquirerPrompt(questions) {
    return inquirer.prompt(questions)
    .then(answers => errorCheck(answers))
    // .then(() => tryAgain());
}

// TODO: Write Code to gather information about the development team members, and render the HTML file.
function init() {
    return inquirerPrompt(questions);
}

init();
