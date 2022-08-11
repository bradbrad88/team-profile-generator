const Employee = require("./Employee");

class Intern extends Employee {
  constructor() {
    const position = "Intern";
    super(position);
    this.questions.push({ type: "input", message: "School:", name: "School attending" });
    this.position.icon = "fa-graduation-cap";
  }
}

module.exports = Intern;
