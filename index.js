const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const {questions,whoYouWantToAdd, engineerQuestions,internQuestions} = require("./utils/questions");
const teamMembers = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { template } = require("lodash");

// creating html file
function writeToFile(outputPath, data) {
    fs.writeFile(outputPath,data,(err) => {
        if(err) return console.log(err);
    });
}

// add another team member
function addAnotherTeamMember({team_member_type},teamMembers) {
    switch(team_member_type) {
        case ('Engineer') :
            return questionsForNewEngineer(teamMembers)
            .then(answers => {
                return askUserWhoHeWantToAdd(answers,teamMembers)
                .then(answers => addAnotherTeamMember(answers,teamMembers));
            })
        case ('Intern') :
            return questionsForNewIntern(teamMembers)
            .then(answers => {
                return askUserWhoHeWantToAdd(answers,teamMembers)
                .then(answers => addAnotherTeamMember(answers,teamMembers));
            })
        default :
            writeToFile(outputPath,render(teamMembers));
            return;
        }
}

// ask questions for new intern
function questionsForNewIntern(teamMembers) {
    return inquirer.prompt(internQuestions).then(answers => {
        teamMembers.push(new Intern(answers.intern_name,answers.intern_id,answers.intern_email,answers.intern_School))
        return addAnotherTeamMember(answers,teamMembers)});
}

// ask questions for new engineer
function questionsForNewEngineer(teamMembers) {
    return inquirer.prompt(engineerQuestions).then(answers => {
        teamMembers.push(new Engineer(answers.engineer_name,answers.engineer_id,answers.engineer_email,answers.engineer_gitHub))
        return addAnotherTeamMember(answers,teamMembers)});
}

// check what team member user want to add
function askUserWhoHeWantToAdd() {
    return inquirer.prompt(whoYouWantToAdd);
}

// first set of questions
function inquirerPrompt(questions) {
    return inquirer.prompt(questions)
    .then(answers => {
        teamMembers.push(new Manager(answers.manager_name, answers.manager_id, answers.manager_email, answers.office_number))
        return askUserWhoHeWantToAdd(answers,teamMembers)})
    .then(answers => addAnotherTeamMember(answers,teamMembers))
}

// TODO: Write Code to gather information about the development team members, and render the HTML file.
function init() {
    console.log('Please build your team');
    return inquirerPrompt(questions);
}

init();
