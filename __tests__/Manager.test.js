const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

describe("Manager", () => {
  it("should be an instance of Employee", () => {
    const manager = new Manager();
    expect(manager).toBeInstanceOf(Employee);
  });

  it("should have the property of position set to Manager with icon", () => {
    const manager = new Manager();
    expect(manager.position.title).toBe("Manager");
    expect(manager.position.icon).toBe("fa-mug-hot");
  });

  it("should contain unique questions", () => {
    const manager = new Manager();

    const questions = [
      {
        type: "input",
        message: "Manager's office number:",
        name: "Office number",
      },
    ];

    questions.forEach(question => {
      expect(manager.questions).toContainEqual(question);
    });
  });
});
