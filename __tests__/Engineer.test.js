const Engineer = require("../lib/Engineer");
const Employee = require("../lib/Employee");

describe("Engineer", () => {
  // Ensure that Engineeer is derived from Employee class so that it inherits those properties and methods
  it("should be an instance of Employee", () => {
    const engineer = new Engineer();
    expect(engineer).toBeInstanceOf(Employee);
  });

  // Should contain 'Engineer' position property as well as the font-awesome icon selector
  it("should have the property of position set to Engineer with icon", () => {
    const engineer = new Engineer();
    expect(engineer.position.title).toBe("Engineer");
    expect(engineer.position.icon).toBe("fa-glasses");
  });

  // Check that it is created with additional questions to the standard Employee class
  it("should contain unique questions", () => {
    const engineer = new Engineer();

    // Using an array so that if more questions are added in future, they can be done without making major changes
    const questions = [
      {
        message: "What is the Engineer's Github username:",
        name: "Github account",
        type: "input",
      },
    ];

    // Loop through each question in the array above and check to see if the questions in engineer class contain one with at least the properties provided
    questions.forEach(question => {
      expect(engineer.questions).toContainEqual(expect.objectContaining(question));
    });
  });
});
