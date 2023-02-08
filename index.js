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
        throw new Error('Manager name should be a string.');
    }
    if(!manager_id) {
        throw new Error('Manager id should be a number');
    }
    if(Number(manager_email) || !manager_email.length) {
        throw new Error('Manager emial should be a string');
    }
    if(!office_number) {
        throw new Error('Office number should be number');
    }
    return answers;
}


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
            console.log('all should be added',teamMembers);
            return;
        }
}

function questionsForNewIntern(teamMembers) {
    return inquirer.prompt(internQuestions).then(answers => {
        teamMembers.push(answers)
        return addAnotherTeamMember(answers,teamMembers)});
}

function questionsForNewEngineer(teamMembers) {
    return inquirer.prompt(engineerQuestions).then(answers => {
        teamMembers.push(answers)
        return addAnotherTeamMember(answers,teamMembers)});
}

function askUserWhoHeWantToAdd() {
    return inquirer.prompt(whoYouWantToAdd);
}

function inquirerPrompt(questions) {
    return inquirer.prompt(questions)
    .then(answers => {
        teamMembers.push(answers)
        return askUserWhoHeWantToAdd(answers,teamMembers)})
    .then(answers => addAnotherTeamMember(answers,teamMembers))};
    // .then(answers => {
    //     if(answers.team_member_type === 'Engineer') {
    //         console.log(answers.team_member_type);
    //         questionsForNewEngineer().then(answers => {
    //             return askUserWhoHeWantToAdd().then(answers => addAnotherTeamMember(answers));
    //         });
    //     }
    //     if(answers.team_member_type === 'Intern') {
    //         console.log(answers.team_member_type);
    //         questionsForNewIntern().then(answers => {
    //             return askUserWhoHeWantToAdd().then(answers => addAnotherTeamMember(answers));
    //         });
    //     }
    // });
// TODO: Write Code to gather information about the development team members, and render the HTML file.
function init() {
    console.log('Please build your team');
    return inquirerPrompt(questions);
}

init();
