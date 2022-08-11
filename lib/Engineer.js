const Employee = require("./Employee");

class Engineer extends Employee {
  constructor() {
    const position = "Engineer";
    super(position);
    this.questions.push({
      message: "What is the Engineer's Github username:",
      name: "Github account",
      type: "input",
      filter: this.filter,
      transformer: this.transformer,
    });
    this.position.icon = "fa-glasses";

    // Workaround to display only user input rather than modified html input during inquirer prompts
    this.inquirerDisplay = "";
    this.filtered = false;
  }

  // Filter and transformer are being used to modify the user input to insert github link
  // Inquirer will show the full html string unless manual intervention - which is why we are capturing
  filter = github => {
    this.filtered = true;
    return `<a href="https://github.com/${github}" target="_blank">${github}</a>`;
  };

  // Prevent ugly html string from being displayed to user, just show their github username
  transformer = str => {
    if (this.filtered) return this.inquirerDisplay;
    this.inquirerDisplay = str;
    return str;
  };
}

module.exports = Engineer;
