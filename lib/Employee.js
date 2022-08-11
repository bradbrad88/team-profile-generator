const inquirer = require("inquirer");

class Employee {
  constructor(position) {
    if (!position || typeof position !== "string")
      throw new Error("Employee needs to be initialised with a position of type string");
    this.questions = [
      { name: "name", message: `${position}'s name:`, type: "input" },
      { name: "id", message: `${position}'s ID:`, type: "input" },
      { name: "email", message: `${position}'s email address:`, type: "input" },
    ];
    this.position = { title: position, icon: "" };
  }

  async prompt() {
    const answers = await inquirer.prompt(this.questions);
    const { id, name, email, ...additionalAnswers } = answers;
    this.answers = { id, name, email };
    this.additionalAnswers = additionalAnswers;
  }

  #renderAdditionalFields() {
    return Object.entries(this.additionalAnswers)
      .map(
        ([key, value]) => `<li class="list-group-item">${key}: <strong>${value}</strong></li>`
      )
      .join("");
  }

  toString() {
    if (!this.answers) return "";
    const { name, id, email } = this.answers;
    const { icon, title } = this.position;

    return `
<div class="col-12 col-md-6 col-lg-4">
  <article class="card">
    <div class="card-header bg-info">
      <h2>${name}</h2>
      <h3><i class="fa-solid ${icon}"></i> ${title}</h3>
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: <strong>${id}</strong></li>
        <li class="list-group-item">Name: <strong>${name}</strong></li>
        <li class="list-group-item">Email: <a href="mailto:${email}" type="email">${email}</a></li>
        ${this.#renderAdditionalFields()}
      </ul>
    </div>
  </article>
</div>
        `.trim();
  }
}

module.exports = Employee;
