const Employee = require("./Employee");

class Manager extends Employee {
  constructor() {
    const position = "Manager";
    super(position);
    this.questions.push({
      type: "input",
      message: "Manager's office number:",
      name: "Office number",
    });
    this.position.icon = "fa-mug-hot";
  }
}

module.exports = Manager;
