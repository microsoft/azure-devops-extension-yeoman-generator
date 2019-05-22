const path = require("path");
const Generator = require("yeoman-generator");

const files = [
  "./.eslintrc.js",
  "./.gitignore",
  "./tsconfig.json",
  "./webpack.config.js",
  "./.vscode/launch.json",
  "./img/world.png",
  "./src/hub/hub.html",
  "./src/hub/hub.scss",
  "./src/hub/hub.tsx"
];

const tplFiles = [
  "./package.json",
  "./README.md",
  "./vss-extension.json",
  "./configs/dev.json",
  "./configs/release.json"
];

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "id",
        message: "Extension ID",
        default: "hot-reload-and-debug",
        validate: input => input.indexOf(" ") < 0 || "No spaces allowed"
      },
      {
        type: "input",
        name: "name",
        message: "Extension name",
        default: "Hot Reload and Debug"
      },
      {
        type: "input",
        name: "description",
        message: "Extension description",
        default: "Use hot reload and debug directly in VS Code"
      },
      {
        type: "input",
        name: "publisher",
        message: "Extension publisher ID"
      }
    ]);
  }

  writing() {
    for (const file of files) {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(path.join(this.answers.id, file))
      );
    }

    for (const file of tplFiles) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(path.join(this.answers.id, file)),
        this.answers
      );
    }
  }
};
