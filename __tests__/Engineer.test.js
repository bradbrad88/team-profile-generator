const Engineer = require("../lib/Engineer");
const Employee = require("../lib/Employee");

describe("Engineer", () => {
  // Ensure that Engineeer is derived from Employee class so that it inherits those properties and methods
  describe("initialise", () => {
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

  //
  describe("filter", () => {
    it("should return an html anchor string with github profile", () => {
      const test = "test";
      const engineer = new Engineer();
      expect(engineer.filter(test)).toBe(
        `<a href="https://github.com/${test}" target="_blank">${test}</a>`
      );
    });
    it("should set this.filtered to 'true'", () => {
      const engineer = new Engineer();
      expect(engineer.filtered).toBeFalsy();
      engineer.filter("test");
      expect(engineer.filtered).toBeTruthy();
    });
  });

  describe("transformer", () => {
    it("should return itself if engineer is not filtered", () => {
      const engineer = new Engineer();
      const test = engineer.transformer("test");
      expect(test).toBe("test");
    });

    it("should return this.inquirerDisplay if it has been filtered", () => {
      const engineer = new Engineer();
      const test = "test";
      const filtered = "filtered";
      engineer.inquirerDisplay = filtered;
      engineer.filtered = true;
      expect(engineer.transformer(test)).toBe(filtered);
    });
  });
});
