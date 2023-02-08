const questions = [
    {
        name: "manager_name",
        message: "What is the team manager's name?"
    },
    {
        type: "number",
        name: "manager_id",
        message: "What is the team manager's id?",
    },
    {
        name: "manager_email",
        message: "What is the team manager's email",
    },
    {   
        type: "number",
        name: "office_number",
        message: "What is the team manager's office number",
    },

];

const whoYouWantToAdd = [
    {
        type: "list",
        name: "team_member_type",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    }
];

const engineerQuestions = [
    {
        name: "engineer_name",
        message: "What is your engineer's name?"
    },
    {
        type: "number",
        name: "engineer_id",
        message: "What is your engineer's id?"
    },
    {
        name: "engineer_email",
        message: "What is your engineer's email?"
    },
    {
        name: "engineer_gitHub",
        message: "What is your engineer's GitHub username?"
    }
]

const internQuestions = [
    {
        name: "intern_name",
        message: "What is your intern's name?"
    },
    {
        type: "number",
        name: "intern_id",
        message: "What is your intern's id"
    },
    {
        name: "intern_email",
        message: "What is your intern's email?"
    },
    {
        name: "intern_School",
        message: "What is your intern's school?"
    }
]

module.exports = {questions,whoYouWantToAdd,engineerQuestions,internQuestions};