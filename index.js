// importing necessary files
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const generateHTML = require("./generateHTML.js");
const async = require("async");
const Manager = require("./utils/manager");
const Engineer = require("./utils/engineer");
const Intern = require("./utils/intern");
const teamRoster = [];



// array of questions for inquirer
const questions = [
  {
    type: "input",
    message: "Enter team manager's name",
    name: "managerName",
    default: "Manager",
  },
  {
    type: "input",
    message: "Enter employee's ID",
    name: "employeeID",
    default: "Employee ID",
  },
  {
    type: "input",
    message: "Enter employee email",
    name: "employeeEmail",
    default: "Employee Email",
  },
  {
    type: "input",
    message: "Enter office number",
    name: "officeNumber",
    default: "Office Number",
  },
];

const nextMember = [
  {
    type: "list",
    message: "Select team member",
    choices: ["Engineer", "Intern", "None"],
    name: "teamMember",
    default: "Team Member",
  },
];

const engineerQuestions = [
  {
    type: "input",
    message: "Enter engineer name",
    name: "engineerName",
    default: "Engineer Name",
  },
  {
    type: "input",
    message: "Enter engineer ID",
    name: "engineerID",
    default: "Engineer ID",
  },
  {
    type: "input",
    message: "Enter engineer email",
    name: "engineerEmail",
    default: "Engineer Email",
  },
  {
    type: "input",
    message: "Enter engineer's GitHub username",
    name: "engineerGithub",
    default: "Engineer GitHub",
  },
];

const internQuestions = [
  {
    type: "input",
    message: "Enter intern's name?",
    name: "internName",
    default: "Intern Name",
  },
  {
    type: "input",
    message: "Enter intern ID?",
    name: "internID",
    default: "Intern ID",
  },
  {
    type: "input",
    message: "Enter intern email",
    name: "internEmail",
    default: "Intern Email",
  },
  {
    type: "input",
    message: "Enter intern school",
    name: "internSchool",
    default: "Intern School",
  },
];

//  function to initialize inquirer and ask questions about the manager
function init() {
  inquirer.prompt(questions).then((answers) => {
    console.log("manager answers", answers);
    const manager = new Manager(
      answers.managerName,
      answers.employeeID,
      answers.employeeEmail,
      answers.officeNumber
    );
    teamRoster.push(manager);
    console.log("team roster", teamRoster);
    nextMemberPrompt();
  });
}

// function to answer the "which team member would you like to add" question and populate questions based on answer
const nextMemberPrompt = () => {
  return inquirer.prompt(nextMember).then((chosenMember) => {
    switch (chosenMember.teamMember) {
      case "Engineer":
        renderEngineer();
        break;
      case "Intern":
        renderIntern();
        break;
      default:
        
        // function to join the "generated.html" file into the working directory
        const HTML = generateHTML(teamRoster);
        console.log(teamRoster);
        fs.writeFileSync("generated.html", generateHTML(teamRoster));
        
        console.log(HTML);
    }
  });
};

const renderEngineer = () => {
  return inquirer.prompt(engineerQuestions).then((answers) => {
    console.log("engineer answers", answers);
    const engineer = new Engineer(
      answers.memberName,
      answers.engineerID,
      answers.engineerEmail,
      answers.engineerGithub
    );
    teamRoster.push(engineer);
    console.log("team roster", teamRoster);
    nextMemberPrompt();
  });
};

const renderIntern = () => {
  return inquirer.prompt(internQuestions).then((answers) => {
    console.log("intern answers", answers);
    const intern = new Intern(
      answers.internName,
      answers.internId,
      answers.internEmail,
      answers.internSchool
    );

    teamRoster.push(intern);
    console.log("team roster", teamRoster);
    nextMemberPrompt();
  });
};

console.log("team roster", teamRoster);

// function renderTeam(teamRoster) {

// };

init();
module.exports = Engineer;