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
    {
        type: "list",
        name: "team_member_type",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    }
];

module.exports = questions;