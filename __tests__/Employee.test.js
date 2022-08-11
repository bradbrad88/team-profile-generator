const Employee = require("../lib/Employee");
const inquirer = require("inquirer");

jest.mock("inquirer");

describe("Employee", () => {
  describe("initialisation", () => {
    // Positive testing
    // Check that Employee class is initialised with 'position: {title: string, icon: string}' property
    it("should have a position property as an object containing title and icon", () => {
      // Arrange
      const position = "position";

      // Act
      const employee = new Employee(position);

      // Assert
      expect(employee.position).toEqual({ title: position, icon: "" });
    });

    // Check that it initialises with common questions to all employees
    it("should contain default prompt questions that match the position provided", () => {
      const position = "position";
      const questions = [
        { name: "name", message: `${position}'s name:`, type: "input" },
        { name: "id", message: `${position}'s ID:`, type: "input" },
        { name: "email", message: `${position}'s email address:`, type: "input" },
      ];

      const employee = new Employee(position);

      expect(employee.questions).toEqual(questions);
    });

    // Negative testing
    // Check that the Employee class throws an error if not supplied a 'position' string
    it("should throw an error if no position is supplied", () => {
      const err = new Error("Employee needs to be initialised with a position of type string");

      const cb = () => new Employee();

      expect(cb).toThrowError(err);
    });

    // Check a number of scenarios where the Employee class is initialised with invalid values
    it("should throw an error if initialised with anything but a string", () => {
      const err = new Error("Employee needs to be initialised with a position of type string");

      const cb1 = () => new Employee();
      const cb2 = () => new Employee({});
      const cb3 = () => new Employee(1);
      const cb4 = () => new Employee([]);
      const cb5 = () => new Employee(true);

      expect(cb1).toThrowError(err);
      expect(cb2).toThrowError(err);
      expect(cb3).toThrowError(err);
      expect(cb4).toThrowError(err);
      expect(cb5).toThrowError(err);
    });
  });

  describe("prompt function", () => {
    // Check that the correct questions are being provided to the inquirer module
    it("should call inquirer with questions that reflect the position provided to employee", async () => {
      const questions = [
        { name: "name", message: "Position's name:", type: "input" },
        { name: "id", message: "Position's ID:", type: "input" },
        { name: "email", message: "Position's email address:", type: "input" },
      ];
      // don't need a return value from inquirer at this point, but prompt method will fail if an object isn't returned
      inquirer.prompt.mockReturnValue({});

      const employee = new Employee("Position");
      await employee.prompt();

      expect(inquirer.prompt).toHaveBeenCalledWith(questions);
    });

    // The standard answers (name, id, email) should be stored separately from any additional answers. This is because additional answers will be looped over and appended to html, where as standard answers will be accessed directly and injected straight into html.
    // This test ensures that the only properties received in employees.answers are the standard answers.
    it("should store the default responses from inquirer in answers property", async () => {
      const returnValue = {
        name: "name",
        id: "id",
        email: "email@test.com",
      };
      const additionalValue = {
        ...returnValue,
        anotherKey: "anotherValue",
      };
      inquirer.prompt.mockReturnValue(additionalValue);

      const employee = new Employee("position");
      await employee.prompt();

      expect(employee.answers).toEqual(returnValue);
    });

    // Check that any answers outside of the default ones are stored in the employee.additionalAnswers property
    it("should store any additional responses from inquirer in additionalAnswers", async () => {
      const returnValue = {
        name: "name",
        id: "id",
        email: "email@test.com",
        anotherKey: "anotherValue",
      };
      inquirer.prompt.mockReturnValue(returnValue);

      const employee = new Employee("position");
      await employee.prompt();

      expect(employee.additionalAnswers).toEqual({ anotherKey: "anotherValue" });
    });
  });

  describe("toString function", () => {
    it("should return a string", async () => {
      const returnValue = {
        name: "name",
        id: "id",
        email: "email@test.com",
        anotherKey: "anotherValue",
      };
      const employee = new Employee("position");
      inquirer.prompt.mockReturnValue(returnValue);
      await employee.prompt();
      expect(typeof employee.toString()).toBe("string");
    });

    it("should return an empty string if run before data collected", () => {
      const employee = new Employee("position");
      expect(employee.toString()).toBe("");
    });

    // Test that the values returned from the prompt function appear in the html text
    it("should contain the values provided in prompt", async () => {
      const returnValue = {
        name: "namee",
        id: "idd",
        email: "email@test.com",
        anotherKey: "anotherValue",
      };
      const employee = new Employee("positionn");
      inquirer.prompt.mockReturnValue(returnValue);
      await employee.prompt();
      expect(employee.toString()).toMatch(/namee/);
      expect(employee.toString()).toMatch(/idd/);
      expect(employee.toString()).toMatch(/email@test\.com/);
      expect(employee.toString()).toMatch(/anotherValue/);
      expect(employee.toString()).toMatch(/positionn/);
    });

    // A very basic test to see if html syntax is being used
    it("should begin with an '<' and end with a '>'", async () => {
      const returnValue = {
        name: "namee",
        id: "idd",
        email: "email@test.com",
        anotherKey: "anotherValue",
      };
      const employee = new Employee("positionn");
      inquirer.prompt.mockReturnValue(returnValue);
      await employee.prompt();
      expect(employee.toString()).toMatch(/^<[\w\W]*>$/gi);
    });
  });
});
