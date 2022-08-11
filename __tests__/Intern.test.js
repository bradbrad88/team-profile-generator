const Intern = require("../lib/Intern");
const Employee = require("../lib/Employee");

describe("Intern", () => {
  it("should be an instance of Employee", () => {
    const intern = new Intern();
    expect(intern).toBeInstanceOf(Employee);
  });

  it("should have the property of position set to Intern with icon", () => {
    const intern = new Intern();
    expect(intern.position.title).toBe("Intern");
    expect(intern.position.icon).toBe("fa-graduation-cap");
  });

  it("should contain unique questions", () => {
    const intern = new Intern();

    const questions = [{ type: "input", message: "School:", name: "School attending" }];

    questions.forEach(question => {
      expect(intern.questions).toContainEqual(question);
    });
  });
});
