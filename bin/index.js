// #!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { Employee, Engineer, Intern, Manager } = require("../lib");

const generateMarkup = require("../src/generateMarkup");

function saveMarkup(content) {
  fs.writeFile(
    path.resolve(__dirname, "../dist/index.html"),
    content,
    { encoding: "utf-8" },
    err => {
      if (err) return console.log(err);
      console.log(
        "\n----------\n\n",
        chalk.blue("New team profile page created. Check dist/index.html\n")
      );
    }
  );
}

async function getEmployee(getManager = false) {
  if (getManager) return new Manager();
  console.log("");
  const { employee } = await inquirer.prompt({
    message: "Create a new employee?",
    name: "employee",
    choices: [
      { name: "Engineer", value: new Engineer() },
      { name: "Intern", value: new Intern() },
      new inquirer.Separator(),
      { name: "Finished", value: "" },
    ],
    type: "list",
  });
  return employee;
}

// The main looping function - build an employees array that we can pass to generateMarkup on completion
async function getEmployeeFlow(employees = []) {
  // Return a Manager type employee on the first iteration
  const employee = await getEmployee(employees.length < 1);
  if (employee instanceof Employee) {
    employees.push(employee);
    await employee.prompt();
    return getEmployeeFlow(employees);
  }
  const markup = generateMarkup(employees);
  saveMarkup(markup);
}

getEmployeeFlow();
