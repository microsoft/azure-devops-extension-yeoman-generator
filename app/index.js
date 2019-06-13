const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "id",
        message: "Extension ID",
        default: "my-extension-id",
        validate: this.validateId.bind(this)
      },
      {
        type: "input",
        name: "name",
        message: "Extension name",
        default: "My Extension Name",
        validate: this.validateNotEmpty.bind(this)
      },
      {
        type: "input",
        name: "description",
        message: "Extension description",
        default: "A short description of my extension",
        validate: this.validateNotEmpty.bind(this)
      },
      {
        type: "input",
        name: "publisher",
        message: "Extension publisher ID",
        validate: this.validateNotEmpty.bind(this)
      }
    ]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("**/*"),
      this.destinationPath(this.answers.id),
      this.answers,
      undefined,
      { globOptions: { dot: true } }
    );

    this.fs.move(
      this.destinationPath(this.answers.id, "_gitignore"),
      this.destinationPath(this.answers.id, ".gitignore")
    );
  }

  validateId(input) {
    const notEmpty = this.validateNotEmpty(input);

    if (typeof notEmpty === "string") {
      return notEmpty;
    }

    return (input && input.indexOf(" ") < 0) || "No spaces allowed";
  }

  validateNotEmpty(input) {
    return (input && !!input.trim()) || "Cannot be left empty";
  }
};
